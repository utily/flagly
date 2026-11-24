import { isly } from "isly"
import { End as _End } from "./End"
import { Identifier as _Identifier } from "./Identifier"
import { Negator as _Negator } from "./Negator"
import { Separator as _Separator } from "./Separator"
import { Start as _Start } from "./Start"

export type Token = Token.End | Token.Identifier | Token.Negator | Token.Separator | Token.Start

export namespace Token {
	export const { type, is, flawed } = isly
		.union<Token>(End.type, Identifier.type, Negator.type, Separator.type, Start.type)
		.bind()
	export function* tokenize(input: string): Generator<Token> {
		let current: Token | undefined = undefined
		for (const character of input) {
			// Implementation of tokenization logic for each character goes here
		}
		if (current) yield current
	}
	export import Identifier = _Identifier
	export import Negator = _Negator
	export import Separator = _Separator
	export import Start = _Start
	export import End = _End
}
