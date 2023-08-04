import { flagly } from "./index"

describe("flagly.Flags", () => {
	it("is", () => {
		expect(flagly.Flags.is({})).toEqual(true)
		expect(flagly.Flags.is({ user: true })).toEqual(true)
		expect(flagly.Flags.is({ user: { read: true } })).toEqual(true)
		expect(flagly.Flags.is({ id: { user: { read: true, write: false } } })).toEqual(true)
		expect(flagly.Flags.is({ user: undefined })).toEqual(true)
		expect(flagly.Flags.is({ user: {} })).toEqual(true)
		expect(flagly.Flags.is({ user: 123 })).toEqual(false)
		expect(flagly.Flags.is({ user: { read: "123" } })).toEqual(false)
		expect(flagly.Flags.is({ user: null })).toEqual(false)
	})
})
