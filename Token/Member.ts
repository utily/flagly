import { isly } from "isly"

export interface Member {
	type: "member"
}
export namespace Member {
	export const { type, is, flawed } = isly.object({ type: isly.string("value", "member") }).bind()
}
