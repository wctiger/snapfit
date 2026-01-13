import { Download, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from '../../stores/store';
import photoPaperConfigArr from '../../config/photo-paper-config.json';
import useImageCollate from './hooks/useImageCollate';
import StyledPaper from '../../components/StyledPaper';
import { IImageConfig } from '../../types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';

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
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight mb-5">Collate Image</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Paper Size</Label>
                            <Select value={photoPaper?.name ?? ''} onValueChange={onPhotoPaperChange}>
                                <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Select paper size" />
                                </SelectTrigger>
                                <SelectContent>
                                    {photoPaperConfigArr.map(({ name, unit }) => (
                                        <SelectItem key={name} value={name}>{`${name} ${unit}`}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-muted-foreground">Background</Label>
                            <ToggleGroup
                                type="single"
                                value={backgroundColor}
                                onValueChange={value => {
                                    if (value) {
                                        setBackgroundColor(value);
                                        setPhotoPaper({ ...photoPaper!, backgroundColor: value });
                                    }
                                }}
                                className="justify-start"
                            >
                                <ToggleGroupItem
                                    value="#fff"
                                    aria-label="White"
                                    className="px-3 h-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                                >
                                    White
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    value="blue"
                                    aria-label="Blue"
                                    className="px-3 h-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                                >
                                    Blue
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    value="#333"
                                    aria-label="Gray"
                                    className="px-3 h-10 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                                >
                                    Gray
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>
                    </div>

                    <div className="flex-grow flex items-center justify-center p-4 bg-muted/30 rounded-lg border border-border/50">
                        <div className="relative shadow-lg rounded overflow-hidden">
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                                </div>
                            )}
                            <canvas
                                id="collate-canvas"
                                className="max-w-full max-h-[60vh] sm:max-h-[65vh]"
                            ></canvas>
                        </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-border/50">
                        <Button
                            variant="default"
                            className="w-full sm:w-auto"
                            onClick={() => {
                                downloadPrint();
                            }}
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="mr-2 h-4 w-4" />
                            )}
                            Download Print
                        </Button>
                    </div>
                </>
            )}
        </StyledPaper>
    );
};

export default Collate;
