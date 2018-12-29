import { CustomError } from '../custom-error'

const internals = () =>
	// HACK process binding is deprecated see https://github.com/nodejs/node/pull/22004
	Object.keys((process as any).binding('natives')).concat(['bootstrap_node', 'node'])

const filters = (names: string[]) =>
	names.map(name => new RegExp(`\\(${name}\\.js:\\d+:\\d+\\)$`))

const reducer = patterns => (line: string) =>
	patterns.some(pattern => pattern.test(line)) ? ([] as string[]) : line

const cleanStack = (
	stack: string,
	filter: (line: string) => string[] | string,
) =>
	stack
		.split('\n')
		.reduce((stack, line) => stack.concat(filter(line)), [])
		.join('\n')

/**
 * Clean Stacktrace error
 *
 * Usage:
 * const error = CleanError.from('My message')
 * console.log(error.cleanStack())
 */
export class CleanError extends CustomError {
	private static node = reducer(filters(internals()))

	public constructor(message: string) {
		super(message)
	}

	public static from(message: string) {
		return new CleanError(message)
	}

	public cleanStack(filter = CleanError.node) {
		return cleanStack(this.stack, filter)
	}
}
