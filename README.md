# React Sandbox

Reactを静的環境で練習できるSandboxアプリです。

## 開発プロセス

このプロジェクトは以下のプロセスで開発されています：

- **Spec-Driven**: [SPEC.md](./SPEC.md) で仕様を定義
- **TDD (Test-Driven Development)**: テストファーストで開発
- **GitHub Pages**: 静的サイトとしてデプロイ

## 機能

- **コードエディタ**: Reactコンポーネントをリアルタイムで編集
- **ライブプレビュー**: コードの変更を即座にプレビュー
- **エラーハンドリング**: エラーメッセージを分かりやすく表示
- **リセット機能**: ワンクリックでデフォルトコードに戻す
- **日本語対応**: 完全な日本語UI

## 使い方

### インストール

```bash
npm install
```

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

### テストの実行

```bash
# Watch モード
npm test

# 1回実行
npm run test:run

# UI モード
npm run test:ui
```

### ビルド

```bash
npm run build
```

### プレビュー

```bash
npm run preview
```

## 技術スタック

- **React 18**: UIライブラリ
- **Vite**: ビルドツール
- **Babel Standalone**: ブラウザ内JSXトランスパイル
- **Vitest**: テストフレームワーク
- **React Testing Library**: コンポーネントテスト

## テストカバレッジ

- App コンポーネント: 5 tests
- CodeEditor コンポーネント: 5 tests
- Sandbox コンポーネント: 7 tests

合計: 17 tests ✅

## 使用例

デフォルトで、シンプルなカウンターアプリのコードが用意されています。
左側のエディタでコードを編集すると、右側にリアルタイムでプレビューが表示されます。

### サポートされるReact Hooks

- `useState`
- `useEffect`
- `useRef`
- `useMemo`
- `useCallback`
- `useContext`
- `useReducer`

## GitHub Pages デプロイ

このプロジェクトはGitHub Pagesに自動デプロイされます。
`main`または`master`ブランチにpushすると、GitHub Actionsが自動的にビルド・デプロイを実行します。

## プロジェクト構造

```
react-sandbox/
├── src/
│   ├── components/
│   │   ├── CodeEditor.jsx      # コードエディタコンポーネント
│   │   ├── Preview.jsx          # プレビューコンポーネント
│   │   ├── Sandbox.jsx          # メインSandboxコンポーネント
│   │   └── __tests__/           # コンポーネントテスト
│   ├── test/
│   │   └── setup.js             # テストセットアップ
│   ├── App.jsx                   # ルートコンポーネント
│   └── main.jsx                  # エントリーポイント
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actionsワークフロー
├── SPEC.md                       # プロジェクト仕様書
├── vite.config.js               # Vite設定
└── package.json
```

## ライセンス

MIT
