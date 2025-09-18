/**
 * Utility class for styled logging to the browser console.
 * Provides methods to output informational, warning, and error messages
 * with distinct CSS styles for better readability.
 *
 * @class log
 * @example
 * const logger = new log();
 * logger.out('This is an info message');
 * logger.out('This is a warning', 'warn');
 * logger.out('This is an error', 'error');
 */
export class log {
	// CSS styles for each log type
	styles = {
		info: 'color: #1565c0; background: #e3f2fd; padding: 2px 6px; border-radius: 3px;',
		warn: 'color: #f9a825; background: #fffde7; padding: 2px 6px; border-radius: 3px;',
		error: 'color: #c62828; background: #ffebee; padding: 2px 6px; border-radius: 3px;'
	};
	// Main log function
	out(message, type = 'info') {
		const style = this.styles[type] || this.styles.info;
		if (type === 'warn') {
			console.warn('%c[WARN]', style, message);
		} else if (type === 'error') {
			console.error('%c[ERROR]', style, message);
		} else {
			console.info('%c[INFO]', style, message);
		}
	};
};

