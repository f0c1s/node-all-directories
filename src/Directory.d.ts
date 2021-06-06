interface OptionsI {
    depth: number;
    verbose: boolean;
    callbacks: any[];
}
interface DirectoryI {
    root: string;
    children: any;
    errors: any[];
    depth: number;
    files: any[];
    walk(options?: OptionsI): Directory;
    find(findAll: string[], whenFound: (root: string, found: string) => {}, options?: OptionsI): void;
}
declare class Directory implements DirectoryI {
    root: string;
    children: any;
    errors: any[];
    depth: number;
    files: any;
    constructor(root: string);
    walk(options?: OptionsI): Directory;
    find(findAll: string[], whenFound: (root: string, found: string) => {}, options?: OptionsI): void;
}
export { Directory };
//# sourceMappingURL=Directory.d.ts.map