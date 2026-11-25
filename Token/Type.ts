import { isly } from "isly"

export type Type = (typeof Type.values)[number]

export namespace Type {
	export const values = ["start", "end", "member", "negator", "identifier"] as const
	export const { type, is, flawed } = isly.string("value", ...values).bind()
}
