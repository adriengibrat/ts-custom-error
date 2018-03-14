import { checkProtoChain, checkProperties } from './spec.utils'
import { customErrorFactory } from './factory'

const TestError = customErrorFactory(function TestError() {
	/* noop */
})

test('Factory instance', () => checkProtoChain(TestError, Error))

test('Factory extended', () => {
	const SubError = customErrorFactory(function SubError() {
		/* noop */
	}, TestError)
	checkProtoChain(SubError, TestError, Error)
	checkProtoChain(customErrorFactory(SubError, RangeError), RangeError, Error)
})

test('Factory extended by class', () => {
	const TestError = customErrorFactory(function MyError() {
		/* noop */
	}, RangeError) as ErrorConstructor
	class SubError extends TestError {}
	checkProtoChain(SubError, TestError, RangeError, Error)
})

test('Factory properties', () => {
	function TestError(code = 1, message = 'foo') {
		this.code = code
		this.message = message
	}
	checkProperties(customErrorFactory(TestError), 'foo')

	function AnotherError(code = 2, message = 'bar') {
		this.code = code
		this.message = message
	}
	checkProperties(customErrorFactory(AnotherError), 'bar')

	const ArgsError = customErrorFactory<{ code: number }>(
		AnotherError,
		customErrorFactory(TestError),
	)
	const argsError = ArgsError(3, 'baz')
	expect(argsError.message).toBe('baz')
	expect(argsError.code).toBe(3)

	const defaultArgsError = ArgsError()
	expect(defaultArgsError.message).toBe('bar')
	expect(defaultArgsError.code).toBe(2)
})
