"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.directorySkeleton = exports.walk = void 0;
var directories = require('node-directories');
var path_1 = require("path");
function directorySkeleton(path, depth) {
    if (depth === void 0) { depth = 0; }
    if (depth < 0) {
        return [];
    }
    return directories(path).map(function (dir) { return walk("" + path + path_1.sep + dir, depth - 1); });
}
exports.directorySkeleton = directorySkeleton;
function walk(path, depth) {
    if (depth === void 0) { depth = 0; }
    if (depth < 0) {
        return [path];
    }
    return directories(path)
        .map(function (dir) { return __spreadArray([path], walk("" + path + path_1.sep + dir, depth - 1)); });
}
exports.walk = walk;
