/**
 * Fix the prototype chain of the error
 *
 * Use Object.setPrototypeOf
 * Support ES6 environments
 *
 * Fallback setting __proto__
 * Support IE11+, see https://docs.microsoft.com/en-us/scripting/javascript/reference/javascript-version-information
 */
export function fixProto(target: Error, prototype: {}) {
	const setPrototypeOf: Function = (<any>Object).setPrototypeOf
	setPrototypeOf
		? setPrototypeOf(target, prototype)
		: ((<any>target).__proto__ = prototype)
}

/**
 * Capture and fix the error stack when available
 *
 * Use Error.captureStackTrace
 * Support v8 environments
 */
export function fixStack(target: Error, fn: Function = target.constructor) {
	const captureStackTrace: Function = (<any>Error).captureStackTrace
	captureStackTrace && captureStackTrace(target, fn)
}
