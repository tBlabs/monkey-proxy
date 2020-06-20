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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Types_1 = require("../../IoC/Types");
const inversify_1 = require("inversify");
const Record_1 = require("./Record");
let Recorder = class Recorder {
    constructor(_dateTimeProvider, _storage) {
        this._dateTimeProvider = _dateTimeProvider;
        this._storage = _storage;
        this.record = new Record_1.Record();
        this._storage.File = './records/record.json';
        this._storage.Read(this.record);
    }
    Record(state) {
        state ? this.Start() : this.Stop();
    }
    get DailyTotal() {
        return this.record.dailyTotal;
    }
    get LastSessionDuration() {
        return this.record.lastSession;
    }
    get TotalDuration() {
        return this.record.total;
    }
    Start() {
        this.startMoment = this._dateTimeProvider.Now;
    }
    Stop() {
        if (this.startMoment === undefined)
            return;
        const now = this._dateTimeProvider.Now; // cause '.New' will always give you different value; and this is a problem during the tests
        const date = this._dateTimeProvider.Date; // always use copy of something that may change with every read
        this.record.lastSession = (now.getTime() - this.startMoment.getTime());
        this.record.total += this.record.lastSession;
        this.record.AddToDailyTotal(date, this.record.lastSession);
        this._storage.Write(this.record);
    }
};
Recorder = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(Types_1.Types.IDateTimeProvider)),
    __param(1, inversify_1.inject(Types_1.Types.IStorage)),
    __metadata("design:paramtypes", [Object, Object])
], Recorder);
exports.Recorder = Recorder;
//# sourceMappingURL=Recorder.js.map