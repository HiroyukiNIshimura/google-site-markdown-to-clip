# google-site-markdown-to-clip
VSCode上のMarkdownをgoogle-site-markdownで利用可能な形式でクリップボードにコピーする拡張機能

## 使い方

1. VS CodeでMarkdownファイルを開きます。
2. 必要ならMarkdownの一部を選択します（未選択の場合は文書全体が対象です）。
3. コマンドパレット（`Cmd+Shift+P`）から、またはMarkdownエディター上の右クリックメニューから **Copy as Google Sites Markdown** を実行します。
4. 生成されたGoogle Sites用のスクリプトがクリップボードにコピーされます。

コピーされる形式は次のとおりです。

```html
<script src="https://cdn.jsdelivr.net/gh/tutts/google-sites-markdown/index.js"></script>

<script>
markdown`
<!-- Markdown本文 -->
`
</script>
```

## 開発

依存関係をインストール後、`npm run compile` でビルドできます。`npm test` でテストを実行します。
