import { flagly } from "./index"

describe("merge", () => {
	it("prefer true on lower nesting", () => {
		expect(flagly.merge({ a: true }, { a: { b: true } })).toEqual({ a: true })
		expect(flagly.merge({ a: { b: true } }, { a: true })).toEqual({ a: true })
	})
	it("prefer true over false", () => {
		expect(flagly.merge({ a: false }, { a: true })).toEqual({ a: true })
		expect(flagly.merge({ a: true }, { a: false })).toEqual({ a: true })
	})
	it("prefer true over object", () => {
		expect(flagly.merge({ a: true, b: true }, { a: { c: true }, d: true })).toEqual({ a: true, b: true, d: true })
		expect(flagly.merge({ a: { c: true }, d: true }, { a: true, b: true })).toEqual({ a: true, b: true, d: true })
	})
	it("deeper nesting", () => {
		expect(flagly.merge({ a: true }, { a: { b: true } })).toEqual({ a: true })
		expect(flagly.merge({ a: { b: true } }, { a: true })).toEqual({ a: true })
	})
})
