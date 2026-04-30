#!/usr/bin/env python3
"""
Batch translate game stories from Chinese to English using AI.
This script reads story files and adds English translations to each node.
"""

import os
import json
import re
import sys
from pathlib import Path

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

def extract_story_data(file_path):
    """Extract story nodes from TypeScript file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find the array content
    match = re.search(r'export const \w+: StoryNode\[\] = \[(.*)\];', content, re.DOTALL)
    if not match:
        return None
    
    return content

def process_game(game_id):
    """Process a single game file."""
    file_path = DATA_DIR / f'story-{game_id}.ts'
    
    if not file_path.exists():
        print(f"❌ File not found: {file_path}")
        return False
    
    print(f"📖 Processing: {game_id}")
    
    try:
        content = extract_story_data(file_path)
        if content:
            # For now, just verify the file is readable
            print(f"✓ Read {len(content)} characters")
            return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
    
    return False

def main():
    print("🚀 Starting story translation process...\n")
    
    processed = 0
    for game_id in GAMES:
        if process_game(game_id):
            processed += 1
        print()
    
    print(f"✅ Processed {processed}/{len(GAMES)} games")
    print("\n📝 Next steps:")
    print("1. Use AI API to translate Chinese text to English")
    print("2. Add 'textEn' field to each story node")
    print("3. Add 'textEn' field to each choice")
    print("4. Test language switching in GamePlayer")

if __name__ == '__main__':
    main()
