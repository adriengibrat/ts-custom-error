import { checkProtoChain, checkProperties } from './spec.utils'
import { factory } from './factory'

const TestError = factory(function TestError() {
	/* noop */
})

test('Factory instance', () => checkProtoChain(TestError, Error))

test('Factory extended', () => {
	const SubError = factory(function SubError() {
		/* noop */
	}, TestError)
	checkProtoChain(SubError, TestError, Error)
	checkProtoChain(factory(SubError, RangeError), RangeError, Error)
})

test('Factory extended by class', () => {
	const TestError = factory(function MyError() {
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
	checkProperties(factory(TestError), 'foo')

	function AnotherError(code = 2, message = 'bar') {
		this.code = code
		this.message = message
	}
	checkProperties(factory(AnotherError), 'bar')

	const ArgsError = factory<{ code: number }>(
		AnotherError,
		factory(TestError),
	)
	const argsError = ArgsError(3, 'baz')
	expect(argsError.message).toBe('baz')
	expect(argsError.code).toBe(3)

	const defaultArgsError = ArgsError()
	expect(defaultArgsError.message).toBe('bar')
	expect(defaultArgsError.code).toBe(2)
})
