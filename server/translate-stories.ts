/**
 * Batch translate all game stories using the built-in LLM API
 * Run this script from the server context to access invokeLLM
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { invokeLLM } from './_core/llm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../client/src/data');

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

interface StoryNode {
  id: number;
  text: string;
  textEn?: string;
  scene?: string;
  sceneEn?: string;
  speaker?: string;
  choices?: Array<{
    label: string;
    text: string;
    textEn?: string;
    next: number;
    delta?: Record<string, number>;
  }>;
  end?: boolean;
  endType?: string;
  endingId?: string;
}

// 翻译缓存
const translationCache: Record<string, string> = {};

// 翻译单个文本
async function translateText(text: string): Promise<string> {
  if (!text || !text.trim()) return text;
  
  // 检查缓存
  if (translationCache[text]) {
    return translationCache[text];
  }
  
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: 'system',
          content: 'You are a professional translator. Translate the following Chinese text to English. Keep the translation natural, concise, and preserve all line breaks (\\n). Only return the translated text, nothing else.'
        },
        {
          role: 'user',
          content: text
        }
      ]
    });
    
    if (response.choices?.[0]?.message?.content) {
      const content = response.choices[0].message.content;
      const translated = typeof content === 'string' ? content.trim() : '';
      if (translated) {
        translationCache[text] = translated;
        return translated;
      }
    }
  } catch (error) {
    console.error(`Translation error for "${text.substring(0, 50)}...": ${error}`);
  }
  
  return text;
}

// 批量翻译文本
async function translateBatch(texts: string[]): Promise<Record<string, string>> {
  const results: Record<string, string> = {};
  
  for (const text of texts) {
    if (text && !translationCache[text]) {
      const translated = await translateText(text);
      results[text] = translated;
      // 添加延迟以避免 API 限流
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  
  return results;
}

// 处理单个游戏文件
async function processGameFile(gameId: string): Promise<boolean> {
  const filePath = path.join(DATA_DIR, `story-${gameId}.ts`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${gameId}: File not found`);
    return false;
  }
  
  console.log(`\n📖 Processing: ${gameId}`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 动态导入故事模块
    const storyModule = await import(`file://${filePath}`);
    const storyKey = Object.keys(storyModule).find(key => key.includes('STORY') && !key.includes('INITIAL'));
    
    if (!storyKey) {
      console.log(`❌ ${gameId}: Could not find story export`);
      return false;
    }
    
    const story: StoryNode[] = storyModule[storyKey];
    console.log(`   Found ${story.length} nodes`);
    
    // 收集所有需要翻译的文本
    const textsToTranslate = new Set<string>();
    
    story.forEach(node => {
      if (node.text) textsToTranslate.add(node.text);
      if (node.scene) textsToTranslate.add(node.scene);
      if (node.choices) {
        node.choices.forEach(choice => {
          if (choice.text) textsToTranslate.add(choice.text);
        });
      }
    });
    
    const textArray = Array.from(textsToTranslate);
    console.log(`   Found ${textArray.length} unique texts to translate`);
    
    // 批量翻译
    console.log(`   Starting translation...`);
    const translations = await translateBatch(textArray);
    console.log(`   ✓ Translated ${Object.keys(translations).length} texts`);
    
    // 更新故事数据
    const updatedStory = story.map(node => {
      const updated: StoryNode = { ...node };
      
      if (node.text && translationCache[node.text]) {
        updated.textEn = translationCache[node.text];
      }
      
      if (node.scene && translationCache[node.scene]) {
        updated.sceneEn = translationCache[node.scene];
      }
      
      if (node.choices) {
        updated.choices = node.choices.map(choice => ({
          ...choice,
          textEn: choice.text && translationCache[choice.text] ? translationCache[choice.text] : undefined
        }));
      }
      
      return updated;
    });
    
    // 生成新的 TypeScript 内容
    const newContent = generateTypeScriptContent(storyKey, updatedStory, content);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    
    console.log(`   ✓ Updated ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ ${gameId}: ${error}`);
    return false;
  }
}

// 生成 TypeScript 文件内容
function generateTypeScriptContent(storyKey: string, story: StoryNode[], originalContent: string): string {
  // 保留原始的导入语句
  const importMatch = originalContent.match(/^import.*?;\n/);
  const imports = importMatch ? importMatch[0] : 'import type { StoryNode } from \'./story-types\';\n';
  
  // 生成故事数组（格式化）
  const storyJson = JSON.stringify(story, null, 2);
  const storyContent = `export const ${storyKey}: StoryNode[] = ${storyJson};`;
  
  // 提取初始统计数据（如果存在）
  const statsMatch = originalContent.match(/export const \w+_INITIAL_STATS = \{[^}]+\};/);
  const stats = statsMatch ? '\n\n' + statsMatch[0] : '';
  
  return imports + '\n' + storyContent + stats + '\n';
}

// 主函数
async function main() {
  console.log('🚀 Batch Translation Tool');
  console.log('========================\n');
  
  let processed = 0;
  for (const gameId of GAMES) {
    const success = await processGameFile(gameId);
    if (success) processed++;
  }
  
  console.log(`\n✅ Processed ${processed}/${GAMES.length} games`);
  console.log('\n📝 Translation complete!');
  console.log('Next steps:');
  console.log('1. Test language switching in the browser');
  console.log('2. Verify all translations are correct');
  console.log('3. Run tests to ensure no regressions');
}

main().catch(console.error);
