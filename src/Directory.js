"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Directory = void 0;
var path_1 = require("path");
var d = require('node-directories');
var Directory = /** @class */ (function () {
    function Directory(root) {
        this.root = '/';
        this.children = null;
        this.errors = [];
        this.depth = 0;
        this.root = root || '/';
    }
    Directory.prototype.walk = function (depth) {
        var _this = this;
        if (depth === void 0) { depth = 1; }
        var dontNeedToWalk = depth <= 0 || (this.children && this.depth >= depth);
        if (dontNeedToWalk) {
            return this;
        }
        try {
            this.depth = depth;
            var dirs = d(this.root);
            this.children = dirs.map(function (d) { return new Directory(path_1.join(_this.root, d)); });
            if (--depth) {
                try {
                    this.children.forEach(function (c) { return c.walk(depth); });
                }
                catch (error) {
                    this.errors.push(error.message);
                }
            }
        }
        catch (error) {
            this.errors.push(error.message);
        }
        return this;
    };
    return Directory;
}());
exports.Directory = Directory;
