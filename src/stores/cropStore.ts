import { Area } from 'react-easy-crop';
import { atom } from 'recoil';

export const cropStore = atom<Area | null>({
    key: 'cropStore',
    default: null,
});
