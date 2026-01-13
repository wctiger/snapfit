import { Upload as UploadIcon, ImagePlus } from 'lucide-react';
import { ChangeEvent, useState, DragEvent } from 'react';
import { useStore } from '../../stores/store';
import StyledPaper from '../../components/StyledPaper';
import { readFile } from '../../utils';

const Upload = () => {
    const setUploadImage = useStore(state => state.setUploadImage);
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = async (file: File) => {
        const imageDataUrl = (await readFile(file)) + '';
        setUploadImage(imageDataUrl);
    };

    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            await handleFile(e.target.files[0]);
        }
    };

    const onDragOver = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDrop = async (e: DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            await handleFile(e.dataTransfer.files[0]);
        }
    };

    return (
        <StyledPaper className="justify-center items-center">
            <div className="w-full max-w-md mx-auto space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Upload a Photo</h2>
                    <p className="text-sm text-muted-foreground">
                        Select or drag an image to get started
                    </p>
                </div>

                <input
                    className="hidden"
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    aria-label="Upload image file"
                />
                <label
                    htmlFor="file-upload"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    className={`
                        flex flex-col items-center justify-center gap-4 p-8 sm:p-12
                        border-2 border-dashed rounded-xl cursor-pointer
                        transition-all duration-200 ease-in-out
                        ${
                            isDragging
                                ? 'border-primary bg-primary/5 scale-[1.02]'
                                : 'border-border hover:border-primary/50 hover:bg-accent/50'
                        }
                    `}
                >
                    <div
                        className={`
                            p-4 rounded-full transition-colors duration-200
                            ${isDragging ? 'bg-primary/10' : 'bg-muted'}
                        `}
                    >
                        <ImagePlus
                            className={`
                                h-8 w-8 sm:h-10 sm:w-10 transition-colors duration-200
                                ${isDragging ? 'text-primary' : 'text-muted-foreground'}
                            `}
                        />
                    </div>
                    <div className="text-center space-y-1.5">
                        <p className="text-sm font-medium">
                            <span className="text-primary">Click to upload</span>
                            <span className="text-muted-foreground"> or drag and drop</span>
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, WEBP up to 10MB</p>
                    </div>
                </label>
            </div>
        </StyledPaper>
    );
};

export default Upload;
