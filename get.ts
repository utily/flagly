import { Flags } from "./Flags"

export const get = Object.assign(getFlags, { path: getPaths })
function getFlags(flags?: Readonly<Flags>, ...flag: string[]): Flags | boolean | undefined {
	const next = flags?.[flag[0]]
	return flag.length == 1 ? next : typeof next == "object" ? get(next, ...flag.slice(1)) : undefined
}
function getPaths(flags: Readonly<Flags>, ...paths: string[]) {
	return !!paths.find(path => get(flags, ...path.split(".")) == true)
}
