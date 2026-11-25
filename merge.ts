import { Flags } from "./Flags"
export function merge(...flags: Flags[]): Flags {
	return flags.reduce<Flags>(
		(result, flag) =>
			Object.entries(flag).reduce((result, [flag, value]) => {
				const old = result[flag]
				return {
					...result,
					[flag]:
						value == true || old == true
							? true
							: typeof old != "object"
								? value == undefined
									? old
									: value
								: typeof value != "object"
									? value
									: merge(old, value)
				}
			}, result),
		{}
	)
}
