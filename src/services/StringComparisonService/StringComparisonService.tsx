export function Equals(a: string, b: string, insensitive: boolean = true) {
    if (a == b) return true;

    if (a == null || b == null) return false;
    
    return a.localeCompare(b, undefined, { sensitivity: insensitive ? 'accent' : '' })
}