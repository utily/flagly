import { Flags } from "./Flags"
import { set } from "./set"
import { Token } from "./Token"
import { unset } from "./unset"

export function parse(flags: string | Iterator<Token>, result: Flags = {}): Flags {
	const iterator = typeof flags == "string" ? Token.tokenize(flags) : flags
	const buffer: Token[] = []
	return parseTokens(
		{
			next: () => (buffer.length ? { done: false, value: buffer.pop()! } : iterator.next()),
			unread: token => {
				buffer.push(token)
			},
		},
		result
	).result
}

type Reader = { next: () => IteratorResult<Token>; unread: (token: Token) => void }

function parseTokens(reader: Reader, result: Flags, prefix: string[] = [], state = true): { result: Flags } {
	let negated = false
	while (true) {
		const current = reader.next()
		if (current.done || current.value.type == "end") return { result }
		switch (current.value.type) {
			case "negator":
				negated = true
				break
			case "identifier": {
				const path = [current.value.name]
				while (true) {
					const next = reader.next()
					if (next.done) {
						return { result: apply(result, [...prefix, ...path], state && !negated) }
					} else if (next.value.type == "member") {
						const member = reader.next()
						if (member.done || member.value.type != "identifier")
							return { result: apply(result, [...prefix, ...path], state && !negated) }
						path.push(member.value.name)
					} else if (next.value.type == "start") {
						result = parseTokens(reader, result, [...prefix, ...path], state && !negated).result
						negated = false
						break
					} else {
						reader.unread(next.value)
						result = apply(result, [...prefix, ...path], state && !negated)
						negated = false
						break
					}
				}
				break
			}
		}
	}
}

function apply(result: Flags, path: string[], state: boolean): Flags {
	return state ? set(result, ...path) : unset(result, ...path)
}
