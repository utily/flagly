import { Flags } from "./Flags"
export const set = Object.assign(setFlags, { path: setPaths })
function setFlags(flags: Readonly<Flags>, ...flag: string[]): Flags {
	let result: Flags
	const key = flag.at(0)
	const next = key == undefined ? undefined : flags[key]
	if (!key)
		result = { ...flags }
	else if (flag.length > 1)
		result = { ...flags, [key]: set(typeof next == "object" ? next : {}, ...flag.slice(1)) }
	else if (!next)
		result = { ...flags, [key]: true }
	else
		result = { ...flags }
	return result
}
function setPaths(flags: Readonly<Flags>, ...paths: string[]) {
	return paths.reduce((result, path) => set(result, ...path.split(".")), flags)
}
