import { flagly } from "./index"

describe("flagly.remove", () => {
	it("mutability", () => {
		const flags: flagly.Flags = { user: { view: { foo: true, bar: true }, write: true } }
		expect(flagly.remove(flags)).toEqual(flags)
		expect(flagly.remove(flags)).not.toBe(flags)
	})
	it("no flag", () => {
		expect(flagly.remove({ user: true }, ...[])).toEqual({ user: true })
		expect(flagly.remove({ user: { view: true } }, ...[])).toEqual({ user: { view: true } })
	})
})
