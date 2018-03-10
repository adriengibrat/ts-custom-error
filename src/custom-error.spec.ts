import { CustomError } from './custom-error'
import { factory } from './factory'

const checkProtoChain = (contructor, ...chain) => () => {
	const error = new contructor()
	expect(error).toBeInstanceOf(contructor)
	chain.forEach(c => expect(error).toBeInstanceOf(c))
}

const checkProperties = (contructor, message = 'foo') => () => {
	const error = new contructor(message)
	expect(error.message).toBe(message)
	expect(error).toHaveProperty('stack')
}

test('Instance', checkProtoChain(CustomError, Error))

test(
	'Extended',
	checkProtoChain(class SubError extends CustomError {}, CustomError, Error),
)

test('Basic properties', checkProperties(CustomError))

test('Factory instance', checkProtoChain(factory('TestError'), Error))

const TestError = factory('TestError')

test(
	'Factory extended',
	checkProtoChain(factory('SubError', {}, TestError), TestError, Error),
)

test(
	'Factory extended by class',
	checkProtoChain(class SubError extends TestError {}, TestError, Error),
)

test(
	'Factory properties',
	checkProperties(factory('TestError', { message: 'default', code: 1 })),
)

test('Factory exended properties', () => {
	const TestError = factory('TestError', { message: 'foo', code: 1 })
	const message = 'my message'
	const code = 42
	const ArgsError = factory<{
		name: 'ArgsError'
		message: string
		code: number
	}>('ArgsError', { message: 'bar', code: 2 }, TestError)
	const argsError = new ArgsError(message, code)
	expect(argsError.message).toBe(message)
	expect(argsError.code).toBe(code)

	const defaultArgsError = new ArgsError()
	expect(defaultArgsError.message).toBe('bar')
	expect(defaultArgsError.code).toBe(2)
})

test('Instance pre ES6 environment', () => {
	delete (<any>Object).setPrototypeOf
	delete (<any>Error).captureStackTrace
	checkProtoChain(CustomError, Error)()
})

// call toString & inspect methods to display examples and for coverage
console.log('%o\n%o', TestError, Error)
console.log('%o\n%o', TestError.toString(), Error.toString())
console.log('%o\n%o', TestError('test'), Error('test'))
console.log('%o\n%o', TestError('msg').toString(), Error('msg').toString())
