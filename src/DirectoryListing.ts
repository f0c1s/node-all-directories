import {join} from 'path';
import {readdirSync, lstatSync} from "fs";

const d = require('node-directories');

const getFilesInCurrentDirectory = (dir: any) => {
    const content = readdirSync(dir);
    const getPath = (x: any) => join(dir, x);
    const isFile = (x: any) => lstatSync(getPath(x)).isFile();
    return content.filter(isFile);
};

class DirectoryListing {
    root: string = '/';
    children: any = null;
    files: any = null;
    errors: any[] = [];
    depth: number = 0;

    constructor(r: string) {
        this.root = r || '/';
    }

    walk(depth = 1) {
        const dontNeedToWalk = depth <= 0 || (this.children && this.depth >= depth);
        if (dontNeedToWalk) {
            return this;
        }
        try {
            this.depth = depth;
            const dirs = d(this.root);
            this.files = getFilesInCurrentDirectory(this.root);
            this.children = dirs.map((d: any) => new DirectoryListing(join(this.root, d)));
            if (--depth) {
                try {
                    this.children.forEach((c: any) => c.walk(depth));
                } catch (error) {
                    this.errors.push(error.message);
                }
            }
        } catch (error) {
            this.depth--;
            this.errors.push(error.message);
        }
        return this;
    }
}

export {DirectoryListing};
