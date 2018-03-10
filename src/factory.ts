import { fixStack } from './utils'

export interface CustomErrorConstructor<CustomError extends Error>
	extends ErrorConstructor {
	new (...args): CustomError
	(...args): CustomError
	readonly prototype: CustomError
}

export const factory = <CustomError extends Error = Error>(
	name: string,
	props: { [prop: string]: any } = { message: undefined },
	parent: CustomErrorConstructor<CustomError> | ErrorConstructor = Error,
): CustomErrorConstructor<CustomError> => {
	const properties = Object.keys(props)

	const constructor = function(this: Error, ...args: any[]): void {
		// allow simple function call
		if (!(this instanceof constructor)) return new constructor(...args)
		// call super
		parent.apply(this, args)
		// set properties from arguments or default values
		properties.forEach((key, index) =>
			Object.defineProperty(this, key, {
				value: index in args ? args[index] : props[key],
				writable: true,
				configurable: true,
			}),
		)
		// try to remove contructor from stack trace
		fixStack(this, constructor)
	}

	return Object.defineProperties(constructor, {
		prototype: {
			value: Object.create(parent.prototype, {
				name: { value: name },
				toString: {
					value: function() {
						return `${this.name}: ${this.message}`
					},
				},
				inspect: {
					value: function() {
						return this.stack
					},
				},
			}),
		},
		toString: {
			value: () => `function ${name}(${properties}) { [custom code] }`,
		},
		inspect: { value: () => `{ [Function: ${name}] }` },
	})
}
