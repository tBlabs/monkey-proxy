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
const onoff_1 = require("onoff");
const inversify_1 = require("inversify");
let Lasers = class Lasers {
    constructor() {
        this.button1 = new onoff_1.Gpio(24, 'in', 'both', { debounceTimeout: 10 });
        this.button2 = new onoff_1.Gpio(25, 'in', 'both', { debounceTimeout: 10 });
        this.button1.watch((err, value) => {
            var _a, _b;
            if (err)
                throw err;
            (_b = (_a = this).sensorAChangeCallback) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        });
        this.button2.watch((err, value) => {
            var _a, _b;
            if (err)
                throw err;
            (_b = (_a = this).sensorBChangeCallback) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        });
    }
    SensorAChange(callback) {
        this.sensorAChangeCallback = callback;
    }
    SensorBChange(callback) {
        this.sensorBChangeCallback = callback;
    }
    Dispose() {
        this.button1.unexport();
        this.button2.unexport();
    }
};
Lasers = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Lasers);
exports.Lasers = Lasers;
//# sourceMappingURL=Lasers.js.map