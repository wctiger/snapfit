import { atom } from 'recoil';

export const uploadImageStore = atom<unknown>({
    key: 'uploadImageStore',
    default: null,
});
