self.onmessage = function (e: MessageEvent<any>) {
    if (e.data.canvas) {
        const canvasOutput = e.data.canvas;
        const ctxOutput = canvasOutput.getContext('2d');
        if (!ctxOutput) return '';

        // Take the cropped image and resize it
        const { targetWidth, targetHeight, photoPaperWidth, photoPaperHeight, backgroundColor, scaledData } = e.data;

        // const canvasScaled = new OffscreenCanvas(targetWidth, targetHeight);
        // const ctxScaled = canvasScaled.getContext('2d') as OffscreenCanvasRenderingContext2D;
        // if (!ctxScaled) return '';

        // ctxScaled.drawImage(e.data.scaledCanvas, 0, 0, targetWidth, targetHeight);
        // const ctxScaled = canvasScaled.getContext('2d') as OffscreenCanvasRenderingContext2D;
        // const scaledData = ctxScaled.getImageData(0, 0, targetWidth, targetHeight);

        const { imagePositions, rotatePaper } = calculatePositions(
            photoPaperWidth,
            photoPaperHeight,
            targetWidth,
            targetHeight
        );

        if (rotatePaper) {
            canvasOutput.width = photoPaperHeight;
            canvasOutput.height = photoPaperWidth;
        } else {
            canvasOutput.width = photoPaperWidth;
            canvasOutput.height = photoPaperHeight;
        }

        ctxOutput.fillStyle = backgroundColor || 'white';
        ctxOutput.fillRect(0, 0, canvasOutput.width, canvasOutput.height);

        for (const row of imagePositions) {
            for (const pos of row) {
                const { pos_x, pos_y } = pos;
                ctxOutput.putImageData(scaledData, pos_x, pos_y);
            }
        }
    }
};

const GUTTER = 5;
function calculatePositions(
    paperWidth: number,
    paperHeight: number,
    singlePhotoWidth: number,
    singlePhotoHeight: number
) {
    let rotatePaper = false;
    const columnCount = Math.floor(paperWidth / (singlePhotoWidth + GUTTER));
    const rowCount = Math.floor(paperHeight / (singlePhotoHeight + GUTTER));
    const rotateColumnCount = Math.floor(paperHeight / (singlePhotoWidth + GUTTER));
    const rotateRowCount = Math.floor(paperWidth / (singlePhotoHeight + GUTTER));

    let bestColumnCount = columnCount;
    let bestRowCount = rowCount;
    let horizontalStartPoint = (paperWidth - bestColumnCount * (singlePhotoWidth + GUTTER) + GUTTER) / 2;
    let verticalStartPoint = (paperHeight - bestRowCount * (singlePhotoHeight + GUTTER) + GUTTER) / 2;

    // Rotate to get better print efficiency
    if (rotateColumnCount * rotateRowCount > columnCount * rowCount) {
        rotatePaper = true;
        bestColumnCount = rotateColumnCount;
        bestRowCount = rotateRowCount;
        horizontalStartPoint = (paperHeight - bestColumnCount * (singlePhotoWidth + GUTTER) + GUTTER) / 2;
        verticalStartPoint = (paperWidth - bestRowCount * (singlePhotoHeight + GUTTER) + GUTTER) / 2;
    }

    if (horizontalStartPoint < 0 || verticalStartPoint < 0) {
        console.warn('dimension calculation is wrong', { horizontalStartPoint, verticalStartPoint });
    }

    const posArr = Array.from(Array(bestRowCount), () => Array(bestColumnCount));
    for (let i = 0; i < bestColumnCount; i++) {
        let pos_x = horizontalStartPoint + (singlePhotoWidth + GUTTER) * i;
        for (let j = 0; j < bestRowCount; j++) {
            let pos_y = verticalStartPoint + (singlePhotoHeight + GUTTER) * j;
            posArr[j][i] = { pos_x, pos_y };
        }
    }

    return {
        imagePositions: posArr,
        rotatePaper,
    };
}

export {};
