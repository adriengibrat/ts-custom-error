import { fixProto, fixStack } from './utils'

/**
 * Extendable Error
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
