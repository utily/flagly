import { flagly } from "./index"

describe("flagly.set", () => {
	it("no flag", () => expect(flagly.set({ user: true }, ...[])).toEqual({ user: true }))
})
