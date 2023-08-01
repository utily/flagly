import { Flags } from "./Flags"

export const remove = Object.assign(removeFlags, { path: removePaths })
function removeFlags(flags: Readonly<Flags>, ...flag: string[]): Flags {
	const next = flags[flag[0]]
	if (flag.length == 1) {
		return (({ [flag[0]]: _, ...result }) => result)(flags)
	} else {
		const result = remove(typeof next == "object" ? next : {}, ...flag.slice(1))
		if (!Object.keys(result).length)
			return (({ [flag[0]]: _, ...result }) => result)(flags)
		return { ...flags, [flag[0]]: result }
	}
}
function removePaths(flags: Readonly<Flags>, ...paths: string[]): Flags {
	return paths.reduce((result, path) => remove(result, ...path.split(".")), flags)
}
