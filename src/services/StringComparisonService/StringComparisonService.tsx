export function Equals(a: string, b: string, insensitive: boolean = true) {
    return a.localeCompare(b, undefined, { sensitivity: insensitive ? 'accent' : '' })
}