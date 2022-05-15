export function readFile(file: Blob) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result), false);
        reader.readAsDataURL(file);
    });
}

export function downloadImage(imageURL: string, saveAs: string) {
    try {
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = saveAs;
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (e) {
        console.error(`Failed to download file: ${e}`);
    }
}

const PRINT_DPI = 300;
const CM_PER_INCH = 2.54;

export function cmToPx(sizeInCm: number) {
    const actualDPI = window.devicePixelRatio * PRINT_DPI;
    return Math.floor((sizeInCm * actualDPI) / CM_PER_INCH);
}

export function inchToPx(sizeInInch: number) {
    const actualDPI = window.devicePixelRatio * PRINT_DPI;
    return sizeInInch * actualDPI;
}
