import { flagly } from "./index"

describe("flagly.unset", () => {
	it("no flag", () => {
		expect(flagly.unset({ user: true }, ...[])).toEqual({ user: true })
		expect(flagly.unset({ user: { view: true } }, ...[])).toEqual({ user: { view: true } })
	})
})
