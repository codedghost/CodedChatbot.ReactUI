export function IsNullOrWhiteSpace(str: string) {
    console.log("isnull: " + str);
    return str === null || str === undefined || str.match(/^ *$/) !== null;
}
