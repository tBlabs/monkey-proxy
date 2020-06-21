// import 'reflect-metadata';
// import { Types } from "../../IoC/Types";
// import { inject, injectable } from "inversify";
// import { IDateTimeProvider } from '../DateTimeProvider/DateTimeProvider';
// import { IStorage } from '../Storage/Storage';
// import { Record } from './Record';

// @injectable()
// export class Recorder
// {
//     constructor(
//         @inject(Types.IDateTimeProvider) private _dateTimeProvider: IDateTimeProvider,
//         @inject(Types.IStorage) private _storage: IStorage<Record>)
//     {
//         this._storage.File = './records/record.json';

//         this._storage.Read(this.record);
//     }

//     public Record(state: boolean): void
//     {
//         state ? this.Start() : this.Stop();
//     }

//     private startMoment?: Date;
//     private record: Record = new Record();

//     public get DailyTotal(): object
//     {
//         return this.record.dailyTotal;
//     }

//     public get LastSessionDuration(): number
//     {
//         return this.record.lastSession;
//     }

//     public get TotalDuration(): number
//     {
//         return this.record.total;
//     }

//     public Start()
//     {
//         this.startMoment = this._dateTimeProvider.Now;
//     }

//     public Stop()
//     {
//         if (this.startMoment === undefined) return;

//         const now = this._dateTimeProvider.Now; // cause '.New' will always give you different value; and this is a problem during the tests
//         const date = this._dateTimeProvider.Date; // always use copy of something that may change with every read

//         this.record.lastSession = (now.getTime() - this.startMoment.getTime());

//         this.record.total += this.record.lastSession;

//         this.record.AddToDailyTotal(date, this.record.lastSession);

//         this._storage.Write(this.record);
//     }
// }