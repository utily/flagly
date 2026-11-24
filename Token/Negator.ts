import { isly } from "isly"

export interface Negator {
	type: "negator"
}
export namespace Negator {
	export const { type, is, flawed } = isly.object({ type: isly.string("value", "negator") }).bind()
}
