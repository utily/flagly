import * as flagly from "./index"

describe("flagly.reduce", () => {
	it("empty", () => {
		const flags = flagly.reduce({}, {})
		expect(flags).toEqual({})
	})
	it("p q single", () => {
		const flags = flagly.reduce({ p: true, q: false }, { single: true })
		expect(flags).toEqual({ p: true, q: false, single: true })
	})
	it("p q !single", () => {
		const flags = flagly.reduce({ p: true, q: false }, { single: false })
		expect(flags).toEqual({ p: true, q: false, single: false })
	})
	it("single p q !single", () => {
		const flags = flagly.reduce({ single: true, p: true, q: false }, { single: false })
		expect(flags).toEqual({ p: true, q: false, single: false })
	})
	it("single.a p q !single", () => {
		const flags = flagly.reduce({ single: { a: true }, p: true, q: false }, { single: false })
		expect(flags).toEqual({ p: true, q: false, single: false })
	})
	it("!a.b a.b.c", () => {
		const flags = flagly.reduce({ a: { b: false } }, { a: { b: { c: true } } })
		expect(flags).toEqual({ a: { b: { c: true } } })
	})
	it("a.b a.b.c", () => {
		const flags = flagly.reduce({ a: { b: true } }, { a: { b: { c: true } } })
		expect(flags).toEqual({ a: { b: { c: true } } })
	})
	it("a.b.c !a.b", () => {
		const flags = flagly.reduce({ a: { b: { c: true } } }, { a: { b: false } })
		expect(flags).toEqual({ a: { b: false } })
	})
	it("true > object", () => {
		expect(flagly.reduce({ a: { b: true } }, { a: true })).toEqual({ a: true })
	})
	it("object > false", () => {
		expect(flagly.reduce({ a: { b: false } }, { a: { b: { c: true } } })).toEqual({ a: { b: { c: true } } })
	})
})
