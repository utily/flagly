import { isly } from "isly"
import { End as _End } from "./End"
import { Identifier as _Identifier } from "./Identifier"
import { Member as _Member } from "./Member"
import { Negator as _Negator } from "./Negator"
import { Start as _Start } from "./Start"

export type Token = Token.End | Token.Identifier | Token.Member | Token.Negator | Token.Start

export namespace Token {
	export const type = isly.union<Token>(_End.type, _Identifier.type, _Member.type, _Negator.type, _Start.type)
	export const { is, flawed } = type.bind()
	export function* tokenize(input: Iterable<string>): Generator<Token> {
		let accumulator = ""
		for (const block of input)
			for (const character of block) {
				if (
					("a" <= character && character <= "z")
					|| ("A" <= character && character <= "Z")
					|| character == "_"
					|| ("0" <= character && character <= "9" && accumulator.length > 0)
				)
					accumulator += character
				else {
					if (accumulator) {
						yield { type: "identifier", name: accumulator }
						accumulator = ""
					}
					switch (character) {
						case ".":
							yield { type: "member" }
							break
						case "-":
							yield { type: "negator" }
							break
						case "(":
							yield { type: "start" }
							break
						case ")":
							yield { type: "end" }
					}
				}
			}
		if (accumulator) yield { type: "identifier", name: accumulator }
	}
	export import Identifier = _Identifier
	export import Negator = _Negator
	export import Member = _Member
	export import Start = _Start
	export import End = _End
}
