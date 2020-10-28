import * as flagly from "./index"

describe("flagly", () => {
	it("stringify", () => {
		const testString = "a.b.c a.b.d e.s -test"
		const flags = flagly.parse(testString)
		expect(flagly.Flags.stringify(flags)).toEqual(testString)
	})
})
