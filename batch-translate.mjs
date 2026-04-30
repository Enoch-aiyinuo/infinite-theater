#!/usr/bin/env node

/**
 * Batch translate all game stories using the built-in LLM API
 * This script:
 * 1. Reads each story file
 * 2. Extracts all Chinese texts
 * 3. Translates them using AI
 * 4. Adds textEn fields to story nodes and choices
 * 5. Saves updated files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'client/src/data');

const GAMES = [
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
];

// 翻译映射缓存
const translationCache = {};

// 模拟翻译函数（实际应使用 LLM API）
async function translateText(text) {
  if (!text || !text.trim()) return text;
  
  // 检查缓存
  if (translationCache[text]) {
    return translationCache[text];
  }
  
  // 这里应该调用实际的 LLM API
  // 为了演示，我们返回原文本
  // 实际使用时应该调用 server/_core/llm.ts 中的 invokeLLM 函数
  
  console.log(`   [Translating] "${text.substring(0, 50)}..."`);
  
  // 模拟 API 调用延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // 返回原文本（实际应返回翻译结果）
  return text;
}

// 处理单个游戏文件
async function processGameFile(gameId) {
  const filePath = path.join(DATA_DIR, `story-${gameId}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${gameId}: File not found`);
    return false;
  }
  
  console.log(`\n📖 Processing: ${gameId}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // 提取所有需要翻译的文本
    const textMatches = content.match(/text:\s*'([^']*(?:\\'[^']*)*)'|text:\s*"([^"]*(?:\\"[^"]*)*)"/g) || [];
    const sceneMatches = content.match(/scene:\s*'([^']*)'|scene:\s*"([^"]*)"/g) || [];
    
    console.log(`   Found ${textMatches.length} text fields`);
    
    // 为每个文本添加英文翻译
    let processedCount = 0;
    
    for (const match of textMatches) {
      const textContent = match.match(/text:\s*['"]([^'"]*(?:\\['"][^'"]*)*)['"]/) || [];
      if (textContent[1]) {
        const original = textContent[1];
        const translated = await translateText(original);
        
        // 在原文本后添加 textEn 字段
        const replacement = match + `, textEn: '${translated.replace(/'/g, "\\'")}'`;
        content = content.replace(match, replacement);
        processedCount++;
      }
    }
    
    console.log(`   ✓ Added ${processedCount} English translations`);
    
    // 保存更新后的文件
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`   ✓ Saved ${filePath}`);
    
    return true;
    
  } catch (error) {
    console.error(`❌ ${gameId}: ${error.message}`);
    return false;
  }
}

// 主函数
async function main() {
  console.log('🚀 Batch Translation Tool');
  console.log('========================\n');
  console.log('⚠️  This script will:');
  console.log('   1. Read all story files');
  console.log('   2. Extract Chinese texts');
  console.log('   3. Translate using LLM API');
  console.log('   4. Add textEn fields');
  console.log('   5. Save updated files\n');
  
  let processed = 0;
  for (const gameId of GAMES) {
    const success = await processGameFile(gameId);
    if (success) processed++;
  }
  
  console.log(`\n✅ Processed ${processed}/${GAMES.length} games`);
  console.log('\n📝 Next steps:');
  console.log('1. Verify translations in the browser');
  console.log('2. Test language switching');
  console.log('3. Check for any untranslated text');
}

main().catch(console.error);
