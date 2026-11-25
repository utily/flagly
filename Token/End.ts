import { isly } from "isly"

export interface End {
	type: "end"
}
export namespace End {
	export const type = isly.object({ type: isly.string("value", "end") })
	export const { is, flawed } = type.bind()
}
