import { checkProtoChain, checkProperties } from './spec.utils'
import { CustomError } from './custom-error'

test('Instance', () => checkProtoChain(CustomError, Error))

test('Instance pre ES6 environment', () => {
	const O = Object as any
	const E = Error as any
	const setPrototypeOf = O.setPrototypeOf
	const captureStackTrace = E.captureStackTrace
	delete O.setPrototypeOf
	delete E.captureStackTrace

	checkProtoChain(CustomError, Error)

	O.setPrototypeOf = setPrototypeOf
	E.captureStackTrace = captureStackTrace
})

test('Extended', () => {
	class SubError extends CustomError {}
	checkProtoChain(SubError, CustomError, Error)
})

test('Extended with constructor', () => {
	class HttpError extends CustomError {
		constructor(public code: number, message?: string) {
			super(message)
		}
	}
	checkProtoChain(HttpError, CustomError, Error)
})

test('Basic properties', () => checkProperties(CustomError))
