export type PageFocus = null | string;

export const always = <T>(t: T): (..._: any[]) => T => {
    return (_: any) => t
}