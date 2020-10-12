import { Flags } from "./Flags"

export function unset(flags: Readonly<Flags>, ...flag: string[]): Flags {
	const next = flags[flag[0]]
	const result = { ...flags }
	result[flag[0]] = flag.length > 1 ? unset(typeof next == "object" ? next : {}, ...flag.slice(1)) : false
	return result
}
