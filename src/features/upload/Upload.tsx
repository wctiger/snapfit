import { Camera } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ChangeEvent } from 'react';
import { useStore } from '../../stores/store';
import StyledPaper from '../../components/StyledPaper';
import { readFile } from '../../utils';

const Upload = () => {
    const setUploadImage = useStore(state => state.setUploadImage);
    const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        // TODO: verify file type
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            let imageDataUrl = (await readFile(file)) + '';
            setUploadImage(imageDataUrl);
        }
    };
    return (
        <StyledPaper className="justify-center items-center">
            <h5 className="text-2xl font-semibold mb-4">Upload a photo</h5>
            <div className="flex items-center justify-center gap-4 mt-8">
                <div className="flex items-center">
                    <input style={{ display: 'none' }} id="file-upload" type="file" onChange={onFileChange} />
                    <label htmlFor="file-upload">
                        <Button variant="default" asChild className="cursor-pointer">
                            <span>
                                Select File
                                <Camera className="ml-2 h-4 w-4" />
                            </span>
                        </Button>
                    </label>
                </div>
            </div>
        </StyledPaper>
    );
};

export default Upload;
