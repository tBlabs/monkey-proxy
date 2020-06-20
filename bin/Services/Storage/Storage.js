"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const fs = require("fs");
let Storage = class Storage {
    constructor() {
        this.File = '';
    }
    Read(obj) {
        if (this.File === '') {
            throw new Error('Storage file not defined');
        }
        if (fs.existsSync(this.File)) {
            const configFileContent = fs.readFileSync(this.File, 'utf8');
            const json = JSON.parse(configFileContent);
            this.OverrideProps(json, obj);
        }
    }
    OverrideProps(target, source) {
        Object.keys(source).forEach(p => {
            target[p] = source[p];
        });
    }
    Write(obj) {
        if (this.File === '') {
            throw new Error('Storage file not defined');
        }
        const asJson = JSON.stringify(obj);
        fs.writeFileSync(this.File, asJson);
    }
};
Storage = __decorate([
    inversify_1.injectable()
], Storage);
exports.Storage = Storage;
//# sourceMappingURL=Storage.js.map