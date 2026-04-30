# 游戏内容英文翻译指南

## 概述

本项目需要翻译 12 款游戏的 1310+ 个文本节点。本指南提供了完整的翻译工具和流程。

## 当前状态

✅ **已完成**：
- UI 国际化系统（导航栏、按钮、标签）
- GamePlayer 播放器 i18n 支持
- 故事类型定义支持双语（`textEn` 字段）
- 语言切换功能（localStorage 持久化）

📋 **待完成**：
- 为 12 款游戏的故事内容添加英文翻译
- 为其他页面（GameDetail、Archive、Achievements）添加 i18n 支持
- 完整测试所有页面的中英文切换

## 游戏统计

| 游戏 | 文本字段 | 场景字段 | 总计 |
|------|---------|---------|------|
| rainy-night (雨夜来电) | 297 | 0 | 297 |
| deep-sea (深海余烬) | 407 | 0 | 407 |
| pirate-legend (海盗传说) | 115 | 37 | 152 |
| ancient-mystery (古墓迷踪) | 20 | 20 | 40 |
| cyber-detective (赛博侦探) | 20 | 20 | 40 |
| palace-intrigue (宫廷风云) | 31 | 31 | 62 |
| wilderness-survival (荒野求生) | 26 | 26 | 52 |
| fantasy-healer (治愈之光) | 73 | 73 | 146 |
| space-diplomat (星际外交) | 64 | 64 | 128 |
| horror-hospital (禁区病院) | 40 | 40 | 80 |
| campus-mystery (校园推理) | 178 | 49 | 227 |
| desert-kingdom (沙漠王国) | 39 | 39 | 78 |
| **总计** | **1310** | **399** | **1709** |

## 翻译工作流程

### 方法 1：使用 AI 自动翻译（推荐）

#### 步骤 1：准备翻译脚本

```bash
cd /home/ubuntu/infinite-theater
# 脚本已在 server/translate-stories.ts 中
```

#### 步骤 2：运行翻译

```bash
# 使用 Node.js 运行翻译脚本
node --loader tsx server/translate-stories.ts
```

#### 步骤 3：验证翻译

```bash
# 检查编译错误
pnpm tsc --noEmit

# 运行测试
pnpm test
```

### 方法 2：手工翻译（高质量）

如果您想手工翻译以确保质量，按以下步骤进行：

#### 步骤 1：编辑故事文件

打开 `client/src/data/story-{game-id}.ts`，为每个节点添加 `textEn` 字段：

```typescript
{
  id: 1,
  text: '深夜十一点，暴雨倾盆。',
  textEn: 'It\'s 11 PM on a rainy night, with rain pouring down.',
  choices: [
    {
      label: 'A',
      text: '立即追踪来电号码',
      textEn: 'Immediately trace the call',
      next: 2
    }
  ]
}
```

#### 步骤 2：为选项添加翻译

```typescript
{
  label: 'A',
  text: '立即追踪来电号码，找到对方位置',
  textEn: 'Immediately trace the call to find the caller\'s location',
  next: 2
}
```

#### 步骤 3：保存并测试

```bash
pnpm dev
# 在浏览器中切换语言测试
```

### 方法 3：混合方法（推荐）

1. 使用 AI 自动翻译所有内容
2. 手工审核和调整翻译质量
3. 测试并保存检查点

## 翻译质量检查清单

- [ ] 所有 `text` 字段都有对应的 `textEn`
- [ ] 所有 `scene` 字段都有对应的 `sceneEn`
- [ ] 所有 `choices` 的 `text` 都有对应的 `textEn`
- [ ] 翻译保留了原文的格式（换行符、标点符号）
- [ ] 翻译自然流畅，符合英文表达习惯
- [ ] 没有遗漏或重复的翻译
- [ ] TypeScript 编译无错误
- [ ] 所有测试通过

## 测试翻译

### 在浏览器中测试

1. 启动开发服务器：`pnpm dev`
2. 打开 http://localhost:3000
3. 点击导航栏的 "Language" 按钮切换语言
4. 进入游戏，验证所有文本都显示为英文

### 自动化测试

```bash
# 运行所有测试
pnpm test

# 运行特定游戏的测试
pnpm test rainy-night
```

## 翻译示例

### 雨夜来电 - 开场白

**中文：**
```
深夜十一点，暴雨倾盆。

你是私家侦探林晓，正准备关门回家，却接到了一通陌生来电。电话那头是一个颤抖的女声："请帮帮我……他要杀我……"

电话突然断了。

你盯着手机屏幕，雨水打在窗玻璃上，发出噼啪的声响。
```

**英文：**
```
It's 11 PM on a rainy night, with rain pouring down.

You are Lin Xiao, a private detective, about to close your office and head home when you receive a call from an unknown number. A trembling woman's voice comes through: "Please help me... He's going to kill me..."

The call suddenly cuts off.

You stare at your phone screen as raindrops patter against the window glass.
```

## 翻译指南

### 保留格式

- 保留所有 `\n` 换行符
- 保留所有标点符号
- 保留引号和省略号的含义

### 翻译风格

- 使用自然、流畅的英文
- 保持原文的语气和情感
- 对话要符合角色特征
- 避免生硬的直译

### 常见术语翻译

| 中文 | 英文 |
|------|------|
| 私家侦探 | Private Detective |
| 来电 | Call / Incoming call |
| 暴雨 | Downpour / Heavy rain |
| 工业区 | Industrial district |
| 失踪人口 | Missing person |
| 警察 | Police |
| 追踪 | Trace |
| 线索 | Clue |

## 常见问题

### Q: 如何处理包含特殊字符的文本？

A: 在 TypeScript 中，使用转义符：
- `'` 转义为 `\'`
- `"` 转义为 `\"`
- 换行符保留为 `\n`

### Q: 如何验证翻译是否完整？

A: 运行以下命令检查是否有遗漏的 `textEn` 字段：

```bash
grep -n "text: '" client/src/data/story-*.ts | grep -v "textEn:" | head -20
```

### Q: 翻译后如何测试语言切换？

A: 
1. 启动开发服务器
2. 打开浏览器开发者工具（F12）
3. 在 Console 中运行：`localStorage.setItem('language', 'en')`
4. 刷新页面，应该看到英文界面

### Q: 如何处理多行对话？

A: 使用 `\n` 保留换行符：

```typescript
text: '第一行\n第二行\n第三行',
textEn: 'First line\nSecond line\nThird line'
```

## 下一步

1. **立即测试**：在浏览器中验证当前的 UI 国际化效果
2. **选择翻译方法**：决定使用 AI 自动翻译还是手工翻译
3. **执行翻译**：按照上述流程翻译所有游戏内容
4. **质量检查**：验证所有翻译的正确性和完整性
5. **保存检查点**：完成后保存项目检查点

## 相关文件

- **故事文件**：`client/src/data/story-*.ts`
- **故事类型定义**：`client/src/data/story-types.ts`
- **翻译文件**：`client/src/locales/en.json` 和 `zh.json`
- **游戏播放器**：`client/src/pages/GamePlayer.tsx`
- **翻译脚本**：`server/translate-stories.ts`

## 支持

如有问题，请参考：
- 项目 README
- 代码注释
- 测试用例（`server/*.test.ts`）
