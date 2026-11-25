import { flagly } from "./index"

describe("flagly.remove", () => {
	it("mutability", () => {
		const flags: flagly.Flags = { user: { view: { foo: true, bar: true }, write: true } }
		expect(flagly.remove(flags)).toEqual(flags)
		expect(flagly.remove(flags)).not.toBe(flags)
	})
	it.each([
		{ flags: { user: true }, path: [], expected: { user: true } },
		{ flags: { user: { view: true } }, path: [], expected: { user: { view: true } } },
		{ flags: { user: true }, path: ["user", "view"], expected: {} },
		{ flags: { user: false }, path: ["user", "view"], expected: {} },
	])("removes path $path", ({ flags, path, expected }) => expect(flagly.remove(flags, ...path)).toEqual(expected))
})
