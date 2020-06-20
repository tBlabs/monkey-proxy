"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("reflect-metadata");
const bin_1 = require("bluepill-client-library/bin");
let Driver = class Driver {
    constructor() {
        this.Connector = new bin_1.BoardSocketConnector('http://192.168.1.102:3000');
        this.IO = new bin_1.Board(this.Connector);
    }
};
Driver = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Driver);
exports.Driver = Driver;
//# sourceMappingURL=Driver.js.map