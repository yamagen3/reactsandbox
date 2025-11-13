#!/bin/bash

# React Sandbox 自動デプロイスクリプト

set -e

echo "🚀 React Sandbox デプロイ開始..."
echo ""

# 1. テスト実行
echo "📝 テスト実行中..."
npm run test:run
echo "✅ テスト完了"
echo ""

# 2. ビルド実行
echo "🔨 ビルド実行中..."
npm run build
echo "✅ ビルド完了"
echo ""

# 3. 変更があるか確認
if [[ -n $(git status -s) ]]; then
  echo "📦 変更をコミット中..."
  git add -A
  git commit -m "Deploy: Update build $(date '+%Y-%m-%d %H:%M:%S')"
  echo "✅ コミット完了"
  echo ""
fi

# 4. プッシュ
echo "📤 リモートにプッシュ中..."
BRANCH=$(git branch --show-current)
git push origin "$BRANCH"
echo "✅ プッシュ完了"
echo ""

# 5. GitHub Actions URL表示
REPO_URL=$(git config --get remote.origin.url | sed 's/.*\/git\//https:\/\/github.com\//' | sed 's/\.git$//')
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ デプロイが開始されました！"
echo ""
echo "📊 GitHub Actions: ${REPO_URL}/actions"
echo "🌐 サイトURL: https://yamagen3.github.io/reactsandbox/"
echo ""
echo "💡 GitHub Actions が自動的にビルド・デプロイを実行します"
echo "   完了まで2-3分お待ちください"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
