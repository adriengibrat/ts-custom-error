# ts-custom-error

[![Build Status](https://travis-ci.org/adriengibrat/ts-custom-error.svg)](https://travis-ci.org/adriengibrat/ts-custom-error)
[![NPM version](https://badge.fury.io/js/ts-custom-error.svg)](http://badge.fury.io/js/ts-custom-error)
[![Dependency Status](https://david-dm.org/adriengibrat/ts-custom-error.svg)](https://david-dm.org/adriengibrat/ts-custom-error)
[![devDependency Status](https://david-dm.org/adriengibrat/ts-custom-error/dev-status.svg)](https://david-dm.org/adriengibrat/ts-custom-error#info=devDependencies)
[![Maintainability](https://api.codeclimate.com/v1/badges/eb4eb956bc028c49f7aa/maintainability)](https://codeclimate.com/github/adriengibrat/ts-custom-error/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/eb4eb956bc028c49f7aa/test_coverage)](https://codeclimate.com/github/adriengibrat/ts-custom-error/test_coverage)

## Extend native Error to create custom errors

CustomError allow to easyly extends native Error in Typescript

### Using a class
```ts
import { CustomError } from 'ts-custom-error'

class HttpError extends CustomError {
	public constructor(
		public code: number,
		message?: string,
	) {
		super(message)
	}
}

...
new HttpError(404, 'Not found')
```

### Using the factory
```ts
import { factory } from 'ts-custom-error'

const HttpError = factory(function (code, message= '') {
	this.code = code
	this.message = message
})

...
new HttpError(404, 'Not found')
// or
HttpError(404, 'Not found')
```

## Similar packages
- [![custom-error](https://badge.fury.io/js/custom-error.svg)](https://www.npmjs.com/package/custom-error) [custom-error](https://github.com/andrezsanchez/custom-error)
- [![custom-errors](https://badge.fury.io/js/custom-errors.svg)](https://www.npmjs.com/package/custom-errors) [custom-errors](https://github.com/techjacker/custom-errors)
- [![custom-error-generator](https://badge.fury.io/js/custom-error-generator.svg)](https://www.npmjs.com/package/custom-error-generator) [custom-error-generator](https://github.com/jproulx/node-custom-error)
- [![custom-error-instance](https://badge.fury.io/js/custom-error-instance.svg)](https://www.npmjs.com/package/custom-error-instance) [custom-error-instance](https://github.com/Gi60s/custom-error-instance)
- [![node-custom-errors](https://badge.fury.io/js/node-custom-errors.svg)](https://www.npmjs.com/package/node-custom-errors) [node-custom-errors](https://github.com/axyjs/node-custom-errors)
- [![extendable-error](https://badge.fury.io/js/extendable-error.svg)](https://www.npmjs.com/package/extendable-error) [extendable-error](https://github.com/vilic/extendable-error)
- [![extendable-error-class](https://badge.fury.io/js/extendable-error-class.svg)](https://www.npmjs.com/package/extendable-error-class) [extendable-error-class](https://github.com/brillout/extendable-error-class)
- [![extend-error](https://badge.fury.io/js/extend-error.svg)](https://www.npmjs.com/package/extend-error) [extend-error](https://github.com/jayyvis/extend-error)
- [![error-extend](https://badge.fury.io/js/eerror-extend.svg)](https://www.npmjs.com/package/error-extend) [error-extend](https://github.com/tilap/error-extend)
