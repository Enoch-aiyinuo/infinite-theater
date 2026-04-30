#!/bin/bash

# 翻译所有游戏故事的脚本
# 使用 AI 翻译所有中文文本并添加 textEn 字段

DATA_DIR="/home/ubuntu/infinite-theater/client/src/data"
GAMES=(
  "rainy-night"
  "deep-sea"
  "pirate-legend"
  "ancient-mystery"
  "cyber-detective"
  "palace-intrigue"
  "wilderness-survival"
  "fantasy-healer"
  "space-diplomat"
  "horror-hospital"
  "campus-mystery"
  "desert-kingdom"
)

echo "🚀 Starting batch translation..."
echo "================================"
echo ""

# 计数器
total_games=${#GAMES[@]}
processed=0

for game in "${GAMES[@]}"; do
  file="$DATA_DIR/story-$game.ts"
  
  if [ ! -f "$file" ]; then
    echo "❌ $game: File not found"
    continue
  fi
  
  echo "📖 Processing: $game"
  
  # 统计字段数量
  text_count=$(grep -c "text:" "$file" || echo "0")
  scene_count=$(grep -c "scene:" "$file" || echo "0")
  
  echo "   Text fields: $text_count"
  echo "   Scene fields: $scene_count"
  echo "   ✓ Ready for translation"
  
  ((processed++))
done

echo ""
echo "✅ Analyzed $processed/$total_games games"
echo ""
echo "📝 Next steps:"
echo "1. Implement AI translation integration"
echo "2. Batch translate all texts"
echo "3. Add textEn fields to story nodes"
echo "4. Test language switching"

