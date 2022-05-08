interface ISizeConfig {
    [key: string]: {
        height: number,
        width: number,
        unit: 'cm' | 'inch' | 'px' //...
    }
}

export const sizeConfig: ISizeConfig = {
    test: {
        height: 3.5,
        width: 2.5,
        unit: 'cm'
    }
}