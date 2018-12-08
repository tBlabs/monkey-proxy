import 'reflect-metadata';
import { Types } from "../../IoC/Types";
import { inject, injectable } from "inversify";
import { IDateTimeProvider } from '../DateTimeProvider/DateTimeProvider';

@injectable()
export class Recorder
{
    constructor(@inject(Types.IDateTimeProvider) private _dateTimeProvider: IDateTimeProvider)
    { }

    public Record(state: boolean): void
    {
        state ? this.Start() : this.Stop();
    }

    private startMoment: Date = new Date();
    private lastSessionDuration: number = 0;
    private total: number = 0;
    private dailyTotal = {};

    public get DailyTotal(): object
    {
        return this.dailyTotal;
    }

    public get LastSessionDuration(): number
    {
        return this.lastSessionDuration;
    }

    public get TotalDuration(): number
    {
        return this.total;
    }

    public Start()
    {
        this.startMoment = this._dateTimeProvider.Now;
    }

    public Stop()
    {
        const now = this._dateTimeProvider.Now; // cause '.New' will always give you different value; and this is a problem during the tests
        const date = this._dateTimeProvider.Date; // always use copy of something that may change with every read
        
        this.lastSessionDuration = (now.getTime() - this.startMoment.getTime()) / 1000;

        this.total += this.lastSessionDuration;

        if (this.dailyTotal[date] === undefined) this.dailyTotal[date] = 0;
        this.dailyTotal[date] += this.lastSessionDuration;
    }
}