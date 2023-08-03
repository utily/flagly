import { flagly } from "./index"

describe("flagly", () => {
	it("stringify", () => {
		const testString = "a.b.c a.b.d e.s -test"
		const flags = flagly.parse(testString)
		expect(flagly.Flags.stringify(flags)).toEqual(testString)
	})
	it("remove", () => {
		const flags: flagly.Flags = { user: { view: { foo: true, bar: true }, write: true } }
		expect(flagly.remove.path(flags, "user.view.foo", "user.view.bar")).toEqual({ user: { write: true } })
		expect(flagly.remove.path(flags, "user.view.foo", "user.view.bar", "user.write")).toEqual({})
		expect(flags).not.toEqual({})
		expect(flagly.remove(flags, "user")).toEqual({})
	})
})
