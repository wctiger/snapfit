import { IImageConfig } from '../types';

export const CUSTOM_NAME = 'Custom';

export type DimUnit = 'mm' | 'inch';

export function toInternalConfig(w: number, h: number, unit: DimUnit, backgroundColor?: string): IImageConfig {
    return {
        name: CUSTOM_NAME,
        width: unit === 'mm' ? w / 10 : w,
        height: unit === 'mm' ? h / 10 : h,
        unit: unit === 'mm' ? 'cm' : 'inch',
        ...(backgroundColor !== undefined && { backgroundColor }),
    };
}
