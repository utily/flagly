import { flagly } from "./index"

describe("flagly", () => {
	it("stringify", () => {
		const testString = "a.b.c a.b.d e.s -test"
		const flags = flagly.parse(testString)
		expect(flagly.stringify(flags)).toEqual(testString)
	})

	it.each([
		{ path: ["user.view"], expected: true },
		{ path: ["user.view", "user.write"], expected: true },
		{ path: ["user.edit"], expected: false },
		{ path: ["user.view", "user.edit"], expected: false }
	])("get.path $path", ({ path, expected }) => {
		const flags: flagly.Flags = { user: { view: true, write: true } }
		expect(flagly.get.path(flags, ...path)).toEqual(expected)
	})
	it.each([
		{ path: "user.write", expected: { user: { view: true, write: true } } },
		{ path: "org.write", expected: { user: { view: true }, org: { write: true } } }
	])("set.path $path", ({ path, expected }) => {
		const flags: flagly.Flags = { user: { view: true } }
		expect(flagly.set.path(flags, path)).toEqual(expected)
	})
	it.each([
		{ path: ["user.write"], expected: { user: { view: true, write: false } } },
		{ path: ["org.view", "user.write"], expected: { user: { view: true, write: false }, org: { view: false } } }
	])("unset.path $path", ({ path, expected }) => {
		const flags: flagly.Flags = { user: { view: true, write: true } }
		expect(flagly.unset.path(flags, ...path)).toEqual(expected)
	})
	it.each([
		{ path: ["user.view.foo", "user.view.bar"], expected: { user: { write: true } } },
		{ path: ["user.view.foo", "user.view.bar", "user.write"], expected: {} }
	])("remove.path $path", ({ path, expected }) => {
		const flags: flagly.Flags = { user: { view: { foo: true, bar: true }, write: true } }
		expect(flagly.remove.path(flags, ...path)).toEqual(expected)
		expect(flags).not.toEqual({})
		expect(flagly.remove(flags, "user")).toEqual({})
	})
})
