
export function rgba(red, green, blue, alpha) {
    const rCode = Math.round(255 * red);
    const gCode = Math.round(255 * green);
    const bCode = Math.round(255 * blue);

    return "rgba(" + rCode + ", " + gCode + ", " + bCode + ", " + alpha + ")"
}