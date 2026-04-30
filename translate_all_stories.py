#!/usr/bin/env python3
"""
Batch translate all game stories from Chinese to English using AI.
"""

import os
import json
import re
import sys
from pathlib import Path
import subprocess

# 游戏列表
GAMES = [
    'rainy-night',
    'deep-sea',
    'pirate-legend',
    'ancient-mystery',
    'cyber-detective',
    'palace-intrigue',
    'wilderness-survival',
    'fantasy-healer',
    'space-diplomat',
    'horror-hospital',
    'campus-mystery',
    'desert-kingdom'
]

DATA_DIR = Path(__file__).parent / 'client' / 'src' / 'data'

def extract_story_nodes(file_path):
    """Extract story nodes from TypeScript file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the array content
    match = re.search(r'export const \w+: StoryNode\[\] = \[(.*)\];', content, re.DOTALL)
    if not match:
        return None, content
    
    array_content = match.group(1)
    return array_content, content

def translate_text_with_ai(text):
    """Use AI to translate Chinese text to English."""
    if not text or not text.strip():
        return text
    
    # Escape special characters for shell
    escaped_text = text.replace("'", "'\\''")
    
    # Use manus-mcp-cli to call AI
    cmd = f"""manus-mcp-cli invoke forge llm_chat --model gpt-4o --messages '[{{"role": "user", "content": "Translate the following Chinese text to English. Keep the translation natural and concise. Only return the translated text, nothing else:\\n\\n{escaped_text}"}}]' 2>/dev/null"""
    
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=10)
        if result.returncode == 0 and result.stdout:
            # Parse the response
            output = result.stdout.strip()
            # Try to extract the translated text from JSON response
            if '"content"' in output:
                match = re.search(r'"content":\s*"([^"]*(?:\\.[^"]*)*)"', output)
                if match:
                    translated = match.group(1)
                    # Unescape JSON escapes
                    translated = translated.replace('\\n', '\n').replace('\\\\', '\\').replace('\\"', '"')
                    return translated
            return output
    except Exception as e:
        print(f"Translation error: {e}", file=sys.stderr)
    
    return text

def process_game(game_id):
    """Process a single game file."""
    file_path = DATA_DIR / f'story-{game_id}.ts'
    
    if not file_path.exists():
        print(f"❌ File not found: {file_path}")
        return False
    
    print(f"📖 Processing: {game_id}")
    
    try:
        array_content, original_content = extract_story_nodes(file_path)
        if not array_content:
            print(f"❌ Could not extract story nodes from {file_path}")
            return False
        
        # Count nodes
        node_count = array_content.count('id:')
        print(f"   Found {node_count} story nodes")
        
        # For now, just verify the file is readable
        print(f"   ✓ File is readable ({len(original_content)} characters)")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("🚀 Starting story translation process...\n")
    
    # Test AI connection first
    print("Testing AI connection...")
    test_result = subprocess.run(
        "manus-mcp-cli invoke forge llm_chat --model gpt-4o --messages '[{\"role\": \"user\", \"content\": \"Hello\"}]' 2>/dev/null",
        shell=True,
        capture_output=True,
        text=True,
        timeout=5
    )
    
    if test_result.returncode != 0:
        print("⚠️  AI service not available. Proceeding with file analysis only.\n")
    else:
        print("✓ AI service is available\n")
    
    processed = 0
    for game_id in GAMES:
        if process_game(game_id):
            processed += 1
        print()
    
    print(f"✅ Analyzed {processed}/{len(GAMES)} games")
    print("\n📝 Next steps:")
    print("1. Implement batch translation using AI API")
    print("2. Add 'textEn' field to each story node")
    print("3. Add 'textEn' field to each choice")
    print("4. Update GamePlayer to use language-aware text")
    print("5. Test language switching in the browser")

if __name__ == '__main__':
    main()
