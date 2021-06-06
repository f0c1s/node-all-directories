"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryListing = void 0;
var path_1 = require("path");
var fs_1 = require("fs");
var d = require('node-directories');
var getFilesInCurrentDirectory = function (dir) {
    var content = fs_1.readdirSync(dir);
    var getPath = function (x) { return path_1.join(dir, x); };
    var isFile = function (x) { return fs_1.lstatSync(getPath(x)).isFile(); };
    return content.filter(isFile);
};
var DirectoryListing = /** @class */ (function () {
    function DirectoryListing(r) {
        this.root = '/';
        this.children = null;
        this.files = null;
        this.errors = [];
        this.depth = 0;
        this.root = r || '/';
    }
    DirectoryListing.prototype.walk = function (depth, verbose) {
        var _this = this;
        if (depth === void 0) { depth = 1; }
        if (verbose === void 0) { verbose = false; }
        var dontNeedToWalk = depth <= 0 || (this.children && this.depth >= depth);
        if (dontNeedToWalk) {
            return this;
        }
        try {
            this.depth = depth;
            var dirs = d(this.root);
            if (verbose) {
                console.log(this.root + ": " + dirs);
            }
            this.files = getFilesInCurrentDirectory(this.root);
            this.children = dirs.map(function (d) { return new DirectoryListing(path_1.join(_this.root, d)); });
            if (--depth) {
                try {
                    this.children.forEach(function (c) { return c.walk(depth, verbose); });
                }
                catch (error) {
                    this.errors.push(error.message);
                }
            }
        }
        catch (error) {
            this.depth--;
            this.errors.push(error.message);
        }
        return this;
    };
    return DirectoryListing;
}());
exports.DirectoryListing = DirectoryListing;
