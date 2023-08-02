import { flagly } from "./index"

describe("flagly.remove", () => {
	it("no flag", () => {
		expect(flagly.remove({ user: true }, ...[])).toEqual({ user: true })
		expect(flagly.remove({ user: { view: true } }, ...[])).toEqual({ user: { view: true } })
	})
})
