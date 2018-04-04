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
	const TestError = customErrorFactory(function TestError() {
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
	checkProperties(customErrorFactory<Props>(TestError)(), {
		name: 'TestError',
		code: 1,
		message: 'foo',
	})

	checkProperties(
		customErrorFactory<Props>(function(
			this: Props,
			code = 2,
			message = 'bar',
		) {
			this.code = code
			this.message = message
		})(),
		{
			name: 'Error',
			code: 2,
			message: 'bar',
		},
	)
	checkProperties(
		customErrorFactory<Props>(function(
			this: Props,
			code = 2,
			message = 'bar',
		) {
			this.code = code
			this.message = message
		},
		RangeError)(),
		{
			name: 'RangeError',
			code: 2,
			message: 'bar',
		},
	)
	checkProperties(
		customErrorFactory<Props>(function(
			this: Props,
			code = 2,
			message = 'bar',
		) {
			this.code = code
			this.message = message
		},
		customErrorFactory<Props>(TestError))(),
		{
			name: 'CustomError',
			code: 2,
			message: 'bar',
		},
	)

	const ArgsError = customErrorFactory<Props>(TestError)
	checkProperties(ArgsError(3, 'baz'), {
		name: 'TestError',
		code: 3,
		message: 'baz',
	})
	checkProperties(ArgsError(), {
		name: 'TestError',
		code: 1,
		message: 'foo',
	})
})
