import { Flags } from "./Flags"

export const unset = Object.assign(unsetFlags, { path: unsetPaths })
function unsetFlags(flags: Readonly<Flags>, ...flag: string[]): Flags {
	const next = flags[flag[0]]
	const result = { ...flags }
	result[flag[0]] = flag.length > 1 ? unset(typeof next == "object" ? next : {}, ...flag.slice(1)) : false
	return result
}
function unsetPaths(flags: Readonly<Flags>, ...paths: string[]): Flags {
	return paths.reduce((result, path) => unset(result, ...path.split(".")), flags)
}
