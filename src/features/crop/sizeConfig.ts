interface ISizeConfig {
    displayName: string;
    height: number;
    width: number;
    unit: 'cm' | 'inch' | 'px'; //...
}

export const sizeConfig: ISizeConfig[] = [
    {
        displayName: '2.5 by 3.5 cm',
        height: 3.5,
        width: 2.5,
        unit: 'cm',
    },
    {
        displayName: 'US Visa',
        height: 2,
        width: 2,
        unit: 'inch',
    },
];
