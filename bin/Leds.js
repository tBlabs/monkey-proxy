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
let Leds = class Leds {
    constructor() {
        this.led1 = new onoff_1.Gpio(20, 'out');
        this.led2 = new onoff_1.Gpio(21, 'out');
    }
    Led1State(state) {
        this.led1.writeSync(state);
    }
    Led1Toggle() {
        this.led1.writeSync(this.led1.readSync() ^ 1);
    }
    Led1On() {
        this.led1.writeSync(1);
    }
    Led1Off() {
        this.led1.writeSync(0);
    }
    Led2State(state) {
        this.led2.writeSync(state);
    }
    Led2Toggle() {
        this.led2.writeSync(this.led2.readSync() ^ 1);
    }
    Led2On() {
        this.led2.writeSync(1);
    }
    Led2Off() {
        this.led2.writeSync(0);
    }
    Dispose() {
        this.led1.unexport();
        this.led2.unexport();
    }
};
Leds = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Leds);
exports.Leds = Leds;
//# sourceMappingURL=Leds.js.map