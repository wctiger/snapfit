import { create } from 'zustand';
import { Area } from 'react-easy-crop';
import { IImageConfig } from '../types';

interface AppState {
    theme: 'light' | 'dark';
    uploadImage: string | null;
    crop: Area | null;
    targetImage: IImageConfig | null;
    photoPaper: IImageConfig | null;

    setTheme: (theme: 'light' | 'dark') => void;
    setUploadImage: (image: string | null) => void;
    setCrop: (crop: Area | null) => void;
    setTargetImage: (image: IImageConfig | null) => void;
    setPhotoPaper: (paper: IImageConfig | null) => void;
}

export const useStore = create<AppState>()((set) => ({
    theme: 'light',
    uploadImage: null,
    crop: null,
    targetImage: null,
    photoPaper: null,

    setTheme: (theme) => set({ theme }),
    setUploadImage: (uploadImage) => set({ uploadImage }),
    setCrop: (crop) => set({ crop }),
    setTargetImage: (targetImage) => set({ targetImage }),
    setPhotoPaper: (photoPaper) => set({ photoPaper }),
}));
