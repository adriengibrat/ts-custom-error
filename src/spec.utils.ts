export const checkProtoChain = (contructor, ...chain) => {
	const error = new contructor()
	expect(error).toBeInstanceOf(contructor)
	chain.forEach(c => expect(error).toBeInstanceOf(c))
}

export const checkProperties = (contructor, message = 'foo') => {
	const error = new contructor(message)
	expect(error.message).toBe(message)
	expect(error).toHaveProperty('stack')
}
