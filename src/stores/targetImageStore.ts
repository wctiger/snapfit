import { atom } from 'recoil';
import { IImageConfig } from '../types';

export const targetImageStore = atom<IImageConfig | null>({
    key: 'targetImageStore',
    default: null,
});
