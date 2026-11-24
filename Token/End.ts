import { isly } from "isly"

export interface End {
	type: "end"
}
export namespace End {
	export const { type, is, flawed } = isly.object({ type: isly.string("value", "end") }).bind()
}
