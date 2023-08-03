import { Flags } from "./Flags"

export function unset(flags: Readonly<Flags>, ...flag: string[]): Flags {
	let result: Flags
	const key = flag.at(0)
	const next = key == undefined ? undefined : flags[key]
	if (!key)
		result = { ...flags }
	else if (flag.length > 1)
		result = { ...flags, [key]: unset(typeof next == "object" ? next : {}, ...flag.slice(1)) }
	else
		result = { ...flags, [key]: false }
	return result
}
