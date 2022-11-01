import { fixProto, fixStack } from './utils'

// copy from https://github.com/microsoft/TypeScript/blob/main/lib/lib.es2022.error.d.ts
// avoid https://github.com/adriengibrat/ts-custom-error/issues/81 isue
interface ErrorOptions {
    cause?: unknown
}

/**
 * Allows to easily extend a base class to create custom applicative errors.
 *
 * example:
 * ```
 * class HttpError extends CustomError {
 * 	public constructor(
 * 		public code: number,
 * 		message?: string,
 *      cause?: Error,
 * 	) {
 * 		super(message, { cause })
 * 	}
 * }
 *
 * new HttpError(404, 'Not found')
 * ```
 */
export class CustomError extends Error {
	name: string

	constructor(message?: string, options?: ErrorOptions) {
		super(message, options)
		// set error name as constructor name, make it not enumerable to keep native Error behavior
		// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target#new.target_in_constructors
		// see https://github.com/adriengibrat/ts-custom-error/issues/30
		Object.defineProperty(this, 'name', {
			value: new.target.name,
			enumerable: false,
			configurable: true,
		})
		// fix the extended error prototype chain
		// because typescript __extends implementation can't
		// see https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
		fixProto(this, new.target.prototype)
		// try to remove contructor from stack trace
		fixStack(this)
	}
}
