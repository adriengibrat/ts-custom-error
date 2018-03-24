import { checkProtoChain, checkProperties } from './spec.utils'
import { customErrorFactory } from './factory'

const TestError = customErrorFactory(function TestError() {
	/**/
})

test('Factory instance', () => checkProtoChain(TestError, Error))

test('Factory extended', () => {
	const SubError = customErrorFactory(function SubError() {
		/**/
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
	type Props = { code: number; message: string }

	function TestError(this: Props, code = 1, message = 'foo') {
		this.code = code
		this.message = message
	}
	checkProperties(customErrorFactory<Props>(TestError), 'foo')

	function AnotherError(this: Props, code = 2, message = 'bar') {
		this.code = code
		this.message = message
	}
	checkProperties(customErrorFactory<Props>(AnotherError), 'bar')

	const ArgsError = customErrorFactory<Props>(
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
