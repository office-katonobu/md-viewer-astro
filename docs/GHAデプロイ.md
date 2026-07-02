### 1. 本番デプロイの要件と技術方針

| 項目 | 方針・対応策 |
| --- | --- |
| **リポジトリ構成** | Astro（ロジック）とMarkdown（コンテンツ）を分離。GitHub Actions内でMarkdownを `git clone` し、`src/content/docs` へ配置する。 |
| **Astroベースパス** | `astro.config.mjs` に `base: process.env.BASE_PATH |
| **認証・権限** | OIDC（GitHub Actions - AWS間の信頼関係）を使用。S3への `s3 sync` および CloudFrontの `create-invalidation` 権限を付与済み。 |
| **ビルド環境** | GitHub Actions runner上で、Node.jsセットアップ → コンテンツ配置 → `npm run build` を実行。 |

---

### 2. 今後の作業ステップ（ロードマップ）

スムーズにデプロイを自動化するため、以下の順序で実装を進めます。

#### ステップ①：Astro環境の設定変更

* `astro.config.mjs` を環境変数（`BASE_PATH`）対応に変更。
* 本番ビルド時にデバッグパネルを無効化する処理の最終確認（`.env.production` の活用）。

#### ステップ②：GitHub Actions ワークフローの作成

* MarkdownリポジトリのPushをトリガーとするYAMLファイルの作成。
* 認証情報の読み込み、ソースコードのチェックアウト、コンテンツのコピー、ビルド、デプロイ（S3 sync & CloudFront Invalidation）の一連の流れを実装。

#### ステップ③：ビルド成果物の検証

* 実際にビルドされたアーティファクトを確認し、リンクパス（辞書検索ロジック）が本番環境の `base` 設定と正しく整合しているかテスト。

#### ステップ④：デプロイ実行と環境変数設定

* GitHub Secretsへの環境変数（`BASE_PATH`, `AWS_ROLE_ARN`, `AWS_S3_BUCKET`, `AWS_CLOUDFRONT_DIST_ID`）の登録と実行。

---

### 次の作業指示

上記ステップのうち、まずは **ステップ①（Astroの設定修正）とステップ②（GitHub Actionsの設計）** から取り掛かりたいと思います。

特に、GitHub Actionsのワークフローについては、下記の情報が確定していればすぐにYAMLコードを生成可能です。

1. **Markdownリポジトリのアクセス:** * Markdownリポジトリはプライベートですか？（プライベートの場合、`actions/checkout` に `token` の設定が必要になります）
2. **Base Pathの運用方針:**
* ルート直下運用（`/`）か、サブディレクトリ（例：`/docs/`）か、今の時点の予定はどちらでしょうか？



これらについて教えていただければ、**「Astroの設定修正コード」と「GitHub ActionsのYAML雛形」** を同時に提示します。準備はよろしいでしょうか？