import * as flagly from "./index"

describe("flagly.set", () => {
	it("no flag", () => {
		expect(flagly.set({ user: true }, ...[])).toEqual({ user: true })
		expect(flagly.set({ user: { view: true } }, ...[])).toEqual({ user: { view: true } })
	})
})
