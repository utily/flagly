import { isly } from "isly"

export interface Start {
	type: "start"
}
export namespace Start {
	export const type = isly.object({ type: isly.string("value", "start") })
	export const { is, flawed } = type.bind()
}
