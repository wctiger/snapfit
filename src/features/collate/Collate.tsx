import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '../../stores/store';
import photoPaperConfigArr from '../../config/photo-paper-config.json';
import useImageCollate from './hooks/useImageCollate';
import StyledPaper from '../../components/StyledPaper';
import { IImageConfig } from '../../types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

const Collate = () => {
    const { uploadImage, photoPaper, setPhotoPaper } = useStore();
    const { loading, photoPreview, downloadPrint } = useImageCollate();

    const [backgroundColor, setBackgroundColor] = useState('#fff');

    useEffect(() => {
        //@ts-ignore
        setPhotoPaper({ ...photoPaperConfigArr[0], backgroundColor });
    }, []);

    const onPhotoPaperChange = (value: string) => {
        //@ts-ignore
        const selectedConfig: IImageConfig = photoPaperConfigArr.find(config => config.name === value);
        if (selectedConfig) {
            setPhotoPaper({ ...selectedConfig, backgroundColor });
        }
    };

    return (
        <StyledPaper>
            {uploadImage && (
                <>
                    <h5 className="text-2xl font-semibold mb-4">
                        Collate Image
                    </h5>
                    <div className="flex justify-between mb-6">
                        <div className="w-[45%]">
                            <Select
                                value={photoPaper?.name ?? ''}
                                onValueChange={onPhotoPaperChange}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select paper size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {photoPaperConfigArr.map(({ name, unit }) => (
                                        <SelectItem key={name} value={name}>{`${name} ${unit}`}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <ToggleGroup
                            type="single"
                            value={backgroundColor}
                            onValueChange={(value) => {
                                if (value) {
                                    setBackgroundColor(value);
                                    setPhotoPaper({ ...photoPaper!, backgroundColor: value });
                                }
                            }}
                            className="ml-4"
                        >
                            <ToggleGroupItem value="#fff" aria-label="White">
                                White
                            </ToggleGroupItem>
                            <ToggleGroupItem value="blue" aria-label="Blue">
                                Blue
                            </ToggleGroupItem>
                            <ToggleGroupItem value="#333" aria-label="Gray">
                                Gray
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>
                    <div className="flex-grow text-center my-1">
                        <canvas style={{ maxWidth: '100%', maxHeight: '70vh' }} id="collate-canvas"></canvas>
                    </div>
                    <Button
                        variant="default"
                        className="mt-4 bg-green-600 hover:bg-green-700"
                        onClick={() => {
                            downloadPrint();
                        }}
                    >
                        <Download className="mr-2 h-4 w-4" />
                        Download Print
                    </Button>
                </>
            )}
        </StyledPaper>
    );
};

export default Collate;
