# flagly

A TypeScript library for parsing, managing, and manipulating hierarchical feature and permission flags.

## Overview

**flagly** provides a type-safe API for working with nested flag structures. It supports:

- **Parsing string representations** of flags (e.g., `"admin.users.create -admin.users.delete"`)
- **Type-safe flag objects** with recursive structure definitions
- **Hierarchical flags** with nested properties (e.g., `admin.users.create`)
- **Merging and manipulation** with built-in utility functions
- **Validation** via isly type checking

## Installation

```bash
npm install flagly
```

## Usage

### Basic Concepts

Flags are represented as nested objects where each key maps to either:

- `true` (flag is enabled)
- `false` or `undefined` (flag is disabled)
- A nested object (hierarchical flags)

```typescript
import { flagly } from "flagly"

// Define flag structure
const flags: flagly.Flags = { admin: { users: { create: true, delete: false }, settings: true } }
```

### Core APIs

#### `parse(flags: string, standard?: Flags): Flags`

Parse a string representation into a flags object. Use space-separated tokens where:

- Tokens without prefix enable flags
- Tokens starting with `-` disable flags
- Dot notation represents nested paths

```typescript
// Enable flags
flagly.parse("admin.users.create admin.settings")
// Result: { admin: { users: { create: true }, settings: true } }

// Mix enable/disable with standard base
flagly.parse("-admin.users.delete", { admin: { users: { delete: true } } })
// Result: { admin: { users: { delete: false } } }
```

#### `stringify(flags: Flags): string`

Convert a flags object back to string representation.

```typescript
flagly.stringify({ admin: { users: { create: true }, delete: false } })
// Result: "admin.users.create -admin.delete"
```

#### `get(flags?: Flags, ...path: string[]): Flags | boolean | undefined`

Retrieve a flag value by path. Returns nested object, `true`, `false`, `undefined`, or the entire flags object.

```typescript
const flags = { admin: { users: { create: true } } }

flagly.get(flags, "admin", "users", "create") // true
flagly.get(flags, "admin", "users") // { create: true }
flagly.get(flags, "admin") // { users: { create: true } }
flagly.get(flags, "nonexistent") // undefined
```

**`get.path(flags: Flags, ...paths: string[]): boolean`**

Check if all given dot-notation paths are explicitly set to `true`.

```typescript
flagly.get.path(flags, "admin.users.create") // true
flagly.get.path(flags, "admin.users.create", "admin") // true (both are true)
flagly.get.path(flags, "admin.users.delete") // false
```

#### `set(flags: Flags, ...path: string[]): Flags`

Enable a flag at the given path. Creates intermediate objects as needed. Returns a new flags object (non-mutating).

```typescript
flagly.set({}, "admin", "users", "create")
// Result: { admin: { users: { create: true } } }

flagly.set(flags, "admin", "settings")
// Existing structure is preserved
```

**`set.path(flags: Flags, ...paths: string[]): Flags`**

Enable multiple dot-notation paths at once.

```typescript
flagly.set.path({}, "admin.users.create", "admin.settings")
// Result: { admin: { users: { create: true }, settings: true } }
```

#### `has(flags?: Flags, ...path: string[]): boolean`

Check if a flag is explicitly set to `true`.

```typescript
flagly.has(flags, "admin", "users", "create") // true
flagly.has(flags, "admin", "users", "delete") // false
flagly.has(undefined, "admin") // false
```

#### `unset(flags: Flags, ...path: string[]): Flags`

Disable a flag (set to `false`). Returns a new flags object (non-mutating).

```typescript
flagly.unset({ admin: { users: { create: true } } }, "admin", "users", "create")
// Result: { admin: { users: { create: false } } }
```

**`unset.path(flags: Flags, ...paths: string[]): Flags`**

Disable multiple dot-notation paths at once.

```typescript
flagly.unset.path({ admin: { users: { create: true } } }, "admin.users.create")
// Result: { admin: { users: { create: false } } }
```

#### `remove(flags: Flags, ...path: string[]): Flags`

Remove a flag entry entirely from the object. Returns a new flags object (non-mutating).

```typescript
flagly.remove({ admin: { users: { create: true } } }, "admin", "users", "create")
// Result: { admin: { users: {} } }
```

**`remove.path(flags: Flags, ...paths: string[]): Flags`**

Remove multiple dot-notation paths at once.

```typescript
flagly.remove.path({ admin: { users: { create: true, delete: false } } }, "admin.users.create", "admin.users.delete")
// Result: { admin: {} }
```

#### `reduce(...flags: Flags[]): Flags`

Merge and reduce multiple flag objects with specific precedence rules:

- `true` always takes precedence (once a flag is `true`, it stays `true`)
- Explicit `false` overrides nested objects
- Objects merge recursively, but explicit `false` or `true` at a level prevents deeper nesting
- Last value wins for non-object, non-boolean conflicts when neither is previously `true`

This is useful for accumulating flags where explicit disabling should override nested structures.

```typescript
flagly.reduce({ admin: { users: { create: true } } }, { admin: { users: { delete: false } } })
// Result: { admin: { users: { create: true, delete: false } } }

flagly.reduce({ admin: true }, { admin: { users: { create: true } } })
// Result: { admin: true } (explicit true takes precedence)

flagly.reduce({ a: { b: true } }, { a: false })
// Result: { a: false } (explicit false overrides nested structure)
```

#### `flatten(flags: Flags): [string[], boolean][]`

Convert a nested flags structure into a flat array of `[path, value]` tuples, where paths are arrays of strings.

```typescript
flagly.flatten({ admin: { users: { create: true }, delete: false } })
// Result: [
//   [["admin", "users", "create"], true],
//   [["admin", "users", "delete"], false]
// ]
```

#### `merge(...flags: Flags[]): Flags`

Merge multiple flag objects with the following rules:

- If any flag is `true`, the result is `true`
- For nested objects, recursively merge
- `true` overrides any other value
- Last value wins for non-object, non-boolean conflicts

```typescript
flagly.merge({ admin: true }, { admin: { users: { create: true } } })
// Result: { admin: true }

flagly.merge({ admin: { users: { create: true } } }, { admin: { users: { delete: false } } })
// Result: { admin: { users: { create: true, delete: false } } }
```

### Type Validation

The `Flags` namespace provides validation utilities:

```typescript
// Check if a value is valid flags structure
flagly.Flags.is({ admin: { users: { create: true } } }) // true
flagly.Flags.is("invalid") // false

// Get validation details if invalid
const errors = flagly.Flags.flawed({ admin: { users: { create: true } } })
// errors is null if valid, or describes the validation failure
```

## Examples

### Feature Flag System

```typescript
import { flagly } from "flagly"

// Initialize with default permissions
const userFlags = flagly.parse("user.read user.list", {})

// Grant additional permissions
let flags = flagly.set.path(userFlags, "admin.users.create")

// Parse permission string from API
const apiPerms = flagly.parse("admin.settings admin.audit")
flags = flagly.merge(flags, apiPerms)

// Check specific permission
if (flagly.get.path(flags, "admin.users.create")) {
	console.log("Can create users")
}

// Revoke permission
flags = flagly.unset(flags, "admin", "settings")
```

### Configuration Flags

```typescript
// Parse feature flags from environment variable
const features = flagly.parse(process.env.FEATURES || "")

// Check if feature is enabled
if (flagly.has(features, "beta", "newUI")) {
	// Render new UI
}

// Convert to string for storage/transmission
const flagsString = flagly.stringify(features)
```

## API Reference

| Function       | Signature                                                             | Description                            |
| -------------- | --------------------------------------------------------------------- | -------------------------------------- |
| `parse`        | `(flags: string, standard?: Flags) => Flags`                          | Parse space-separated flag string      |
| `stringify`    | `(flags: Flags) => string`                                            | Convert flags to string representation |
| `get`          | `(flags?: Flags, ...path: string[]) => Flags \| boolean \| undefined` | Get flag value by path                 |
| `get.path`     | `(flags: Flags, ...paths: string[]) => boolean`                       | Check if paths are all true            |
| `set`          | `(flags: Flags, ...path: string[]) => Flags`                          | Enable flag at path                    |
| `set.path`     | `(flags: Flags, ...paths: string[]) => Flags`                         | Enable multiple paths                  |
| `has`          | `(flags?: Flags, ...path: string[]) => boolean`                       | Check if flag is true                  |
| `unset`        | `(flags: Flags, ...path: string[]) => Flags`                          | Disable flag (set to false)            |
| `unset.path`   | `(flags: Flags, ...paths: string[]) => Flags`                         | Disable multiple paths                 |
| `remove`       | `(flags: Flags, ...path: string[]) => Flags`                          | Remove flag entry                      |
| `remove.path`  | `(flags: Flags, ...paths: string[]) => Flags`                         | Remove multiple paths                  |
| `flatten`      | `(flags: Flags) => [string[], boolean][]`                             | Flatten to path-value tuples           |
| `merge`        | `(...flags: Flags[]) => Flags`                                        | Merge multiple flag objects            |
| `reduce`       | `(...flags: Flags[]) => Flags`                                        | Reduce with specific precedence rules  |
| `Flags.is`     | `(value: any) => boolean`                                             | Validate if value is Flags type        |
| `Flags.flawed` | `(value: any) => null \| object`                                      | Get validation errors                  |

## Immutability

All functions that modify flags (`set`, `unset`, `remove`, `merge`) return new objects without mutating the original. This makes it safe to use with state management and functional programming patterns.

## Release Process

Versioning and npm publishing details are documented in [RELEASING.md](./RELEASING.md).

## License

MIT

