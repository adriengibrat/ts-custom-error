export const checkProtoChain = (contructor, ...chain) => {
	const error = new contructor()
	expect(error).toBeInstanceOf(contructor)
	chain.forEach(type => expect(error).toBeInstanceOf(type))
}

export const checkProperties = (contructor, message = 'foo') => {
	const error = new contructor(message)
	expect(error.message).toBe(message)
	expect(error).toHaveProperty('stack')
}
