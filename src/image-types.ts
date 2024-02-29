
export type Resolution = {
    width: number; 
    height: number;
}

export type ImageSizing = {
    original: Resolution;
    large: Resolution; 
    medium: Resolution;
    small: Resolution;
}

export type SizeMap = Record<string, ImageSizing>;