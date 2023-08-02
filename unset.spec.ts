import { flagly } from "./index"

describe("flagly.unset", () => {
	it("no flag", () => expect(flagly.unset({ user: true }, ...[])).toEqual({ user: true }))
})
