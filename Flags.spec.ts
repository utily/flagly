import { flagly } from "./index"

describe("flagly.Flags", () => {
	it.each([
		{ value: {}, expected: true },
		{ value: { user: true }, expected: true },
		{ value: { user: { read: true } }, expected: true },
		{ value: { id: { user: { read: true, write: false } } }, expected: true },
		{ value: { user: undefined }, expected: true },
		{ value: { user: {} }, expected: true },
		{ value: { user: 123 }, expected: false },
		{ value: { user: { read: "123" } }, expected: false },
		{ value: { user: null }, expected: false }
	])("is $expected", ({ value, expected }) => expect(flagly.Flags.is(value as never)).toEqual(expected))
})
