import { Flags } from "./Flags"
export function reduce(...flags: Flags[]): Flags {
	return flags.reduce<Flags>(
		(result, flag) =>
			Object.entries(flag).reduce((result, [flag, value]) => {
				const old = result[flag]
				return {
					...result,
					[flag]:
						value == true
							? true
							: typeof old != "object"
								? value == undefined
									? old
									: value
								: typeof value != "object"
									? value
									: reduce(old, value)
				}
			}, result),
		{}
	)
}
