# Typescript Custom Error

[![NPM version](https://img.shields.io/npm/v/ts-custom-error.svg?colorB=green)](https://www.npmjs.com/package/ts-custom-error)
[![WTFPL](https://img.shields.io/npm/l/ts-custom-error.svg?colorB=green)](http://www.wtfpl.net)
[![Build Status](https://img.shields.io/travis/adriengibrat/ts-custom-error.svg)](https://travis-ci.org/adriengibrat/ts-custom-error)
[![Code Quality](https://img.shields.io/bithound/code/github/adriengibrat/ts-custom-error.svg)](https://www.bithound.io/github/adriengibrat/ts-custom-error/master)
[![Maintainability](https://img.shields.io/codeclimate/maintainability/adriengibrat/ts-custom-error.svg)](https://codeclimate.com/github/adriengibrat/ts-custom-error/maintainability)
[![Test Coverage](https://img.shields.io/codeclimate/c/adriengibrat/ts-custom-error.svg)](https://codeclimate.com/github/adriengibrat/ts-custom-error/test_coverage)
[![devDependencies](https://img.shields.io/david/dev/adriengibrat/ts-custom-error.svg)](https://www.bithound.io/github/adriengibrat/ts-custom-error/master/dependencies/npm)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Extend native Error to create custom errors

`ts-custom-error` is a tiny (~500 bytes of minified & gzipped Javascript) package providing a `CustomError` class and/or a `customErrorFactoryfactory` to easyly extends native Error in node and in the browser. It contains Typescript definition files, map files and bundled js files for various environments (transpiled es5 with commonjs, module and umd exports flavor), trying to offer the best development and debug experiences.

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

More [advanced examples](https://github.com/adriengibrat/ts-custom-error/tree/master/src/example)

### Using a factory

```ts
import { customErrorFactory } from 'ts-custom-error'

const HttpError = customErrorFactory(function (code, message= '') {
	this.code = code
	this.message = message
})

...
new HttpError(404, 'Not found')
// or
HttpError(404, 'Not found')
```

Factory still allows custom logic inside constructor

They pass the same unit tests, the difference is that constructor can be called as a simple function

## About

### Automate all the things

This project is a playground for various external services and tools, it use:
- opinionated code style mostly inspired from [standardjs](https://standardjs.com)
- automatic code formating with [prettier](https://github.com/prettier/prettier)
- code quality analysis by [codeclimate](https://codeclimate.com/github/adriengibrat/ts-custom-error) & [bithound](https://www.bithound.io/github/adriengibrat/ts-custom-error)
- automated continuous integration on [travis](https://travis-ci.org/adriengibrat/ts-custom-error)
- automated semantic versioning with [changelog](CHANGELOG.md) generation and release depoyment on [npm](https://www.npmjs.com/package/ts-custom-error) and [github](https://github.com/adriengibrat/ts-custom-error/releases) thanks to [semantic-release](https://github.com/semantic-release/semantic-release)

### Usefull development commands

- Watch source changes and run corresponding unit tests
```
npm start
```
- Run all unit tests
```
npm test
```
- Get coverage report
```
npm run coverage
```
- Format staged code and run commitizen (enforce commit message convention)
```
npm run commit
```

## Similar packages
- [![custom-error](https://badge.fury.io/js/custom-error.svg)](https://www.npmjs.com/package/custom-error) [custom-error](https://github.com/andrezsanchez/custom-error)
- [![custom-errors](https://badge.fury.io/js/custom-errors.svg)](https://www.npmjs.com/package/custom-errors) [custom-errors](https://github.com/techjacker/custom-errors)
- [![custom-error-generator](https://badge.fury.io/js/custom-error-generator.svg)](https://www.npmjs.com/package/custom-error-generator) [custom-error-generator](https://github.com/jproulx/node-custom-error)
- [![custom-error-instance](https://badge.fury.io/js/custom-error-instance.svg)](https://www.npmjs.com/package/custom-error-instance) [custom-error-instance](https://github.com/Gi60s/custom-error-instance)
- [![node-custom-errors](https://badge.fury.io/js/node-custom-errors.svg)](https://www.npmjs.com/package/node-custom-errors) [node-custom-errors](https://github.com/axyjs/node-custom-errors)
- [![extendable-error](https://badge.fury.io/js/extendable-error.svg)](https://www.npmjs.com/package/extendable-error) [extendable-error](https://github.com/vilic/extendable-error)
- [![extendable-error-class](https://badge.fury.io/js/extendable-error-class.svg)](https://www.npmjs.com/package/extendable-error-class) [extendable-error-class](https://github.com/brillout/extendable-error-class)
- [![extend-error](https://badge.fury.io/js/extend-error.svg)](https://www.npmjs.com/package/extend-error) [extend-error](https://github.com/jayyvis/extend-error) not maintained, somewhat limited to custom code error property, attach method to global Error object
- [![error-extend](https://badge.fury.io/js/eerror-extend.svg)](https://www.npmjs.com/package/error-extend) [error-extend](https://github.com/tilap/error-extend) not maintained, limited to custom code error property

