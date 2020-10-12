export type Flags = {
	[flag: string]: Flags | boolean | undefined
}

export namespace Flags {
	export function is(value: Flags | any): value is Flags {
		return typeof value == "object" && Object.values(value).every(v => typeof v == "boolean" || v == undefined || is(v))
	}
}
