# 🎨 Ideogram MCP Server

<p align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/sunwood-ai-labs/ideagram-mcp-server">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/sunwood-ai-labs/ideagram-mcp-server">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/sunwood-ai-labs/ideagram-mcp-server">
<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/sunwood-ai-labs/ideagram-mcp-server">
<img alt="npm" src="https://img.shields.io/npm/v/@sunwood-ai-labs/ideagram-mcp-server">
<img alt="npm" src="https://img.shields.io/npm/dt/@sunwood-ai-labs/ideagram-mcp-server">
</p>


Ideogram APIを使用して画像生成機能を提供するModel Context Protocol (MCP) サーバー。**Ideogram 3.0** に対応！

https://github.com/user-attachments/assets/041553d3-6fbc-4dfa-b149-d195dcb9e8f8



## 📋 機能

- プロンプトに基づく画像生成
- カスタマイズ可能なパラメータ
  - アスペクト比
  - モデル選択（V1, V2, **V3**）
  - マジックプロンプト
  - スタイルタイプ
  - ネガティブプロンプト
  - 生成画像数
  - **スタイル参照機能**（Ideogram 3.0の新機能）
    - URL参照画像（最大3枚）
    - スタイルコード
    - ランダムスタイル

## 🚀 セットアップ

1. 必要な依存関係をインストール:
```bash
npm install
```

2. 環境変数の設定:
`.env`ファイルを作成し、以下の内容を追加:
```env
IDEOGRAM_API_KEY=your_api_key_here
```

3. ビルド:
```bash
npm run build
```

4. （オプション）グローバルにインストール:
```bash
npm link
```

## 💻 使用方法

### MCPツール

#### generate_image

画像を生成するためのツール。

**必須パラメータ:**
- `prompt`: 画像生成に使用するプロンプト

**オプションパラメータ:**
- `aspect_ratio`: 画像のアスペクト比
  - `ASPECT_1_1`
  - `ASPECT_4_3`
  - `ASPECT_3_4`
  - `ASPECT_16_9`
  - `ASPECT_9_16`
- `model`: 使用するモデル
  - `V_1`
  - `V_1_TURBO`
  - `V_2`
  - `V_2_TURBO`
  - `V_3`
  - `V_3_TURBO`
  - `V_3_DEFAULT`
  - `V_3_QUALITY`
- `magic_prompt_option`: マジックプロンプトの設定
  - `AUTO`
  - `ON`
  - `OFF`
- `style_type`: 生成スタイル
- `negative_prompt`: 除外したい要素の説明
- `num_images`: 生成する画像の数（1-8）
- `style_reference`: スタイル参照オプション（Ideogram 3.0の新機能）
  - `urls`: 参照画像のURL配列（最大3つ）
  - `style_code`: スタイルコード
  - `random_style`: ランダムスタイルを使用するかどうか（boolean）

### 使用例

```typescript
// 基本的な使用例
const result = await use_mcp_tool({
  server_name: "ideagram-mcp-server",
  tool_name: "generate_image",
  arguments: {
    prompt: "A beautiful sunset over mountains",
    aspect_ratio: "ASPECT_16_9",
    model: "V_3_QUALITY", // Ideogram 3.0の最高品質モデル
    num_images: 1
  }
});

// スタイル参照機能を使用する例
const resultWithStyle = await use_mcp_tool({
  server_name: "ideagram-mcp-server",
  tool_name: "generate_image",
  arguments: {
    prompt: "A cat sitting on a window sill",
    aspect_ratio: "ASPECT_1_1",
    model: "V_3_DEFAULT",
    style_reference: {
      urls: [
        "https://example.com/reference_image1.jpg",
        "https://example.com/reference_image2.jpg"
      ]
    }
  }
});

// ランダムスタイルを使用する例
const resultWithRandomStyle = await use_mcp_tool({
  server_name: "ideagram-mcp-server",
  tool_name: "generate_image",
  arguments: {
    prompt: "A futuristic cityscape",
    model: "V_3_TURBO",
    style_reference: {
      random_style: true
    }
  }
});
```

## 🔧 開発

### ディレクトリ構造

```
ideagram-mcp-server/
├── src/
│   ├── index.ts          # メインのサーバーコード
│   └── ideogram-client.ts # Ideogram APIクライアント
├── package.json
├── tsconfig.json
└── README.md
```

### スクリプト

- `npm run build`: TypeScriptのコンパイル
- `npm run watch`: 開発モードでの実行（ファイル変更の監視）
- `npm run lint`: コードのリント
- `npm test`: テストの実行

## 📄 ライセンス

MIT

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m '✨ feat: Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成
