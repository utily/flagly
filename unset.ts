import { Flags } from "./Flags"

export const unset = Object.assign(unsetFlags, { path: unsetPaths })
function unsetFlags(flags: Readonly<Flags>, ...flag: string[]): Flags {
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
function unsetPaths(flags: Readonly<Flags>, ...paths: string[]): Flags {
	return paths.reduce((result, path) => unset(result, ...path.split(".")), flags)
}
