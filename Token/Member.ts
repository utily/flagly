import { isly } from "isly"

export interface Member {
	type: "member"
}
export namespace Member {
	export const type = isly.object({ type: isly.string("value", "member") })
	export const { is, flawed } = type.bind()
}
