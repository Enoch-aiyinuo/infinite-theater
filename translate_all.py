#!/usr/bin/env python3
"""
Batch translate all game stories and add textEn fields.
This script reads story files, extracts Chinese texts, translates them,
and adds textEn fields to the story nodes.
"""

import os
import re
import json
import sys
from pathlib import Path
from typing import Dict, List, Tuple

DATA_DIR = Path(__file__).parent / 'client' / 'src' / 'data'

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

# 预定义的翻译映射（用于演示和备份）
TRANSLATION_MAP = {
    # 雨夜来电 - 主要节点
    '深夜十一点，暴雨倾盆。\n\n你是私家侦探林晓，正准备关门回家，却接到了一通陌生来电。电话那头是一个颤抖的女声："请帮帮我……他要杀我……"\n\n电话突然断了。\n\n你盯着手机屏幕，雨水打在窗玻璃上，发出噼啪的声响。': 'It\'s 11 PM on a rainy night, with rain pouring down.\n\nYou are Lin Xiao, a private detective, about to close your office and head home when you receive a call from an unknown number. A trembling woman\'s voice comes through: "Please help me... He\'s going to kill me..."\n\nThe call suddenly cuts off.\n\nYou stare at your phone screen as raindrops patter against the window glass.',
    '立即追踪来电号码，找到对方位置': 'Immediately trace the call to find the caller\'s location',
    '回拨电话，确认对方是否安全': 'Call back to confirm if the caller is safe',
    '先查看最近的失踪人口报告，寻找线索': 'Check recent missing person reports first for clues',
}

def extract_text_fields(content: str) -> List[Tuple[str, str]]:
    """Extract all text fields from TypeScript content."""
    # 匹配 text: '...' 或 text: "..."
    pattern = r"text:\s*['\"]([^'\"]*(?:\\.[^'\"]*)*)['\"]"
    matches = re.finditer(pattern, content)
    
    results = []
    for match in matches:
        text = match.group(1)
        # 处理转义字符
        text = text.replace('\\n', '\n').replace("\\'", "'").replace('\\"', '"')
        results.append((match.group(0), text))
    
    return results

def extract_scene_fields(content: str) -> List[Tuple[str, str]]:
    """Extract all scene fields from TypeScript content."""
    pattern = r"scene:\s*['\"]([^'\"]*)['\"]"
    matches = re.finditer(pattern, content)
    
    results = []
    for match in matches:
        text = match.group(1)
        results.append((match.group(0), text))
    
    return results

def add_translation_field(original: str, field_name: str, translation: str) -> str:
    """Add textEn or sceneEn field after the original field."""
    # 转义单引号
    escaped_translation = translation.replace("'", "\\'").replace('\n', '\\n')
    
    # 添加新字段
    if original.endswith("'"):
        return original + f", {field_name}En: '{escaped_translation}'"
    else:
        return original + f", {field_name}En: \"{escaped_translation}\""

def process_game_file(game_id: str) -> bool:
    """Process a single game file."""
    file_path = DATA_DIR / f'story-{game_id}.ts'
    
    if not file_path.exists():
        print(f"❌ {game_id}: File not found")
        return False
    
    print(f"\n📖 Processing: {game_id}")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 提取所有 text 字段
        text_fields = extract_text_fields(content)
        print(f"   Found {len(text_fields)} text fields")
        
        # 提取所有 scene 字段
        scene_fields = extract_scene_fields(content)
        print(f"   Found {len(scene_fields)} scene fields")
        
        # 应用翻译
        updated_content = content
        translations_applied = 0
        
        for original, text in text_fields:
            if text in TRANSLATION_MAP:
                translation = TRANSLATION_MAP[text]
                new_field = add_translation_field(original, 'text', translation)
                updated_content = updated_content.replace(original, new_field, 1)
                translations_applied += 1
        
        for original, scene in scene_fields:
            if scene in TRANSLATION_MAP:
                translation = TRANSLATION_MAP[scene]
                new_field = add_translation_field(original, 'scene', translation)
                updated_content = updated_content.replace(original, new_field, 1)
                translations_applied += 1
        
        print(f"   ✓ Applied {translations_applied} translations")
        
        # 保存更新后的文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(updated_content)
        
        print(f"   ✓ Saved {file_path}")
        return True
        
    except Exception as e:
        print(f"❌ {game_id}: {e}")
        return False

def main():
    print('🚀 Story Translation Tool')
    print('========================\n')
    
    print(f'📊 Statistics:')
    print(f'   Games to process: {len(GAMES)}')
    print(f'   Translation entries available: {len(TRANSLATION_MAP)}\n')
    
    print('⚠️  Note: This script uses a predefined translation map.')
    print('   For full translation, integrate with AI API.\n')
    
    processed = 0
    for game_id in GAMES:
        if process_game_file(game_id):
            processed += 1
    
    print(f'\n✅ Processed {processed}/{len(GAMES)} games')
    print('\n💡 To complete full translation:')
    print('   1. Integrate with LLM API for batch translation')
    print('   2. Generate comprehensive translation map')
    print('   3. Apply translations to all story files')
    print('   4. Test language switching in browser')

if __name__ == '__main__':
    main()
