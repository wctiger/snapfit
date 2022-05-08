const DEFAULT_DPI = 96;
const CM_PER_INCH = 2.54;

// TODO: move these things out

export function cmToPx(sizeInCm: number) {
    const actualDPI = window.devicePixelRatio * DEFAULT_DPI;
    return Math.floor(sizeInCm * actualDPI / CM_PER_INCH);
}