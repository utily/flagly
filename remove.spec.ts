import { flagly } from "./index"

describe("flagly.remove", () => {
	it("no flag", () => expect(flagly.remove({ user: true }, ...[])).toEqual({ user: true }))
})
