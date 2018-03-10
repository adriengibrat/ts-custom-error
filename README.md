# ts-custom-error

<!-- [![Build Status](https://travis-ci.org/adriengibrat/ts-custom-error.svg)](https://travis-ci.org/adriengibrat/ts-custom-error) -->

[![NPM version](https://badge.fury.io/js/ts-custom-error.svg)](http://badge.fury.io/js/ts-custom-error)
[![Dependency Status](https://david-dm.org/adriengibrat/ts-custom-error.svg)](https://david-dm.org/adriengibrat/ts-custom-error)
[![devDependency Status](https://david-dm.org/adriengibrat/ts-custom-error/dev-status.svg)](https://david-dm.org/adriengibrat/ts-custom-error#info=devDependencies)

## Extend native Error to create custom errors

CustomError allow to easyly extends native Error in Typescript

### Using a class
```ts
import { CustomError } from 'ts-custom-error'

class HttpError extends CustomError {
	public constructor(
		public code: number,
		message: string = HttpError.messages[code],
	) {
		super(message)
	}
}
```

### Using the factory
```ts
import { factory } from 'ts-custom-error'

const MyError = factory('MyError', { message: 'foo', code: 42 })
```
