import { Flags } from "./Flags"
import { set } from "./set"
import { unset } from "./unset"

export function parse(flags: string, standard: Flags = {}): Flags {
	const tokens = tokenize(flags)
	return tokens.reduce((result, token) => (token[0] ? set(result, ...token[1]) : unset(result, ...token[1])), standard)
}
function tokenize(flags: string): [boolean, string[]][] {
	return flags
		.split(" ")
		.filter(flag => flag)
		.map(flag => {
			let state: boolean | undefined =
				!flag.startsWith("-") && !flag.startsWith("!") && (flag.startsWith("+") || undefined)
			if (state != undefined)
				flag = flag.substring(1)
			else
				state = true
			return [state, flag.split(".")]
		})
}
