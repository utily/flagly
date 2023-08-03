import { flagly } from "./index"

describe("flagly.get", () => {
	it("true", () => expect(flagly.get({ simple: true }, "simple")).toEqual(true))
	it("object", () => expect(flagly.get({ simple: {} }, "simple")).toEqual({}))
	it("not set", () => expect(flagly.get({}, "simple")).toEqual(undefined))
	it("false", () => expect(flagly.get({ simple: false }, "simple")).toEqual(false))
	it("undefined", () => expect(flagly.get(undefined, "simple")).toEqual(undefined))
	it("no flag", () => expect(flagly.get({ simple: true }, ...[])).toEqual(undefined))
	it("undefined flag", () => expect(flagly.get({ undefined: true }, ...[])).toEqual(undefined))
})
