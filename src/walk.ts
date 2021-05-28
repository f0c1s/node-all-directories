const directories = require('node-directories');
import {sep} from 'path';

function directorySkeleton(path: string, depth: number = 0) {
    if (depth < 0) {
        return [];
    }
    return directories(path).map((dir: string) => walk(`${path}${sep}${dir}`, depth - 1));
}

function walk(path: string, depth: number = 0) {
    if (depth < 0) {
        return [path];
    }
    return directories(path)
        .map((dir: string) => [path, ...walk(`${path}${sep}${dir}`, depth - 1)]);
}

export {walk, directorySkeleton};
