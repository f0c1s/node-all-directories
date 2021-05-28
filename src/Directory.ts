import {join} from 'path';

const d = require('node-directories');

class Directory {
    root: string = '/';
    children: any = null;
    errors: any[] = [];
    depth: number = 0;

    constructor(root: string) {
        this.root = root || '/';
    }

    walk(depth = 1) {
        const dontNeedToWalk = depth <= 0 || (this.children && this.depth >= depth);
        if (dontNeedToWalk) {
            return this;
        }
        try {
            this.depth = depth;
            const dirs = d(this.root);
            this.children = dirs.map((d: any) => new Directory(join(this.root, d)));
            if (--depth) {
                try {
                    this.children.forEach((c: any) => c.walk(depth));
                } catch (error) {
                    this.errors.push(error.message);
                }
            }
        } catch (error) {
            this.errors.push(error.message);
        }
        return this;
    }
}

export {Directory};
