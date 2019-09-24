import * as flagly from "./index"

describe("flagly.get", () => {
	it("true", () => expect(flagly.get({ simple: true }, "simple")).toEqual(true))
	it("object", () => expect(flagly.get({ simple: {} }, "simple")).toEqual({}))
	it("not set", () => expect(flagly.get({}, "simple")).toEqual(undefined))
	it("false", () => expect(flagly.get({ simple: false }, "simple")).toEqual(false))
})
