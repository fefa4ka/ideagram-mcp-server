# Project: ideagram-mcp-server

```plaintext
OS: posix
Directory: /home/maki/claude_hands-jp-win/workspace/manus/ideagram-mcp-server

├── docs/
│   └── npm-deploy.md
├── src/
│   ├── ideogram-client.ts
│   └── index.ts
├── .env.example
├── .releaserc
├── .SourceSageignore
├── CHANGELOG.md
├── package.json
├── README.md
├── todo.md
└── tsconfig.json
```

## 📂 Gitリポジトリ情報

### 🌐 基本情報

- 🔗 リモートURL: Not configured
- 🌿 デフォルトブランチ: Not configured
- 🎯 現在のブランチ: Unknown
- 📅 作成日時: 2025-05-15 23:01:23
- 📈 総コミット数: 0

## 📊 プロジェクト統計

- 📅 作成日時: 2025-05-18 08:08:40
- 📁 総ディレクトリ数: 2
- 📄 総ファイル数: 11
- 📏 最大深度: 1
- 📦 最大ディレクトリ:  (13 エントリ)

### 📊 ファイルサイズと行数

| ファイル | サイズ | 行数 | 言語 |
|----------|--------|------|------|
| README.md | 9.8 KB | 366 | markdown |
| src/index.ts | 6.3 KB | 188 | typescript |
| src/ideogram-client.ts | 4.6 KB | 140 | typescript |
| docs/npm-deploy.md | 1.6 KB | 27 | markdown |
| package.json | 1.4 KB | 51 | json |
| .github/workflows/npm-publish-release.yml | 1.3 KB | 48 | yaml |
| .github/workflows/npm-semantic-release.yml | 1.2 KB | 43 | yaml |
| todo.md | 894.0 B | 25 | markdown |
| .github/workflows/npm-publish.yml | 837.0 B | 35 | yaml |
| .SourceSageignore | 700.0 B | 56 | plaintext |
| .releaserc | 387.0 B | 16 | plaintext |
| CHANGELOG.md | 363.0 B | 14 | markdown |
| tsconfig.json | 340.0 B | 15 | json |
| .env.example | 89.0 B | 3 | plaintext |
| **合計** |  | **1027** |  |

### 📈 言語別統計

| 言語 | ファイル数 | 総行数 | 合計サイズ |
|------|------------|--------|------------|
| markdown | 4 | 432 | 12.6 KB |
| typescript | 2 | 328 | 10.8 KB |
| yaml | 3 | 126 | 3.3 KB |
| plaintext | 3 | 75 | 1.1 KB |
| json | 2 | 66 | 1.7 KB |

`.SourceSageignore`

**サイズ**: 700.0 B | **行数**: 56 行
```plaintext
# バージョン管理システム関連
.git/
.gitignore

# キャッシュファイル
__pycache__/
.pytest_cache/
**/__pycache__/**
*.pyc

# ビルド・配布関連
build/
dist/
*.egg-info/

# 一時ファイル・出力
output/
output.md
test_output/
.SourceSageAssets/
.SourceSageAssetsDemo/

# アセット
*.png
*.svg
*.jpg
*.jepg
assets/

# その他
LICENSE
example/
package-lock.json
.DS_Store

# 特定のディレクトリを除外
tests/temp/
docs/drafts/

# パターンの例外（除外対象から除外）
!docs/important.md
!.github/workflows/
repository_summary.md

# Terraform関連
.terraform
*.terraform.lock.hcl
*.backup
*.tfstate

# Python仮想環境
venv
.venv

.github
```

`.env.example`

**サイズ**: 89.0 B | **行数**: 3 行
```plaintext
IDEOGRAM_API_KEY=your_api_key_here
# ポート設定 (デフォルト: 8080)
# PORT=8081
```

`.releaserc`

**サイズ**: 387.0 B | **行数**: 16 行
```plaintext
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        "assets": ["package.json"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ]
  ]
}
```

`CHANGELOG.md`

**サイズ**: 363.0 B | **行数**: 14 行
```markdown
# リリースノート

## v0.2.0

### 新機能
- Ideogram 3.0 APIサポートを追加
- スタイルリファレンス機能のサポート
- V3.0用モデルオプションの追加（V_3, V_3_TURBO, V_3_DEFAULT, V_3_QUALITY）

### 改善
- GitHub Actionsによる自動デプロイの設定
- TypeScriptコードの最適化
- ドキュメントの更新
```

`README.md`

**サイズ**: 9.8 KB | **行数**: 366 行
```markdown
<p align="center">
# 🎨 Ideogram MCP Server
</p>

<p align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/sunwood-ai-labs/ideagram-mcp-server">
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/sunwood-ai-labs/ideagram-mcp-server">
<img alt="GitHub issues" src="https://img.shields.io/github/issues/sunwood-ai-labs/ideagram-mcp-server">
<img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/sunwood-ai-labs/ideagram-mcp-server">
<img alt="npm" src="https://img.shields.io/npm/v/@sunwood-ai-labs/ideagram-mcp-server">
<img alt="npm" src="https://img.shields.io/npm/dt/@sunwood-ai-labs/ideagram-mcp-server">
</p>

<p align="center">
Ideogram APIを使用して画像生成機能を提供するModel Context Protocol (MCP) サーバー。<b>Ideogram 3.0</b> に対応！
</p>

https://github.com/user-attachments/assets/041553d3-6fbc-4dfa-b149-d195dcb9e8f8

## 📋 機能

- ✨ プロンプトに基づく画像生成
- 🔧 カスタマイズ可能なパラメータ
  - 📐 アスペクト比
  - 🚀 モデル選択（V1, V2, **V3**）
  - ✨ マジックプロンプト
  - 🎭 スタイルタイプ
  - 🚫 ネガティブプロンプト
  - 🔢 生成画像数
  - 🖼️ **スタイル参照機能**（Ideogram 3.0の新機能）
    - 🔗 URL参照画像（最大3枚）
    - 🎨 スタイルコード
    - 🎲 ランダムスタイル

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

## 🖥️ Claude Desktop での使用方法

Claude Desktopでideagram-mcp-serverを使用するための設定手順です。

### 📋 前提条件

- Claude Desktop がインストールされていること
- Node.js v16以上がインストールされていること
- Ideogram API キーを取得していること

### 🔧 セットアップ手順

1. **インストール**:
```bash
# グローバルにインストール
npm install -g @sunwood-ai-labs/ideagram-mcp-server

# または、プロジェクト内にインストール
npm install @sunwood-ai-labs/ideagram-mcp-server
```

2. **環境設定**:

プロジェクトのルートディレクトリに `.env` ファイルを作成し、以下の内容を追加:
```
IDEOGRAM_API_KEY=your_ideogram_api_key_here
```

3. **サーバー起動**:
```bash
# グローバルインストールした場合
ideagram-mcp-server

# ローカルインストールした場合
npx ideagram-mcp-server
```

4. **Claude Desktop の設定**:

Claude Desktopを開き、以下の手順で設定します:

- 設定メニュー（⚙️）を開く
- 「外部ツール」または「拡張機能」セクションに移動
- 「MCPツールを追加」をクリック
- 以下の情報を入力:
  - **名前**: Ideogram MCP
  - **エンドポイント**: http://localhost:8080
  - **説明**: Ideogram APIを使用した画像生成ツール

**JSON設定ファイルを使用する方法**:

Claude Desktopでは、JSON設定ファイルを使って直接MCPサーバーを設定することもできます。以下の手順に従ってください:

1. Claude Desktopの設定ファイルを開く/作成する:
   - **Windows**: `%AppData%\Claude\claude_desktop_config.json`
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Linux**: `~/.config/Claude/claude_desktop_config.json`

2. 以下のJSON設定を追加/編集する:
```json
{
  "mcpServers": {
    "ideogram": {
      "command": "node",
      "args": [
        "/path/to/ideagram-mcp-server/build/index.js"
      ],
      "env": {
        "IDEOGRAM_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

設定例:

- **npxで実行する場合**(推奨):
```json
{
  "mcpServers": {
    "ideogram": {
      "command": "npx",
      "args": [
        "@sunwood-ai-labs/ideagram-mcp-server"
      ],
      "env": {
        "IDEOGRAM_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

- **特定のバージョンを指定する場合**:
```json
{
  "mcpServers": {
    "ideogram": {
      "command": "npx",
      "args": [
        "@sunwood-ai-labs/ideagram-mcp-server@0.2.1"
      ],
      "env": {
        "IDEOGRAM_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

- **ローカルファイルを直接実行する場合**:
  - **Mac/Linux**の場合:
  ```json
  {
    "mcpServers": {
      "ideogram": {
        "command": "node",
        "args": [
          "/Users/username/ideagram-mcp-server/build/index.js"
        ],
        "env": {
          "IDEOGRAM_API_KEY": "your_api_key_here"
        }
      }
    }
  }
  ```

  - **Windows**の場合:
  ```json
  {
    "mcpServers": {
      "ideogram": {
        "command": "node",
        "args": [
          "C:\\Users\\username\\ideagram-mcp-server\\build\\index.js"
        ],
        "env": {
          "IDEOGRAM_API_KEY": "your_api_key_here"
        }
      }
    }
  }
  ```

> **注意**: `/path/to/` や `username` の部分は実際のパスやユーザー名に置き換えてください。APIキーは直接環境変数として設定することもできますが、パス上に `.env` ファイルを配置することも可能です。

5. **動作確認**:

Claude Desktopのチャットで以下のようにツールを呼び出すことができます:
```
@Ideogram MCP generate_image
プロンプト: 美しい山の夕焼け
アスペクト比: ASPECT_16_9
モデル: V_3_QUALITY
```

### 🔍 トラブルシューティング

- **接続エラーが発生する場合**: サーバーが正しく起動しているか確認してください
- **APIキーエラー**: `.env` ファイルが正しい場所にあり、有効なAPIキーが設定されていることを確認してください
- **ポート競合**: デフォルトポート（8080）が他のアプリケーションと競合している場合は、起動時にポートを指定できます: `ideagram-mcp-server --port 8081`

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

## 🚀 デプロイ

このパッケージはGitHub Actionsを使用して自動的にnpmに公開されます。

### 新バージョンの公開方法

#### タグを使用して公開

1. パッケージのバージョンを更新：
   ```bash
   npm version patch  # パッチバージョンを上げる
   # または
   npm version minor  # マイナーバージョンを上げる
   # または
   npm version major  # メジャーバージョンを上げる
   ```

2. タグをプッシュ：
   ```bash
   git push --follow-tags
   ```

これにより、GitHub Actionsが自動的に新しいバージョンをnpmに公開します。

### 詳細情報

デプロイの詳細な手順や設定については [デプロイドキュメント](./docs/npm-deploy.md) を参照してください。
```

`package.json`

**サイズ**: 1.4 KB | **行数**: 51 行
```json
{
  "name": "@sunwood-ai-labs/ideagram-mcp-server",
  "version": "0.2.1",
  "description": "A Model Context Protocol server for Ideogram API with v3.0 support",
  "type": "module",
  "bin": {
    "ideagram-mcp-server": "./build/index.js"
  },
  "files": [
    "build"
  ],
  "scripts": {
    "build": "tsc && node -e \"require('fs').chmodSync('build/index.js', '755')\"",
    "prepare": "npm run build",
    "watch": "tsc --watch",
    "inspector": "npx @modelcontextprotocol/inspector build/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "0.6.0",
    "axios": "^1.7.9",
    "form-data": "^4.0.2"
  },
  "devDependencies": {
    "@semantic-release/commit-analyzer": "^13.0.1",
    "@semantic-release/git": "^10.0.1",
    "@semantic-release/github": "^11.0.2",
    "@semantic-release/npm": "^12.0.1",
    "@semantic-release/release-notes-generator": "^14.0.3",
    "@types/node": "^20.11.24",
    "semantic-release": "^24.2.3",
    "typescript": "^5.3.3"
  },
  "keywords": [
    "mcp",
    "model-context-protocol",
    "ideogram",
    "ai",
    "image-generation",
    "typescript"
  ],
  "author": "Sunwood AI Labs",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sunwood-ai-labs/ideagram-mcp-server.git"
  },
  "bugs": {
    "url": "https://github.com/sunwood-ai-labs/ideagram-mcp-server/issues"
  },
  "homepage": "https://github.com/sunwood-ai-labs/ideagram-mcp-server#readme"
}
```

`todo.md`

**サイズ**: 894.0 B | **行数**: 25 行
```markdown
# Claude Desktop設定タスク

## リポジトリ状態確認
- [x] リポジトリの現状を確認
- [x] 既存のREADME.mdの内容を確認
- [x] リポジトリ全体の構造を把握

## README.md の改善
- [x] Claude Desktop向けの設定手順を作成
- [x] タイトルを中央揃えに修正
- [x] 技術スタックのバッジを適切に配置
- [x] 各セクションに絵文字を追加して可読性向上
- [x] インストール手順を明確に記載
- [x] 使用方法を明確に記載
- [x] スクリーンショットや図の追加検討

## 環境設定セクション
- [x] `.env`の適切な使用方法を確認
- [x] `.env.example`の存在確認と必要に応じて作成
- [x] セキュリティ設定の確認と記述

## プルリクエスト作成
- [ ] 変更内容をコミット
- [ ] プルリクエストを作成して提出
EOF < /dev/null
```

`tsconfig.json`

**サイズ**: 340.0 B | **行数**: 15 行
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

`.github/workflows/npm-publish-release.yml`

**サイズ**: 1.3 KB | **行数**: 48 行
```yaml
name: NPM Publish on Release

on:
  release:
    types: [published] # GitHubでリリースが公開された時に実行

# GitHub Actionsの権限設定
permissions:
  contents: read # リポジトリ内容への読み取り権限
  packages: write # パッケージ公開の権限

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org/'

      - name: Install dependencies
        run: npm ci

      - name: Get version from release
        id: get_version
        run: echo "VERSION=${GITHUB_REF#refs/tags/}" >> $GITHUB_OUTPUT

      - name: Remove 'v' prefix from version (if present)
        id: clean_version
        run: |
          VERSION="${{ steps.get_version.outputs.VERSION }}"
          CLEAN_VERSION="${VERSION#v}"
          echo "CLEAN_VERSION=${CLEAN_VERSION}" >> $GITHUB_OUTPUT

      - name: Update version in package.json
        run: npm version ${{ steps.clean_version.outputs.CLEAN_VERSION }} --no-git-tag-version

      - name: Build
        run: npm run build

      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

`.github/workflows/npm-publish.yml`

**サイズ**: 837.0 B | **行数**: 35 行
```yaml
name: NPM Publish

on:
  push:
    tags:
      - 'v*' # バージョンタグが作成された時に実行（例: v1.0.0, v0.2.1など）

# GitHub Actionsの権限設定
permissions:
  contents: read # リポジトリ内容への読み取り権限
  packages: write # パッケージ公開の権限

jobs:
  build-and-publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org/'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Publish to NPM
        run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

`.github/workflows/npm-semantic-release.yml`

**サイズ**: 1.2 KB | **行数**: 43 行
```yaml
name: NPM Semantic Release

on:
  push:
    branches:
      - main # mainブランチへのプッシュ時に実行


# GitHub Actionsの権限設定
permissions:
  contents: write # リポジトリ内容（コミット、タグなど）への書き込み権限
  issues: write   # Issueの作成権限
  pull-requests: write # PRへのコメント権限

jobs:
  semantic-release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org/'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Install semantic-release plugins
        run: npm install -D semantic-release @semantic-release/git @semantic-release/commit-analyzer @semantic-release/release-notes-generator @semantic-release/npm @semantic-release/github

      - name: Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

`src/ideogram-client.ts`

**サイズ**: 4.6 KB | **行数**: 140 行
```typescript
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import FormData from 'form-data';

export interface IdeogramStyleReference {
  urls?: string[];
  style_code?: string;
  random_style?: boolean;
}

export interface IdeogramGenerateParams {
  prompt: string;
  aspect_ratio?: string;
  model?: 'V_1' | 'V_1_TURBO' | 'V_2' | 'V_2_TURBO' | 'V_3' | 'V_3_TURBO' | 'V_3_DEFAULT' | 'V_3_QUALITY';
  magic_prompt_option?: 'AUTO' | 'ON' | 'OFF';
  seed?: number;
  style_type?: string;
  negative_prompt?: string;
  num_images?: number;
  resolution?: string;
  color_palette?: {
    name?: string;
    members?: Array<{ color: string; weight?: number }>;
  };
  style_reference?: IdeogramStyleReference;
}

export interface IdeogramResponse {
  created: string;
  data: Array<{
    url: string;
    id: string;
    filepath?: string;
  }>;
}

export class IdeogramClient {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.ideogram.ai';
  private readonly outputDir: string;

  constructor(apiKey: string, outputDir?: string) {
    if (!apiKey) {
      throw new Error('IDEOGRAM_API_KEY is required');
    }
    this.apiKey = apiKey;
    this.outputDir = outputDir || path.join(process.cwd(), 'generated_images');
    
    // 出力ディレクトリが存在しない場合は作成
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  private async downloadImage(url: string, id: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${timestamp}_${id}.png`;
    const filepath = path.join(this.outputDir, filename);

    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(filepath);
        });
        fileStream.on('error', reject);
      }).on('error', reject);
    });
  }

  async generateImage(params: IdeogramGenerateParams): Promise<IdeogramResponse> {
    try {
      // 参照画像がURLとして提供されている場合
      let formData: any = undefined;
      let requestConfig: any = {
        headers: {
          'Api-Key': this.apiKey,
          'Content-Type': 'application/json',
        },
      };
      
      // style_referenceでurlsが指定されている場合はマルチパートフォームデータを使用
      if (params.style_reference?.urls && params.style_reference.urls.length > 0) {
        formData = new FormData();
        
        // 参照画像をダウンロードしてFormDataに追加
        for (let i = 0; i < params.style_reference.urls.length; i++) {
          const url = params.style_reference.urls[i];
          try {
            const response = await axios.get(url, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data, 'binary');
            formData.append(`reference_image_${i+1}`, buffer, `reference_${i+1}.jpg`);
          } catch (error) {
            console.error(`Failed to download reference image from ${url}:`, error);
          }
        }
        
        // その他のパラメータをJSON文字列としてFormDataに追加
        const paramsWithoutStyleReferenceUrls = {
          ...params,
          style_reference: {
            ...params.style_reference,
            urls: undefined // URLsを無効化して重複を避ける
          }
        };
        formData.append('image_request', JSON.stringify(paramsWithoutStyleReferenceUrls));
        
        // FormDataを使用するためのヘッダー設定
        requestConfig.headers['Content-Type'] = 'multipart/form-data';
      }
      
      // 通常のJSONリクエストまたはFormDataリクエストを送信
      const response = await axios.post(
        `${this.baseUrl}/api/v3/generate`,
        formData || { image_request: params },
        requestConfig
      );

      // 画像を自動保存
      const downloadPromises = response.data.data.map(async (img: { url: string; id: string }) => {
        const filepath = await this.downloadImage(img.url, img.id);
        return { ...img, filepath };
      });
      
      const updatedData = await Promise.all(downloadPromises);
      response.data.data = updatedData;

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Ideogram API error: ${error.response?.data?.message || error.message}`);
      }
      throw error;
    }
  }
}
```

`src/index.ts`

**サイズ**: 6.3 KB | **行数**: 188 行
```typescript
#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from "@modelcontextprotocol/sdk/types.js";
import { IdeogramClient, IdeogramGenerateParams, IdeogramStyleReference } from "./ideogram-client.js";

const apiKey = process.env.IDEOGRAM_API_KEY;
if (!apiKey) {
  throw new Error("IDEOGRAM_API_KEY environment variable is required");
}

const ideogramClient = new IdeogramClient(apiKey);

const server = new Server(
  {
    name: "ideagram-mcp-server",
    version: "0.2.0", // v3対応でバージョン更新
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "generate_image",
        description: "Generate an image using Ideogram AI",
        inputSchema: {
          type: "object",
          properties: {
            prompt: {
              type: "string",
              description: "The prompt to use for generating the image (must be in English)"
            },
            aspect_ratio: {
              type: "string",
              description: "The aspect ratio for the generated image",
              enum: ["ASPECT_1_1", "ASPECT_4_3", "ASPECT_3_4", "ASPECT_16_9", "ASPECT_9_16"]
            },
            model: {
              type: "string",
              description: "The model to use for generation",
              enum: ["V_1", "V_1_TURBO", "V_2", "V_2_TURBO", "V_3", "V_3_TURBO", "V_3_DEFAULT", "V_3_QUALITY"]
            },
            magic_prompt_option: {
              type: "string",
              description: "Whether to use magic prompt",
              enum: ["AUTO", "ON", "OFF"]
            },
            style_type: {
              type: "string",
              description: "The style type for generation"
            },
            negative_prompt: {
              type: "string",
              description: "Description of what to exclude from the image (must be in English)"
            },
            num_images: {
              type: "number",
              description: "Number of images to generate (1-8)",
              minimum: 1,
              maximum: 8
            },
            style_reference: {
              type: "object",
              description: "Style reference options for Ideogram 3.0",
              properties: {
                urls: {
                  type: "array",
                  description: "URLs to reference images for style (max 3)",
                  items: {
                    type: "string"
                  },
                  maxItems: 3
                },
                style_code: {
                  type: "string",
                  description: "Style code to apply (alternative to URLs)"
                },
                random_style: {
                  type: "boolean",
                  description: "Whether to use a random style from Ideogram's library"
                }
              }
            }
          },
          required: ["prompt"]
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "generate_image": {
      const args = request.params.arguments;
      if (!args || typeof args.prompt !== "string") {
        throw new McpError(
          ErrorCode.InvalidParams,
          "Prompt is required and must be a string"
        );
      }

      try {
        const params: IdeogramGenerateParams = {
          prompt: args.prompt,
          aspect_ratio: typeof args.aspect_ratio === "string" ? args.aspect_ratio : undefined,
          model: typeof args.model === "string" && ["V_1", "V_1_TURBO", "V_2", "V_2_TURBO", "V_3", "V_3_TURBO", "V_3_DEFAULT", "V_3_QUALITY"].includes(args.model) 
            ? args.model as IdeogramGenerateParams["model"]
            : undefined,
          magic_prompt_option: typeof args.magic_prompt_option === "string" && ["AUTO", "ON", "OFF"].includes(args.magic_prompt_option)
            ? args.magic_prompt_option as IdeogramGenerateParams["magic_prompt_option"]
            : undefined,
          style_type: typeof args.style_type === "string" ? args.style_type : undefined,
          negative_prompt: typeof args.negative_prompt === "string" ? args.negative_prompt : undefined,
          num_images: typeof args.num_images === "number" ? args.num_images : undefined,
        };

        // Ideogram 3.0用のスタイルリファレンス機能
        if (args.style_reference && typeof args.style_reference === "object") {
          const styleRef: IdeogramStyleReference = {};
          
          // URLの配列が存在する場合
          const styleRefObj = args.style_reference as any;
          if (styleRefObj.urls && Array.isArray(styleRefObj.urls)) {
            // 最大3つのURLに制限
            styleRef.urls = styleRefObj.urls.slice(0, 3);
          }
          
          // スタイルコードがある場合
          if (typeof styleRefObj.style_code === "string") {
            styleRef.style_code = styleRefObj.style_code;
          }
          
          // ランダムスタイルの設定
          if (typeof styleRefObj.random_style === "boolean") {
            styleRef.random_style = styleRefObj.random_style;
          }
          
          params.style_reference = styleRef;
        }

        const response = await ideogramClient.generateImage(params);

        return {
          content: [
            {
              type: "text",
              text: `Generated ${response.data.length} image(s):\n${response.data
                .map((img) => `URL: ${img.url}\nSaved to: ${img.filepath}`)
                .join("\n\n")}`
            }
          ]
        };
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          error instanceof Error ? error.message : "Unknown error occurred"
        );
      }
    }

    default:
      throw new McpError(ErrorCode.MethodNotFound, "Unknown tool");
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Ideogram MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
```

`docs/npm-deploy.md`

**サイズ**: 1.6 KB | **行数**: 27 行
```markdown
# NPM自動デプロイのための設定

## NPMトークン発行方法

1. NPMアカウントにログイン後、右上のプロフィールから「Access Tokens」を選択
2. 「Generate New Token」をクリック
3. トークンタイプとして「Automation」を選択（これにより2段階認証をバイパス可能）
4. 必要に応じてトークンの説明と期限を設定
5. 「Generate Token」をクリックして作成
6. 表示されたトークンを安全な場所にコピー（この画面を閉じると二度と見れないため注意）

## GitHubリポジトリの設定

1. リポジトリの「Settings」→「Secrets and variables」→「Actions」を選択
2. 「New repository secret」をクリック
3. 名前を「NPM_TOKEN」に設定し、値に先ほどコピーしたトークンを貼り付け
4. 「Add secret」をクリックして保存

## パッケージ公開方法の選択

GitHub Actionsでの公開トリガーには以下の選択肢があります：
- ブランチへのプッシュ（例：mainブランチへのプッシュ時に公開）
- タグの作成（例：v1.0.0などのタグが作成された時に公開）
- リリースの作成（例：GitHubでリリースが作成された時に公開）
- コミットメッセージパターン（例：「Release v1.0.0」などのメッセージを含むコミット時に公開）

最も推奨されるのは「タグベース」または「リリースベース」の公開方法です。これにより、意図しない公開を防ぎ、バージョン管理が容易になります。
```

