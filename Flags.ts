import { isly } from "isly"

export type Flags = { [flag: string]: Flags | boolean | undefined }

export namespace Flags {
	const type: isly.Record<Flags> = isly.record<Flags>(
		isly.string(),
		isly.union(
			isly.lazy<Flags>(() => type, "flagly.Flags"),
			isly.boolean(),
			isly.undefined()
		)
	)
	export const { is, flawed } = type.bind()
}
