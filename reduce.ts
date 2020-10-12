import { Flags } from "./Flags"
export function reduce(...flags: Flags[]): Flags {
	return flags.reduce<Flags>(
		(r, f) =>
			Object.entries(f).reduce((result, [flag, value]) => {
				const old = result[flag]
				return {
					...result,
					[flag]: typeof old != "object" ? value : typeof value != "object" ? value && old : reduce(old, value),
				}
			}, r),
		{}
	)
}
