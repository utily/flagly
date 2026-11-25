import { flagly } from "./index"

describe("flagly.unset", () => {
	it.each([
		{ flags: { user: true }, expected: { user: true } },
		{ flags: { user: { view: true } }, expected: { user: { view: true } } }
	])("keeps flags without path", ({ flags, expected }) => expect(flagly.unset(flags, ...[])).toEqual(expected))
})
