import { Plus } from 'lucide-react';
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
            <div className="w-full max-w-md mx-auto space-y-5">
                <div className="space-y-1">
                    <h2 className="font-display text-2xl sm:text-3xl font-light tracking-wide">Upload a Photo</h2>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
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
                        relative flex flex-col items-center justify-center gap-5
                        p-10 sm:p-14 border border-dashed cursor-pointer
                        transition-all duration-300 overflow-hidden group min-h-[260px]
                        ${
                            isDragging
                                ? 'border-primary bg-primary/4 scale-[1.01]'
                                : 'border-border/70 hover:border-primary/50 hover:bg-accent/30'
                        }
                    `}
                >
                    {/* Ghost watermark */}
                    <span
                        className={`
                            absolute inset-0 flex items-center justify-center select-none
                            font-display font-light leading-none tracking-[0.3em]
                            pointer-events-none transition-all duration-500
                            text-[5.5rem] sm:text-[7rem]
                            ${isDragging ? 'text-primary/6' : 'text-foreground/[0.03] group-hover:text-foreground/[0.05]'}
                        `}
                    >
                        PHOTO
                    </span>

                    {/* Plus icon */}
                    <div
                        className={`
                            relative z-10 w-9 h-9 border flex items-center justify-center
                            transition-all duration-200
                            ${isDragging ? 'border-primary text-primary' : 'border-border/70 text-muted-foreground group-hover:border-primary/60 group-hover:text-primary'}
                        `}
                    >
                        <Plus className="h-4 w-4" />
                    </div>

                    {/* Labels */}
                    <div className="relative z-10 text-center space-y-1.5">
                        <p className="text-[11px] tracking-[0.25em] uppercase font-medium">
                            <span className={isDragging ? 'text-primary' : 'text-foreground/80'}>
                                Click to upload
                            </span>
                            <span className="text-muted-foreground"> or drag and drop</span>
                        </p>
                        <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground/60">
                            PNG &middot; JPG &middot; WEBP
                        </p>
                    </div>
                </label>
            </div>
        </StyledPaper>
    );
};

export default Upload;
