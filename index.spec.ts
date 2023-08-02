import { flagly } from "./index"

describe("flagly", () => {
	it("stringify", () => {
		const testString = "a.b.c a.b.d e.s -test"
		const flags = flagly.parse(testString)
		expect(flagly.Flags.stringify(flags)).toEqual(testString)
	})
	it("get", () => {
		const flags: flagly.Flags = { user: { view: true } }
		expect(flagly.get.path(flags, "user.view")).toEqual(true)
		expect(flagly.get.path(flags, "user.edit")).toEqual(false)
	})
	it("set", () => {
		const flags: flagly.Flags = { user: { view: true } }
		expect(flagly.set.path(flags, "user.write")).toEqual({ user: { view: true, write: true } })
		expect(flagly.set.path(flags, "org.write")).toEqual({ user: { view: true }, org: { write: true } })
	})
	it("unset", () => {
		const flags: flagly.Flags = { user: { view: true, write: true } }
		expect(flagly.unset.path(flags, "user.write")).toEqual({ user: { view: true, write: false } })
		expect(flagly.unset.path(flags, "org.view", "user.write")).toEqual({
			user: { view: true, write: false },
			org: { view: false },
		})
	})
	it("remove", () => {
		const flags: flagly.Flags = { user: { view: { foo: true, bar: true }, write: true } }
		expect(flagly.remove.path(flags, "user.view.foo", "user.view.bar")).toEqual({ user: { write: true } })
		expect(flagly.remove.path(flags, "user.view.foo", "user.view.bar", "user.write")).toEqual({})
	})
})
