import * as flagly from "./index"

describe ("flagly.parse", () => {
	it("empty", () => {
		const flags = flagly.parse("")
		expect(flags).toEqual({})
	})
	it("single", () => {
		const flags = flagly.parse("single")
		expect(flags).toEqual({ single: true })
	})
	it("+single", () => {
		const flags = flagly.parse("+single")
		expect(flags).toEqual({ single: true })
	})
	it("-single", () => {
		const flags = flagly.parse("-single")
		expect(flags).toEqual({})
	})
	it("!single", () => {
		const flags = flagly.parse("!single")
		expect(flags).toEqual({})
	})
	it("a.b.c", () => {
		const flags = flagly.parse("a.b.c")
		expect(flags).toEqual({ a: { b: { c: true } } })
	})
	it("a.b a.b.c", () => {
		const flags = flagly.parse("a.b a.b.c")
		expect(flags).toEqual({ a: { b: { c: true } } })
	})
	it("a.b.c !a.b", () => {
		const flags = flagly.parse("a.b.c !a.b")
		expect(flags).toEqual({ a: { } })
	})
})
