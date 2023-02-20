import { atom } from 'recoil';

export const themeStore = atom<'light' | 'dark'>({
    key: 'themeStore',
    default: 'light',
});
