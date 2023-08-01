import { flagly } from "./index"
describe("set", () => {
	it("temp", () => {
		const flags: flagly.Flags = { user: { view: true } }
		console.log("set", flagly.set(flags, "org", "edit"))
		console.log("set paths", flagly.set.path(flags, "org.edit", "user.write"))
	})
})
