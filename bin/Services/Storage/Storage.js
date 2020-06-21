"use strict";
// import { injectable } from 'inversify';
// import 'reflect-metadata';
// import * as fs from 'fs';
// export interface IStorage<T>
// {
//     File?: string;
//     Read(obj: T): void;
//     Write(obj: T): void;
// }
// @injectable()
// export class Storage<T> implements IStorage<T>
// {
//     public File: string = '';
//     public Read(obj: T): void
//     {
//         if (this.File === '')
//         {
//             throw new Error('Storage file not defined');
//         }
//         if (fs.existsSync(this.File))
//         {
//             const configFileContent = fs.readFileSync(this.File, 'utf8');
//             const json = JSON.parse(configFileContent);
//             this.OverrideProps(json, obj);
//         }
//     }
//     private OverrideProps(target: T, source: T)
//     {
//         Object.keys(source).forEach(p =>
//         {
//             target[p] = source[p];
//         });
//     }
//     public Write(obj: T): void
//     {
//         if (this.File === '')
//         {
//             throw new Error('Storage file not defined');
//         }
//         const asJson = JSON.stringify(obj);
//         fs.writeFileSync(this.File, asJson);
//     }
// }
//# sourceMappingURL=Storage.js.map