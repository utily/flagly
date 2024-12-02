import { Flags as flaglyFlags } from "./Flags"
import { flatten as flaglyFlatten } from "./flatten"
import { get as flaglyGet } from "./get"
import { has as flaglyHas } from "./has"
import { merge as flaglyMerge } from "./merge"
import { parse as flaglyParse } from "./parse"
import { reduce as flaglyReduce } from "./reduce"
import { remove as flaglyRemove } from "./remove"
import { set as flaglySet } from "./set"
import { stringify as flaglyStringify } from "./stringify"
import { unset as flaglyUnset } from "./unset"

export namespace flagly {
	export import Flags = flaglyFlags
	export const flatten = flaglyFlatten
	export const get = flaglyGet
	export const has = flaglyHas
	export const merge = flaglyMerge
	export const parse = flaglyParse
	export const reduce = flaglyReduce
	export const remove = flaglyRemove
	export const set = flaglySet
	export const stringify = flaglyStringify
	export const unset = flaglyUnset
}
