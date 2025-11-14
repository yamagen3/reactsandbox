# デプロイガイド

## 🚀 自動デプロイ（推奨）

### 方法1: npm コマンド
```bash
npm run deploy
```

### 方法2: シェルスクリプト
```bash
./scripts/deploy.sh
```

どちらの方法も以下を自動実行します：
1. ✅ テスト実行
2. 🔨 ビルド
3. 📦 コミット
4. 📤 プッシュ
5. 🌐 GitHub Actions による自動デプロイ

## 📋 手動デプロイ

### ステップ1: テストとビルド
```bash
npm run test:run
npm run build
```

### ステップ2: コミット＆プッシュ
```bash
git add -A
git commit -m "Deploy update"
git push
```

### ステップ3: GitHub Actions確認
プッシュすると自動的に GitHub Actions が実行されます：
- 📊 Actions: https://github.com/yamagen3/reactsandbox/actions

## 🌐 デプロイ先

**本番URL**: https://yamagen3.github.io/reactsandbox/

## ⚙️ 初回セットアップ（1回のみ）

GitHub Pages を有効化する必要があります：

1. https://github.com/yamagen3/reactsandbox/settings/pages を開く
2. **Source** を **"GitHub Actions"** に変更
3. Save をクリック

この設定は1回だけ行えばOKです。

## 🔍 デプロイ状況の確認

### GitHub Actions
https://github.com/yamagen3/reactsandbox/actions

- ✅ 緑チェック: デプロイ成功
- ⏳ 黄色アイコン: 実行中（2-3分待つ）
- ❌ 赤バツ: エラー発生（ログを確認）

### デプロイ確認
デプロイ完了後、以下で確認：
```bash
# サイトにアクセス
open https://yamagen3.github.io/reactsandbox/

# または
curl -I https://yamagen3.github.io/reactsandbox/
```

## 🛠️ トラブルシューティング

### GitHub Actions が実行されない
1. Settings → Actions → General
2. "Actions permissions" が有効になっているか確認
3. "Workflow permissions" が "Read and write" になっているか確認

### デプロイは成功するがサイトが表示されない
1. GitHub Pages の Source が "GitHub Actions" になっているか確認
2. 数分待ってからブラウザのキャッシュをクリア
3. プライベートブラウジングモードで再度アクセス

### 404 エラー
1. vite.config.js の base パスを確認: `base: '/reactsandbox/'`
2. リポジトリ名とbase パスが一致しているか確認

## 📝 デプロイ履歴

コミット履歴から確認：
```bash
git log --oneline
```

## 🔄 ロールバック

前のバージョンに戻す場合：
```bash
# 前のコミットに戻る
git revert HEAD

# プッシュして再デプロイ
git push
```

## 💡 ヒント

- **頻繁なデプロイ**: `npm run deploy` で簡単にデプロイできます
- **テスト重視**: デプロイ前に必ずテストが実行されます
- **自動化**: プッシュするだけでCI/CDが動作します
- **安全性**: テスト失敗時はデプロイされません
