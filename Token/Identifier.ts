import { isly } from "isly"

export interface Identifier {
	type: "identifier"
	name: string
}
export namespace Identifier {
	export const type = isly.object({ type: isly.string("value", "identifier"), name: isly.string() })
	export const { is, flawed } = type.bind()
}
