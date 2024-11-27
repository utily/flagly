import { flagly } from "./index"

describe("flagly.has", () => {
	it("empty < test", () => {
		expect(flagly.has({}, { test: true })).toEqual(false)
	})
	it("single > single", () => {
		expect(flagly.has({ p: true, q: false, single: true }, { single: true })).toEqual(true)
	})
	it("!single > !single", () => {
		expect(flagly.has({ p: true, q: false, single: false }, { single: false })).toEqual(true)
	})
	it("single.a < single", () => {
		expect(flagly.has({ single: { a: true }, p: true, q: false }, { single: true })).toEqual(false)
	})
	it("a.b > a.b.c", () => {
		expect(flagly.has({ a: { b: true } }, { a: { b: { c: true } } })).toEqual(true)
	})
	it("a.b.c < a.b", () => {
		expect(flagly.has({ a: { b: { c: true } } }, { a: { b: true } })).toEqual(false)
	})
	it("a.b.c < !a.b", () => {
		expect(flagly.has({ a: { b: { c: true } } }, { a: { b: false } })).toEqual(false)
	})
	it("a.b < a", () => {
		expect(flagly.has({ a: { b: true } }, { a: true })).toEqual(false)
	})
	it("a > a.b", () => {
		expect(flagly.has({ a: true }, { a: { b: true } })).toEqual(true)
	})
})
