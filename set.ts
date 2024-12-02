import { Flags } from "./Flags"
export const set = Object.assign(setFlags, { path: setPaths })
function setFlags(flags: Readonly<Flags>, ...flag: string[]): Flags {
	const key = flag.at(0)
	const next = key == undefined ? undefined : flags[key]
	return key && flag.length > 1
		? { ...flags, [key]: set(typeof next == "object" ? next : {}, ...flag.slice(1)) }
		: key && !next
		? { ...flags, [key]: true }
		: { ...flags }
}
function setPaths(flags: Readonly<Flags>, ...paths: string[]) {
	return paths.reduce((result, path) => set(result, ...path.split(".")), flags)
}
