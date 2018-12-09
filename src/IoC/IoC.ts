// These two imports must go first!
import 'reflect-metadata';
import { Types } from './Types';
import { Container } from 'inversify';
import { IEnvironment } from '../Services/Environment/IEnvironment';
import { Environment } from '../Services/Environment/Environment';
import { IRunMode } from '../Services/RunMode/IRunMode';
import { RunMode } from '../Services/RunMode/RunMode';
import { ILogger } from '../Services/Logger/ILogger';
import { Logger } from '../Services/Logger/Logger';
import { Main } from '../Main';
import { IStartupArgs } from '../Services/Environment/IStartupArgs';
import { StartupArgs } from '../Services/Environment/StartupArgs';
import { Driver } from '../Driver';
import { MonkeyChallengeServer } from '../MonkeyChallengeServer';
import { Laser } from '../Laser';
import { Recorder } from '../Services/Recorder/Recorder';
import { Record } from '../Services/Recorder/Record';
import { IDateTimeProvider, DateTimeProvider } from '../Services/DateTimeProvider/DateTimeProvider';
import { Config } from '../Services/Config/Config';
import { Display } from '../Display';
import { Repeater } from '../Services/Repeater/Repeater';
import { IStorage, Storage } from '../Services/Storage/Storage';

const IoC = new Container();

try
{
    IoC.bind<IEnvironment>(Types.IEnvironment).to(Environment).inSingletonScope().whenTargetIsDefault();
    IoC.bind<IRunMode>(Types.IRunMode).to(RunMode).inSingletonScope().whenTargetIsDefault();
    IoC.bind<ILogger>(Types.ILogger).to(Logger).inSingletonScope().whenTargetIsDefault();
    IoC.bind<IStartupArgs>(Types.IStartupArgs).to(StartupArgs).inSingletonScope().whenTargetIsDefault();
    IoC.bind<IDateTimeProvider>(Types.IDateTimeProvider).to(DateTimeProvider).inTransientScope().whenTargetIsDefault();
    IoC.bind<Main>(Main).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind<Driver>(Driver).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind<Repeater>(Repeater).toSelf().inTransientScope().whenTargetIsDefault();
    IoC.bind<Config>(Config).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind<MonkeyChallengeServer>(MonkeyChallengeServer).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind<Laser>(Laser).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind<Display>(Display).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind<Recorder>(Recorder).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind<IStorage<Record>>(Types.IStorage).to(Storage).inSingletonScope().whenTargetIsDefault();
}
catch (ex)
{
    console.log('IoC exception:', ex);
}

export { IoC };
