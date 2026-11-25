import { flagly } from "./index"

describe("flagly.set", () => {
	it.each([
		{ flags: { user: true }, expected: { user: true } },
		{ flags: { user: { view: true } }, expected: { user: { view: true } } }
	])("keeps flags without path", ({ flags, expected }) => expect(flagly.set(flags, ...[])).toEqual(expected))
})
