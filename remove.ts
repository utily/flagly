import { Flags } from "./Flags"

export const remove = Object.assign(removeFlags, { path: removePaths })
function removeFlags(flags: Readonly<Flags>, ...flag: string[]): Flags {
	let result: Flags
	const key = flag.at(0)
	const next = !key ? key : flags[key]
	if (!key)
		result = { ...flags }
	else if (flag.length > 1) {
		const filtered = remove(typeof next == "object" ? next : {}, ...flag.slice(1))
		result = !Object.keys(filtered).length
			? (({ [flag[0]]: _, ...result }) => result)(flags)
			: { ...flags, [flag[0]]: filtered }
	} else
		result = (({ [flag[0]]: _, ...result }) => result)(flags)
	return result
}
function removePaths(flags: Readonly<Flags>, ...paths: string[]): Flags {
	return paths.reduce((result, path) => remove(result, ...path.split(".")), flags)
}
