import { flagly } from "./index"

describe("flagly", () => {
	it("stringify", () => {
		const testString = "a.b.c a.b.d e.s -test"
		const flags = flagly.parse(testString)
		expect(flagly.Flags.stringify(flags)).toEqual(testString)
	})
	it("stringify negative name", () => {
		const minusName = { "-test": { user: true, org: false } }
		expect(flagly.parse(flagly.Flags.stringify(minusName))).toEqual(minusName)
	})

	it("get.path", () => {
		const flags: flagly.Flags = { user: { view: true, write: true } }
		expect(flagly.get.path(flags, "user.view")).toEqual(true)
		expect(flagly.get.path(flags, "user.view", "user.write")).toEqual(true)
		expect(flagly.get.path(flags, "user.edit")).toEqual(false)
		expect(flagly.get.path(flags, "user.view", "user.edit")).toEqual(false)
	})
	it("set.path", () => {
		const flags: flagly.Flags = { user: { view: true } }
		expect(flagly.set.path(flags, "user.write")).toEqual({ user: { view: true, write: true } })
		expect(flagly.set.path(flags, "org.write")).toEqual({ user: { view: true }, org: { write: true } })
	})
	it("unset.path", () => {
		const flags: flagly.Flags = { user: { view: true, write: true } }
		expect(flagly.unset.path(flags, "user.write")).toEqual({ user: { view: true, write: false } })
		expect(flagly.unset.path(flags, "org.view", "user.write")).toEqual({
			user: { view: true, write: false },
			org: { view: false },
		})
	})
	it("remove.path", () => {
		const flags: flagly.Flags = { user: { view: { foo: true, bar: true }, write: true } }
		expect(flagly.remove.path(flags, "user.view.foo", "user.view.bar")).toEqual({ user: { write: true } })
		expect(flagly.remove.path(flags, "user.view.foo", "user.view.bar", "user.write")).toEqual({})
		expect(flags).not.toEqual({})
		expect(flagly.remove(flags, "user")).toEqual({})
	})
})
