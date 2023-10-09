import { Flags } from "./Flags"

export const get = Object.assign(getFlags, { path: getPaths })
function getFlags(flags?: Readonly<Flags>, ...flag: string[]): Flags | boolean | undefined {
	const key = flag.at(0)
	const next = key == undefined ? undefined : flags?.[key]
	return next == true
		? true
		: flag.length == 1
		? next
		: typeof next == "object"
		? get(next, ...flag.slice(1))
		: undefined
}
function getPaths(flags: Readonly<Flags>, ...paths: string[]): boolean {
	return !!paths.every(path => get(flags, ...path.split(".")) == true)
}
