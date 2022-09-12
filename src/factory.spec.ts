import { customErrorFactory, GenericErrorConstructor } from './factory';
import { checkProperties, checkProtoChain } from './spec.utils';

const TestError = customErrorFactory(function TestError() {
	/**/
})

type Props = { code: number; message: string }

const createTestErrorInstance = (parent?: GenericErrorConstructor) =>
	customErrorFactory<Props>(function (
		this: Props,
		code = 2,
		message = 'bar',
	) {
		this.code = code
		this.message = message
	}, parent)()

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
	class SubError extends TestError { }
	checkProtoChain(SubError, TestError, RangeError, Error)
})

test('Factory extended with name', () => {
	const RenamedError = customErrorFactory(function RenamedError(this: RangeError, message: string) {
		this.message = message
		Object.defineProperty(this, 'name', { value: 'test' });
	}, RangeError)
	checkProtoChain(RenamedError, RangeError, Error)
	checkProperties(new RenamedError('test message'), {
		name: 'test',
		message: 'test message',
	})
})

test('Factory properties', () => {
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
		createTestErrorInstance(),
		{
			name: 'Error',
			code: 2,
			message: 'bar',
		},
	)
	checkProperties(
		createTestErrorInstance(RangeError),
		{
			name: 'RangeError',
			code: 2,
			message: 'bar',
		},
	)
	checkProperties(
		createTestErrorInstance(customErrorFactory<Props>(TestError)),
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

test('Native log behaviour', () =>
	expect(`${customErrorFactory(function TestError(this: Props, message) {
		this.message = message
	})('Hello')}`).toMatch('TestError: Hello'))


type ErrorWithCause = { message?: string, cause?: unknown; }

test('Error cause', () => {
	const cause = new Error()
	const TestError = customErrorFactory(function TestError(this: ErrorWithCause, message?: string, options?: { cause: unknown }) {
		this.message = message
		this.cause = options?.cause
	})
	checkProperties(new TestError('test message', { cause }), {
		name: 'TestError',
		message: 'test message',
		cause,
	})
})
