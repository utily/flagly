import { flagly } from "./index"

describe("flagly.get", () => {
	it("true", () => expect(flagly.get({ simple: true }, "simple")).toEqual(true))
	it("object", () => expect(flagly.get({ simple: {} }, "simple")).toEqual({}))
	it("not set", () => expect(flagly.get({}, "simple")).toEqual(undefined))
	it("false", () => expect(flagly.get({ simple: false }, "simple")).toEqual(false))
	it("undefined", () => expect(flagly.get(undefined, "simple")).toEqual(undefined))
	it("nested", () => {
		expect(flagly.get({ a: true }, "a", "b")).toEqual(true)
		expect(flagly.get({ a: true, b: { c: true } }, "b", "d")).toEqual(undefined)
		expect(flagly.get({ a: true, b: { c: true } }, "b", "c", "d")).toEqual(true)
	})
})
