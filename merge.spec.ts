import { flagly } from "./index"

describe("merge", () => {
	it.each([
		{ left: { a: true }, right: { a: { b: true } }, expected: { a: true } },
		{ left: { a: { b: true } }, right: { a: true }, expected: { a: true } },
		{ left: { a: false }, right: { a: true }, expected: { a: true } },
		{ left: { a: true }, right: { a: false }, expected: { a: true } },
		{
			left: { a: true, b: true },
			right: { a: { c: true }, d: true },
			expected: { a: true, b: true, d: true },
		},
		{
			left: { a: { c: true }, d: true },
			right: { a: true, b: true },
			expected: { a: true, b: true, d: true },
		},
		{
			left: { a: { b: true } },
			right: { a: { c: false } },
			expected: { a: { b: true, c: false } },
		},
		{ left: { a: { b: true } }, right: { a: undefined }, expected: { a: undefined } },
		{ left: { a: false }, right: { a: { b: true } }, expected: { a: { b: true } } },
		{ left: { a: false }, right: { a: undefined }, expected: { a: false } },
		{ left: { a: { b: true } }, right: { a: false }, expected: { a: false } },
	])("case $#", ({ left, right, expected }) => expect(flagly.merge(left, right)).toEqual(expected))
})
