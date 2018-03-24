import { fixProto, fixStack } from './utils'

/**
 * Allows to easily extend a base class to create custom applicative errors.
 *
 * example:
 * ```
 * class HttpError extends CustomError {
 * 	public constructor(
 * 		public code: number,
 * 		message?: string,
 * 	) {
 * 		super(message)
 * 	}
 * }
 *
 * new HttpError(404, 'Not found')
 * ```
 */
export class CustomError extends Error {
	constructor(message?: string) {
		super(message)
		// fix the extended error prototype chain
		// because typescript __extends implementation can't
		// see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
		fixProto(this, new.target.prototype)
		// try to remove contructor from stack trace
		fixStack(this)
	}
}
