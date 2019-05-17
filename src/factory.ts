import { fixStack } from './utils'

export interface CustomErrorInterface extends Error {}

export interface CustomErrorProperties {
	[property: string]: any
}

export interface CustomErrorConstructor<
	Properties extends CustomErrorProperties
> extends ErrorConstructor {
	readonly prototype: CustomErrorInterface
	new (...args: any[]): CustomErrorInterface & Properties
	(...args: any[]): CustomErrorInterface & Properties
}

export type GenericErrorConstructor =
	| ErrorConstructor
	| EvalErrorConstructor
	| RangeErrorConstructor
	| ReferenceErrorConstructor
	| SyntaxErrorConstructor
	| TypeErrorConstructor
	| URIErrorConstructor
	| CustomErrorConstructor<CustomErrorProperties>

type CustomErrorFunction<Properties> = (this: Properties, ...args: any[]) => void

/**
 * Allows to easily extend native errors to create custom applicative errors.
 *
 * example:
 * ```
 * const HttpError = customErrorFactory(function (code: number, message= '') {
 * 	this.code = code
 * 	this.message = message
 * })
 *
 * new HttpError(404, 'Not found')
 * ```
 */
export function customErrorFactory<Properties>(
	fn: CustomErrorFunction<Properties>,
	parent: GenericErrorConstructor = Error,
) {
	function CustomError(this: CustomErrorInterface & Properties, ...args: any[]): void {
		// allow simple function call
		if (!(this instanceof CustomError)) return new CustomError(...args)
		// apply super
		parent.apply(this, args)
		// apply custom fn
		fn.apply(this, args)
		// set name from custom fn, default to parent Error name
		this.name = fn.name || parent.name
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
	}) as CustomErrorConstructor<Properties>
}
