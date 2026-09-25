import * as assert from 'assert';
import { formatForGoogleSites } from '../extension';

suite('Extension Test Suite', () => {
	test('formats Markdown in the Google Sites script wrapper', () => {
		const formatted = formatForGoogleSites('# Hero\n\n- Yep');

		assert.ok(formatted.startsWith('<script src="https://cdn.jsdelivr.net/gh/tutts/google-sites-markdown/index.js"></script>'));
		assert.ok(formatted.includes('markdown`\n# Hero\n\n- Yep\n`;'));
		assert.ok(formatted.endsWith('</script>'));
	});

	test('adds Mermaid rendering support', () => {
		const formatted = formatForGoogleSites('```mermaid\ngraph TD\n  A --> B\n```');

		assert.ok(formatted.includes('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js'));
		assert.ok(formatted.includes("pre > code.language-mermaid"));
		assert.ok(formatted.includes('observer.observe(document.documentElement'));
	});

	test('escapes template literal syntax and normalizes line endings', () => {
		assert.ok(formatForGoogleSites('`code`\r\n${value}').includes('\\`code\\`\n\\${value}'));
	});
});
