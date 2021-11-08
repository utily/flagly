import { Flags } from "./Flags"
import * as flagly from "./index"

describe("flagly", () => {
	it("stringify", () => {
		const testString = "a.b.c a.b.d e.s -test"
		const flags = flagly.parse(testString)
		expect(flagly.Flags.stringify(flags)).toEqual(testString)
	})
	it("Flags features test", () => {
		const features: Flags = {
			balance: true,
			account: {
				balance: false,
				subscription: true,
			},
		}
		const featureLess: Flags = {
			other: false,
			nested: { sure: true, really: false },
		}
		expect(isEnabled(features, "balance", true)).toBeTruthy()
		expect(isEnabled(features, "balance", false)).toBeTruthy()
		expect(isEnabled(featureLess, "balance", true)).toBeTruthy()
		expect(isEnabled(featureLess, "balance", false)).toBeUndefined()
		expect(isEnabled(features, "account.balance", true)).toBeUndefined()
		expect(isEnabled(features, "account.balance", false)).toBeUndefined()
		expect(isEnabled(featureLess, "account.balance", true)).toBeTruthy()
		expect(isEnabled(featureLess, "account.balance", false)).toBeUndefined()
		expect(isEnabled(features, "subscription", true)).toBeTruthy()
		expect(isEnabled(features, "subscription", false)).toBeUndefined()
		expect(isEnabled(featureLess, "subscription", true)).toBeTruthy()
		expect(isEnabled(featureLess, "subscription", false)).toBeUndefined()
		expect(isEnabled(features, "account.subscription", true)).toBeTruthy()
		expect(isEnabled(features, "account.subscription", false)).toBeTruthy()
		expect(isEnabled(featureLess, "account.subscription", true)).toBeTruthy()
		expect(isEnabled(featureLess, "account.subscription", false)).toBeUndefined()
	})
	function isEnabled(features: Flags, flag: string, showByDefault: boolean): string | undefined {
		return checkAccess(features, flag, showByDefault)
		let result: string | undefined
		if (flag.includes(".")) {
			const flags = flag.split(".")
			result = isEnabled(features[flags[0]] as Flags, flags[1], showByDefault)
		} else
			result = (features != undefined && typeof features[flag] == "boolean" ? features[flag] : showByDefault)
				? flag
				: undefined
		return result
	}
	function checkAccess(features: Flags, flag: string, showByDefault: boolean): string | undefined {
		return flag.match(/\w+\.\w+/)
			? checkAccess(features[flag.split(".")[0]] as Flags, flag.split(".")[1], showByDefault)
			: (features != undefined && typeof features[flag] == "boolean" ? features[flag] : showByDefault)
			? flag
			: undefined
	}
})
