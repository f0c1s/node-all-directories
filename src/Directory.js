"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    Directory.prototype.walk = function (options) {
        var _this = this;
        if (options === void 0) { options = {
            depth: 1,
            verbose: false,
            callbacks: []
        }; }
        var dontNeedToWalk = options.depth <= 0 || (this.children && this.depth >= options.depth);
        if (dontNeedToWalk) {
            return this;
        }
        try {
            var depth_1 = this.depth = options.depth;
            var dirs = d(this.root);
            if (options.verbose) {
                console.log(this.root + ": " + dirs);
            }
            var children_1 = this.children = dirs.map(function (d) { return new Directory(path_1.join(_this.root, d)); });
            if (--depth_1) {
                try {
                    this.children.forEach(function (c) { return c.walk(__assign(__assign({}, options), { depth: depth_1 })); });
                }
                catch (error) {
                    this.errors.push(error.message);
                }
            }
            if (options.callbacks && options.callbacks.length) {
                options.callbacks.forEach(function (cb) { return cb(children_1); });
            }
        }
        catch (error) {
            this.errors.push(error.message);
        }
        return this;
    };
    Directory.prototype.find = function (findAll, whenFound, options) {
        if (options === void 0) { options = {
            depth: 1,
            verbose: false,
            callbacks: []
        }; }
        if (options && options.depth > this.depth) {
            this.walk.apply(options);
        }
        var onWalk = function (children) {
            var roots = children.map(function (child) { return child.root; });
            roots.forEach(function (root) {
                findAll.forEach(function (toFind) {
                    if (root.endsWith(toFind)) {
                        if (whenFound && typeof whenFound === 'function') {
                            whenFound(root, toFind);
                        }
                        else {
                            console.log(root, toFind);
                        }
                    }
                });
            });
        };
        if (this.children) {
            onWalk(this.children);
            --options.depth;
            this.children.forEach(function (child) { return child.find(findAll, whenFound, options); });
        }
    };
    return Directory;
}());
exports.Directory = Directory;
