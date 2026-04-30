# 游戏内容英文翻译指南

## 概述

无限剧场平台已完成 UI 国际化，支持中英文切换。现在需要为 12 款游戏的故事内容添加英文翻译。

**当前状态**：
- ✅ UI 国际化完成（导航栏、按钮、标签）
- ✅ GamePlayer 支持 `textEn` 字段
- ❌ 游戏故事内容还需翻译（297+ 文本节点）

## 翻译结构

每个故事节点包含两个文本字段：
- `text`: 中文故事文本
- `textEn`: 英文故事文本（需要添加）

每个选项包含两个文本字段：
- `text`: 中文选项文本
- `textEn`: 英文选项文本（需要添加）

### 示例

```typescript
{
  id: 1,
  text: '深夜十一点，暴雨倾盆。\n\n你是私家侦探林晓...',
  textEn: 'It\'s 11 PM on a rainy night, with rain pouring down.\n\nYou are Lin Xiao, a private detective...',
  choices: [
    {
      label: 'A',
      text: '立即追踪来电号码，找到对方位置',
      textEn: 'Immediately trace the call to find the caller\'s location',
      next: 2,
      delta: { trust: 0, clues: 5, stress: 5 }
    },
    // ... 更多选项
  ]
}
```

## 翻译工作流

### 方法 1：手工翻译（推荐用于小规模）

1. 打开故事文件：`client/src/data/story-{game-id}.ts`
2. 为每个 `text` 字段添加对应的 `textEn` 字段
3. 运行 `pnpm test` 确保没有编译错误
4. 在浏览器中测试中英文切换

### 方法 2：使用翻译脚本（推荐用于大规模）

1. 准备翻译映射文件：`translations-{game-id}.json`
   ```json
   {
     "中文文本1": "English text 1",
     "中文文本2": "English text 2"
   }
   ```

2. 运行翻译脚本：
   ```bash
   node scripts/apply-translations.mjs {game-id}
   ```

3. 验证翻译：
   ```bash
   pnpm test
   ```

## 游戏列表

| ID | 游戏名称 | 节点数 | 选项数 |
|----|---------|--------|--------|
| rainy-night | 雨夜来电 | 102 | 195 |
| deep-sea | 深海余烬 | ~100 | ~180 |
| pirate-legend | 海盗传说 | ~100 | ~180 |
| ancient-mystery | 古墓迷踪 | ~100 | ~180 |
| cyber-detective | 赛博侦探 | ~100 | ~180 |
| palace-intrigue | 宫廷风云 | ~100 | ~180 |
| wilderness-survival | 荒野求生 | ~100 | ~180 |
| fantasy-healer | 治愈之光 | ~100 | ~180 |
| space-diplomat | 星际外交 | ~100 | ~180 |
| horror-hospital | 禁区病院 | ~100 | ~180 |
| campus-mystery | 校园推理 | ~100 | ~180 |
| desert-kingdom | 沙漠王国 | ~100 | ~180 |

## 翻译质量检查清单

- [ ] 所有 `text` 字段都有对应的 `textEn` 字段
- [ ] 英文翻译自然流畅，符合游戏故事的语调
- [ ] 特殊字符（如 `\n`、引号）正确转义
- [ ] 没有编译错误（`pnpm test` 通过）
- [ ] 在浏览器中测试中英文切换正常

## 常见问题

### Q: 如何处理特殊字符？
A: 在 TypeScript 字符串中，需要转义：
- `'` → `\'`
- `"` → `\"`
- `\n` → `\\n`

### Q: 翻译出错怎么办？
A: 
1. 检查 TypeScript 编译错误：`pnpm test`
2. 使用 `git checkout` 恢复文件
3. 重新检查翻译映射

### Q: 如何测试翻译？
A:
1. 运行开发服务器：`pnpm dev`
2. 打开浏览器：http://localhost:3000
3. 点击导航栏的 "Language" 按钮切换到英文
4. 进入游戏检查故事文本和选项是否都是英文

## 下一步

1. **优先翻译《雨夜来电》**（已有部分翻译示例）
2. **参考《雨夜来电》的翻译风格**翻译其他游戏
3. **定期测试**确保翻译质量
4. **收集用户反馈**改进翻译

## 支持

如有问题，请查看：
- 故事类型定义：`client/src/data/story-types.ts`
- GamePlayer 实现：`client/src/pages/GamePlayer.tsx`
- i18n 系统：`client/src/hooks/useLanguage.ts`
