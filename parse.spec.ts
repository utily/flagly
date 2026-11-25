import { flagly } from "./index"

describe("flagly.parse", () => {
	it.each([
		{ input: "", expected: {} },
		{ input: "single", expected: { single: true } },
		{ input: "Single", expected: { Single: true } },
		{ input: "_single", expected: { _single: true } },
		{ input: "single2", expected: { single2: true } },
		{ input: "-single", expected: { single: false } },
		{ input: "!single", expected: { single: true } },
		{ input: "+single", expected: { single: true } },
		{ input: "a.b.c", expected: { a: { b: { c: true } } } },
		{ input: "a._b.c2", expected: { a: { _b: { c2: true } } } },
		{ input: "a.b a.b.c", expected: { a: { b: { c: true } } } },
		{ input: "a.b.c -a.b", expected: { a: { b: false } } }
	])("parses $input", ({ input, expected }) => expect(flagly.parse(input)).toEqual(expected))
	it.each([
		{ input: "admin.users(create delete)", expected: { admin: { users: { create: true, delete: true } } } },
		{ input: "admin.users(create -delete)", expected: { admin: { users: { create: true, delete: false } } } },
		{ input: "-admin.users(create delete)", expected: { admin: { users: { create: false, delete: false } } } },
		{ input: "admin.users(create delete)", expected: { admin: { users: { create: true, delete: true } } } },
		{
			input: "admin.users(create) admin.settings(read)",
			expected: { admin: { users: { create: true }, settings: { read: true } } }
		}
	])("parses grouped $input", ({ input, expected }) => expect(flagly.parse(input)).toEqual(expected))
	it.each([
		{ input: "admin(users(create delete))", expected: { admin: { users: { create: true, delete: true } } } },
		{
			input: "admin(users(create delete) settings(read write))",
			expected: { admin: { users: { create: true, delete: true }, settings: { read: true, write: true } } }
		},
		{ input: "-admin(users(create delete))", expected: { admin: { users: { create: false, delete: false } } } },
		{
			input: "admin(users(create -delete) settings(read))",
			expected: { admin: { users: { create: true, delete: false }, settings: { read: true } } }
		},
		{
			input: "admin(users(perms(create delete)))",
			expected: { admin: { users: { perms: { create: true, delete: true } } } }
		},
		{ input: "admin.dashboard(read write)", expected: { admin: { dashboard: { read: true, write: true } } } },
		{ input: "admin.users(create)", expected: { admin: { users: { create: true } } } }
	])("parses nested $input", ({ input, expected }) => expect(flagly.parse(input)).toEqual(expected))
	it("handles token iterators and incomplete member paths", () => {
		expect(
			flagly.parse(
				(function* () {
					yield { type: "identifier", name: "single" } as const
				})()
			)
		).toEqual({ single: true })
		expect(flagly.parse("a.")).toEqual({ a: true })
		expect(flagly.parse("a.(")).toEqual({ a: true })
		expect(flagly.parse("-a.")).toEqual({ a: false })
	})
})
