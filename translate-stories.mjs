#!/usr/bin/env node

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

console.log('🚀 Story Translation Tool');
console.log('========================\n');

// 分析游戏文件
let totalNodes = 0;
let totalTexts = 0;

for (const gameId of GAMES) {
  const filePath = path.join(DATA_DIR, `story-${gameId}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${gameId}: File not found`);
    continue;
  }
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const nodeCount = (content.match(/id:/g) || []).length;
    const textCount = (content.match(/text:/g) || []).length;
    
    totalNodes += nodeCount;
    totalTexts += textCount;
    
    console.log(`✓ ${gameId}: ${nodeCount} nodes, ${textCount} texts`);
  } catch (error) {
    console.log(`❌ ${gameId}: ${error.message}`);
  }
}

console.log(`\n📊 Summary:`);
console.log(`   Total nodes: ${totalNodes}`);
console.log(`   Total texts: ${totalTexts}`);
console.log(`\n💡 To translate all stories:`);
console.log(`   1. Use the invokeLLM function from server/_core/llm.ts`);
console.log(`   2. Batch translate texts in groups of 10-20`);
console.log(`   3. Add textEn field to each story node`);
console.log(`   4. Update GamePlayer.tsx to use language-aware text`);
