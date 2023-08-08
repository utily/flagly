import { isly } from "isly"
export type Flags = {
	[flag: string]: Flags | boolean | undefined
}

export namespace Flags {
	export const type: isly.Type<Flags> = isly.record<Flags>(
		isly.string(),
		isly.union(
			isly.lazy(() => type),
			isly.boolean(),
			isly.undefined()
		)
	)
	export const is = type.is
	export const flaw = type.flaw

	export function stringify(value: Flags): string {
		return Object.entries(getBaseKey(value))
			.reduce<string>((r, [name, value]) => r + (!value ? "-" : name.startsWith("-") ? "+" : "") + name + " ", "")
			.trim()
	}
}

function getBaseKey(value: Flags): Record<string, boolean> {
	const result: Record<string, boolean> = {}
	for (const key of Object.keys(value)) {
		if (Flags.is(value[key]))
			Object.entries(getBaseKey(value[key] as Flags)).forEach(entry => (result[key + "." + entry[0]] = entry[1]))
		else if (typeof value[key] == "boolean")
			result[key] = value[key] as boolean
	}
	return result
}
