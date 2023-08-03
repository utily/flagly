import { Flags } from "./Flags"

export function get(flags?: Readonly<Flags>, ...flag: string[]): Flags | boolean | undefined {
	const key = flag.at(0)
	const next = key == undefined ? undefined : flags?.[key]
	return flag.length == 1 ? next : typeof next == "object" ? get(next, ...flag.slice(1)) : undefined
}
