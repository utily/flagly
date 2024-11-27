import { Flags } from "./Flags"
import { flatten } from "./flatten"

export function stringify(flags: Flags): string {
	return flatten(flags)
		.map(([path, value]) => (!value ? "-" : path[0].startsWith("-") ? "+" : "") + path.join("."))
		.join(" ")
}
