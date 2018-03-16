import { fixStack } from './utils'

export interface CustomErrorInterface extends Error {}

export interface CustomErrorConstructor<Properties> extends ErrorConstructor {
	readonly prototype: CustomErrorInterface
	new (...args): CustomErrorInterface & Properties
	(...args): CustomErrorInterface & Properties
}

export interface CustomErrorProperties {
	[property: string]: any
}

export function customErrorFactory<Properties = CustomErrorProperties>(
	fn: (...Arguments) => void,
	parent: ErrorConstructor = Error,
): CustomErrorConstructor<Properties> {
	function CustomError(this: CustomErrorInterface, ...args: any[]): void {
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
