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
const Driver_1 = require("./Driver");
const Repeater_1 = require("./Services/Repeater/Repeater");
let Display = class Display {
    constructor(_driver, _repeater) {
        this._driver = _driver;
        this._repeater = _repeater;
        this.t = 0;
        this.state = false;
        this.oldState = false;
        this._driver.IO.Display1.Value = 0;
        this._driver.IO.Display1.Dot = 2;
        this._driver.IO.Pwm1.Value = 990;
        this._repeater.Every100Ms(() => {
            if (this.oldState) {
                this._driver.IO.Display1.Value = this.t++;
            }
        });
    }
    set Value(val) {
        this._driver.IO.Display1.Value = val;
    }
    Timer(state) {
        if (state !== this.oldState) {
            this.t = 0;
            this.SetBacklight(state);
            this.oldState = state;
        }
    }
    SetBacklight(state) {
        if (state) {
            this._driver.IO.Pwm1.Value = 90;
            clearTimeout(this.backlightTimeoutHandler);
        }
        else {
            this.backlightTimeoutHandler = setTimeout(() => {
                this._driver.IO.Pwm1.Value = 990;
            }, 3000);
        }
    }
};
Display = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Driver_1.Driver,
        Repeater_1.Repeater])
], Display);
exports.Display = Display;
//# sourceMappingURL=Display.js.map