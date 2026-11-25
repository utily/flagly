import { flagly } from "./index"

describe("flagly.get", () => {
	it.each([
		{ flags: { simple: true }, path: ["simple"], expected: true },
		{ flags: { simple: {} }, path: ["simple"], expected: {} },
		{ flags: {}, path: ["simple"], expected: undefined },
		{ flags: { simple: false }, path: ["simple"], expected: false },
		{ flags: undefined, path: ["simple"], expected: undefined },
		{ flags: { a: true }, path: ["a", "b"], expected: true },
		{ flags: { a: true, b: { c: true } }, path: ["b", "d"], expected: undefined },
		{ flags: { a: true, b: { c: true } }, path: ["b", "c", "d"], expected: true },
		{ flags: undefined, path: [], expected: undefined },
		{ flags: { a: false }, path: ["a", "b"], expected: undefined }
	])("gets $path", ({ flags, path, expected }) => expect(flagly.get(flags, ...path)).toEqual(expected))
	it("gets primitive nested value as undefined", () => {
		expect(flagly.get({ a: "invalid" } as never, "a", "b")).toEqual(undefined)
	})
})
