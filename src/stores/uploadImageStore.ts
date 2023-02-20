import { atom } from 'recoil';

export const uploadImageStore = atom<string | null>({
    key: 'uploadImageStore',
    default: null,
});
