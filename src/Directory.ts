import {join} from 'path';
import {readdirSync, lstatSync} from "fs";

const getFilesInCurrentDirectory = (dir: any) => {
    const content = readdirSync(dir);
    const getPath = (x: any) => join(dir, x);
    const isFile = (x: any) => lstatSync(getPath(x)).isFile();
    return content.filter(isFile);
};

const d = require('node-directories');

interface OptionsI {
    depth: number,
    verbose: boolean,
    callbacks: any[]
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

class Directory implements DirectoryI {
    root: string = '/';
    children: any = null;
    errors: any[] = [];
    depth: number = 0;
    files: any = null;

    constructor(root: string) {
        this.root = root || '/';
    }

    walk(options: OptionsI = {
        depth: 1,
        verbose: false,
        callbacks: []
    }): Directory {
        const dontNeedToWalk = options.depth <= 0 || (this.children && this.depth >= options.depth);
        if (dontNeedToWalk) {
            return this;
        }
        try {
            let depth = this.depth = options.depth;
            const dirs = d(this.root);
            if (options.verbose) {
                console.log(`${this.root}: ${dirs}`);
            }
            this.files = getFilesInCurrentDirectory(this.root);
            const children = this.children = dirs.map((d: any) => new Directory(join(this.root, d)));
            if (--depth) {
                try {
                    this.children.forEach((c: any) => c.walk({...options, depth}));
                } catch (error) {
                    this.errors.push(error.message);
                }
            }
            if (options.callbacks && options.callbacks.length) {
                options.callbacks.forEach(cb => cb(children));
            }
        } catch (error) {
            this.errors.push(error.message);
        }
        return this;
    }

    find(findAll: string[], whenFound: (root: string, found: string) => {}, options: OptionsI = {
        depth: 1,
        verbose: false,
        callbacks: []
    }) {
        if (options && options.depth > this.depth) {
            this.walk(options);
        }
        const onWalk = (children: any) => {
            const roots = children.map((child: any) => child.root);
            roots.forEach((root: string) => {
                try {
                    findAll.forEach((toFind: string) => {
                        if (root.endsWith(toFind)) {
                            if (whenFound && typeof whenFound === 'function') {
                                whenFound(root, toFind);
                            } else {
                                console.log(root, toFind);
                            }
                        }
                    });
                } catch (error) {
                    this.errors.push(error.message);
                }
            });
        };
        if (this.children) {
            try {
                onWalk(this.children);
                --options.depth;
                this.children.forEach((child: any) => child.find(findAll, whenFound, options));
            } catch (error) {
                this.errors.push(error.message);
            }
        }
    }
}

export {Directory};
