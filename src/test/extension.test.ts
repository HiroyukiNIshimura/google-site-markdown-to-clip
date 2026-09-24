import * as assert from 'assert';
import { formatForGoogleSites } from '../extension';

suite('Extension Test Suite', () => {
	test('formats Markdown in the Google Sites script wrapper', () => {
		assert.strictEqual(
			formatForGoogleSites('# Hero\n\n- Yep'),
			'<script src="https://cdn.jsdelivr.net/gh/tutts/google-sites-markdown/index.js"></script>\n\n<script>\nmarkdown`\n# Hero\n\n- Yep\n`\n</script>',
		);
	});

	test('escapes template literal syntax and normalizes line endings', () => {
		assert.ok(formatForGoogleSites('`code`\r\n${value}').includes('\\`code\\`\n\\${value}'));
	});
});
