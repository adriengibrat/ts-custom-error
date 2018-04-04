type AnyConstructor = {
	new (...args): any
}

export const checkProtoChain = (
	contructor: AnyConstructor,
	...chain: AnyConstructor[]
) => {
	const error = new contructor()
	expect(error).toBeInstanceOf(contructor)
	chain.forEach(type => expect(error).toBeInstanceOf(type))
}

type CheckedProperties = {
	[key: string]: any
	name: string
	message: string
}
export const checkProperties = (error: any, properties: CheckedProperties) => {
	Object.keys(properties).forEach(property =>
		expect(error[property]).toBe(properties[property]),
	)
	const stackPattern = properties.message
		? `${properties.name}: ${properties.message}`
		: new RegExp(`^${properties.name}\\s`)
	expect(error.stack).toMatch(stackPattern)
}
