import { Flags } from "./Flags"
export const set = Object.assign(setFlags, { path: setPaths })
function setFlags(flags: Readonly<Flags>, ...flag: string[]): Flags {
	const next = flags[flag[0]]
	const result = { ...flags }
	if (flag.length > 1)
		result[flag[0]] = set(typeof next == "object" ? next : {}, ...flag.slice(1))
	else if (!next)
		result[flag[0]] = true
	return result
}
function setPaths(flags: Readonly<Flags>, ...paths: string[]) {
	return paths.reduce((result, path) => set(result, ...path.split(".")), flags)
}
