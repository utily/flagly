import { Flags } from "./Flags"

export function get(flags?: Readonly<Flags>, ...flag: string[]): Flags | boolean | undefined {
	const next = flags?.[flag[0]]
	return flag.length == 1 ? next : typeof next == "object" ? get(next, ...flag.slice(1)) : undefined
}
