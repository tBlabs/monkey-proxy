export class Record
{
    constructor(
        public lastSession: number = 0,
        public total: number = 0,
        public dailyTotal: object = {})
    { }

    public AddToDailyTotal(date: string, toAdd: number): any
    {
        if (this.dailyTotal[date] === undefined) this.dailyTotal[date] = 0;
        this.dailyTotal[date] += toAdd;
    }
}
