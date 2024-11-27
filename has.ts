import { Flags } from "./Flags"
import { flatten } from "./flatten"
import { get } from "./get"

export function has(flags: Flags, requirements: Flags): boolean {
	return flatten(requirements).every(([path, value]) => compare(value, get(flags, ...path)))
}
function compare(criteria: boolean, value: Flags | boolean | undefined): boolean {
	return criteria ? value == true : value == false
}
