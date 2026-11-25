import { flagly } from "./index"

describe("flagly.has", () => {
	it.each([
		{ flags: {}, test: { test: true }, expected: false },
		{ flags: { p: true, q: false, single: true }, test: { single: true }, expected: true },
		{ flags: { p: true, q: false, single: false }, test: { single: false }, expected: true },
		{ flags: { single: { a: true }, p: true, q: false }, test: { single: true }, expected: false },
		{ flags: { a: { b: true } }, test: { a: { b: { c: true } } }, expected: true },
		{ flags: { a: { b: { c: true } } }, test: { a: { b: true } }, expected: false },
		{ flags: { a: { b: { c: true } } }, test: { a: { b: false } }, expected: false },
		{ flags: { a: { b: true } }, test: { a: true }, expected: false },
		{ flags: { a: true }, test: { a: { b: true } }, expected: true },
	])("has $expected", ({ flags, test, expected }) => expect(flagly.has(flags, test)).toEqual(expected))
})
