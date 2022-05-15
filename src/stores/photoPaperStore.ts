import { atom } from 'recoil';
import { IImageConfig } from '../types';

export const photoPaperStore = atom<IImageConfig | null>({
    key: 'photoPaperStore',
    default: null,
});
