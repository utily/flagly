import { isly } from "isly"

export type Flags = {
	[flag: string]: Flags | boolean | undefined
}

export namespace Flags {
	export const type: isly.Type<Flags> = isly.record<Flags>(
		isly.string(),
		isly.union(
			isly.lazy(() => type),
			isly.boolean(),
			isly.undefined()
		)
	)
	export const is = type.is
	export const flaw = type.flaw
}
