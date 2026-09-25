import * as vscode from 'vscode';

const SCRIPT_SOURCE = 'https://cdn.jsdelivr.net/gh/tutts/google-sites-markdown/index.js';
const MERMAID_SOURCE = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';

/** Formats Markdown as a google-sites-markdown script. */
export function formatForGoogleSites(markdown: string): string {
	const escapedMarkdown = markdown
		.replace(/`/g, '\\`')
		.replace(/\$\{/g, '\\${')
		.replace(/\r\n?/g, '\n')
		.replace(/\n+$/g, '');

	return `<script src="${SCRIPT_SOURCE}"></script>\n<script src="${MERMAID_SOURCE}"></script>\n\n<script>\nmarkdown\`\n${escapedMarkdown}\n\`;\n\n(() => {\n\tconst renderMermaid = () => {\n\t\tconst root = document.querySelector('.markdown-body');\n\n\t\tif (!root || !window.mermaid) {\n\t\t\treturn false;\n\t\t}\n\n\t\tconst blocks = root.querySelectorAll('pre > code.language-mermaid');\n\n\t\tfor (const code of blocks) {\n\t\t\tconst diagram = document.createElement('div');\n\t\t\tdiagram.className = 'mermaid';\n\t\t\tdiagram.textContent = code.textContent || '';\n\n\t\t\tconst pre = code.parentElement;\n\t\t\tif (pre) {\n\t\t\t\tpre.replaceWith(diagram);\n\t\t\t}\n\t\t}\n\n\t\tif (blocks.length > 0) {\n\t\t\tmermaid.initialize({ startOnLoad: false });\n\t\t\tvoid mermaid.run({\n\t\t\t\tnodes: root.querySelectorAll('.mermaid'),\n\t\t\t}).catch(console.error);\n\t\t}\n\n\t\treturn true;\n\t};\n\n\tconst observer = new MutationObserver(() => {\n\t\tif (renderMermaid()) {\n\t\t\tobserver.disconnect();\n\t\t}\n\t});\n\n\tobserver.observe(document.documentElement, {\n\t\tchildList: true,\n\t\tsubtree: true,\n\t});\n\n\trenderMermaid();\n})();\n</script>`;
}

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		'google-site-markdown-to-clip.copy',
		async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				void vscode.window.showWarningMessage('Open a Markdown document first.');
				return;
			}

			const selection = editor.selection;
			const markdown = selection.isEmpty
				? editor.document.getText()
				: editor.document.getText(selection);
			if (!markdown.trim()) {
				void vscode.window.showWarningMessage('The Markdown document is empty.');
				return;
			}

			await vscode.env.clipboard.writeText(formatForGoogleSites(markdown));
			void vscode.window.showInformationMessage('Copied Google Sites Markdown to the clipboard.');
		},
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
