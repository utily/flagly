import { flagly } from "./index"

describe("flagly.flatten", () => {
	it("ignores unsupported values", () => {
		expect(flagly.flatten({ valid: true, nested: { read: false }, invalid: 123 } as never)).toEqual([
			[["valid"], true],
			[["nested", "read"], false],
		])
	})
})
