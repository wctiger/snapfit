import { atom } from 'recoil';

export const photoPaperStore = atom<{ width: number; height: number }>({
    key: 'photoPaperStore',
    default: {
        width: 0,
        height: 0,
    },
});
