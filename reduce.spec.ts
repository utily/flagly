import { flagly } from "./index"

describe("flagly.reduce", () => {
	it.each([
		{ left: {}, right: {}, expected: {} },
		{ left: { p: true, q: false }, right: { single: true }, expected: { p: true, q: false, single: true } },
		{ left: { p: true, q: false }, right: { single: false }, expected: { p: true, q: false, single: false } },
		{
			left: { single: true, p: true, q: false },
			right: { single: false },
			expected: { p: true, q: false, single: false }
		},
		{
			left: { single: { a: true }, p: true, q: false },
			right: { single: false },
			expected: { p: true, q: false, single: false }
		},
		{ left: { a: { b: false } }, right: { a: { b: { c: true } } }, expected: { a: { b: { c: true } } } },
		{ left: { a: { b: true } }, right: { a: { b: { c: true } } }, expected: { a: { b: { c: true } } } },
		{ left: { a: { b: { c: true } } }, right: { a: { b: false } }, expected: { a: { b: false } } },
		{ left: { a: { b: true } }, right: { a: true }, expected: { a: true } },
		{ left: { a: true }, right: { a: { b: true } }, expected: { a: { b: true } } },
		{ left: { a: { b: true } }, right: { a: { c: false } }, expected: { a: { b: true, c: false } } },
		{ left: { a: { b: true } }, right: { a: undefined }, expected: { a: undefined } },
		{ left: { a: false }, right: { a: undefined }, expected: { a: false } },
		{ left: { a: { b: true } }, right: { a: false }, expected: { a: false } }
	])("reduces case $#", ({ left, right, expected }) => expect(flagly.reduce(left, right)).toEqual(expected))
})
