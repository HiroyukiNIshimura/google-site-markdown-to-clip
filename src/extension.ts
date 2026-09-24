import * as vscode from 'vscode';

const SCRIPT_SOURCE = 'https://cdn.jsdelivr.net/gh/tutts/google-sites-markdown/index.js';

/** Formats Markdown as a google-sites-markdown script. */
export function formatForGoogleSites(markdown: string): string {
	const escapedMarkdown = markdown
		.replace(/`/g, '\\`')
		.replace(/\$\{/g, '\\${')
		.replace(/\r\n?/g, '\n')
		.replace(/\n+$/g, '');

	return `<script src="${SCRIPT_SOURCE}"></script>\n\n<script>\nmarkdown\`\n${escapedMarkdown}\n\`\n</script>`;
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
