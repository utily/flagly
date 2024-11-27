import { Flags } from "./Flags"

export function flatten(flags: Flags): [string[], boolean][] {
	const result: [string[], boolean][] = []
	for (const [key, value] of Object.entries(flags))
		if (Flags.is(value))
			result.push(...flatten(value).map<[string[], boolean]>(([path, value]) => [[key, ...path], value]))
		else if (typeof value == "boolean")
			result.push([[key], value])
	return result
}
