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
const Driver_1 = require("./Driver");
const inversify_1 = require("inversify");
let Laser = class Laser {
    constructor(_driver) {
        this._driver = _driver;
        let state = false;
        let oldState = !state;
        this._driver.IO.Adc1.OnChange((adc) => {
            state = this.IsLaserVisible(adc.Current.Value);
            if (state != oldState) {
                if (this.onStateChange)
                    this.onStateChange(state);
                oldState = state;
            }
        });
    }
    OnStateChange(callback) {
        this.onStateChange = callback;
    }
    IsLaserVisible(adcValue) {
        return (adcValue > 50);
    }
};
Laser = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Driver_1.Driver])
], Laser);
exports.Laser = Laser;
//# sourceMappingURL=Laser.js.map