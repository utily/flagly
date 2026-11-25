import { isly } from "isly"

export interface Negator {
	type: "negator"
}
export namespace Negator {
	export const type = isly.object({ type: isly.string("value", "negator") })
	export const { is, flawed } = type.bind()
}
