export type Flags = {
	[flag: string]: Flags | boolean | undefined
}

export namespace Flags {
	export function is(value: Flags | any): value is Flags {
		return typeof value == "object" && Object.values(value).every(v => typeof v == "boolean" || v == undefined || is(v))
	}

	export function stringify(value: Flags): string {
		return Object.entries(getBaseKey(value))
			.reduce<string>((r, c) => r + (c[1] ? "+" : "-") + c[0] + " ", "")
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
