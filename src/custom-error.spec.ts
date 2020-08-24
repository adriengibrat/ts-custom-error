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
	checkProperties(new CustomError(), {
		name: 'CustomError',
		message: '',
	})
	O.setPrototypeOf = setPrototypeOf
	E.captureStackTrace = captureStackTrace
})

test('Extended', () => {
	class SubError extends CustomError {}
	checkProtoChain(SubError, CustomError, Error)
	checkProperties(new SubError('test message'), {
		name: 'SubError',
		message: 'test message',
	})
})

test('Extended with constructor', () => {
	class HttpError extends CustomError {
		constructor(public code: number, message?: string) {
			super(message)
		}
	}
	checkProtoChain(HttpError, CustomError, Error)
	checkProperties(new HttpError(404, 'test message'), {
		name: 'HttpError',
		code: 404,
		message: 'test message',
	})
})

test('Extended with name', () => {
	class RenamedError extends CustomError {
		constructor(name: string, message?: string) {
			super(message)
			Object.defineProperty(this, 'name', { value: name });
		}
	}
	checkProtoChain(RenamedError, CustomError, Error)
	checkProperties(new RenamedError('test', 'test message'), {
		name: 'test',
		message: 'test message',
	})
})

test('Basic properties', () =>
	checkProperties(new CustomError('my message'), {
		name: 'CustomError',
		message: 'my message',
	}))

test('Without message', () =>
	checkProperties(new CustomError(), {
		name: 'CustomError',
		message: '',
	}))

test('Native log behaviour', () =>
	expect(`${new CustomError('Hello')}`).toMatch('CustomError: Hello'))
