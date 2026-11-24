import { isly } from "isly"

export interface Separator {
	type: "separator"
}
export namespace Separator {
	export const { type, is, flawed } = isly.object({ type: isly.string("value", "separator") }).bind()
}
