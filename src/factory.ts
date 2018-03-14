import { fixStack } from './utils'

interface CustomError extends Error {}

interface CustomProperties {
	[property: string]: any
}

interface CustomConstructor<Properties> extends ErrorConstructor {
	readonly prototype: CustomError
	new (...args): CustomError & Properties
	(...args): CustomError & Properties
}

export function customErrorFactory<Properties = CustomError>(
	fn: (...Arguments) => void,
	parent: ErrorConstructor = Error,
): CustomConstructor<Properties> {
	function CustomError(this: CustomError, ...args: any[]): void {
		// allow simple function call
		if (!(this instanceof CustomError)) return new CustomError(...args)
		// apply super
		parent.apply(this, args)
		// apply custom fn
		fn.apply(this, args)
		// try to remove contructor from stack trace
		fixStack(this, CustomError)
	}

	return Object.defineProperties(CustomError, {
		prototype: {
			value: Object.create(parent.prototype, {
				constructor: {
					value: CustomError,
					writable: true,
					configurable: true,
				},
			}),
		},
	})
}
