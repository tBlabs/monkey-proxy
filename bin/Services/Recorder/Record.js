"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Record {
    constructor(lastSession = 0, total = 0, dailyTotal = {}) {
        this.lastSession = lastSession;
        this.total = total;
        this.dailyTotal = dailyTotal;
    }
    AddToDailyTotal(date, toAdd) {
        if (this.dailyTotal[date] === undefined)
            this.dailyTotal[date] = 0;
        this.dailyTotal[date] += toAdd;
    }
}
exports.Record = Record;
//# sourceMappingURL=Record.js.map