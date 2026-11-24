import { isly } from "isly"

export interface Start {
	type: "start"
}
export namespace Start {
	export const { type, is, flawed } = isly.object({ type: isly.string("value", "start") }).bind()
}
