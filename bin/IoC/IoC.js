"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// These two imports must go first!
require("reflect-metadata");
const Types_1 = require("./Types");
const inversify_1 = require("inversify");
const Environment_1 = require("../Services/Environment/Environment");
const RunMode_1 = require("../Services/RunMode/RunMode");
const Logger_1 = require("../Services/Logger/Logger");
const Main_1 = require("../Main");
const Server_1 = require("../Server");
const StartupArgs_1 = require("../Services/Environment/StartupArgs");
const MonkeyChallengeServer_1 = require("../MonkeyChallengeServer");
const DateTimeProvider_1 = require("../Services/DateTimeProvider/DateTimeProvider");
const Config_1 = require("../Services/Config/Config");
const Repeater_1 = require("../Services/Repeater/Repeater");
const Sensors_1 = require("../Sensors");
const Leds_1 = require("../Leds");
const moq_ts_1 = require("moq.ts");
const IoC = new inversify_1.Container();
exports.IoC = IoC;
try {
    IoC.bind(Types_1.Types.IEnvironment).to(Environment_1.Environment).inSingletonScope().whenTargetIsDefault();
    IoC.bind(Types_1.Types.IRunMode).to(RunMode_1.RunMode).inSingletonScope().whenTargetIsDefault();
    IoC.bind(Types_1.Types.ILogger).to(Logger_1.Logger).inSingletonScope().whenTargetIsDefault();
    IoC.bind(Types_1.Types.IStartupArgs).to(StartupArgs_1.StartupArgs).inSingletonScope().whenTargetIsDefault();
    IoC.bind(Types_1.Types.IDateTimeProvider).to(DateTimeProvider_1.DateTimeProvider).inTransientScope().whenTargetIsDefault();
    IoC.bind(Main_1.Main).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind(Repeater_1.Repeater).toSelf().inTransientScope().whenTargetIsDefault();
    IoC.bind(Config_1.Config).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind(Server_1.Server).toSelf().inSingletonScope().whenTargetIsDefault();
    IoC.bind(MonkeyChallengeServer_1.MonkeyChallengeServer).toSelf().inSingletonScope().whenTargetIsDefault();
    if (process.env.PLATFORM === 'pi') {
        IoC.bind(Types_1.Types.ISensors).to(Sensors_1.Sensors).inSingletonScope().whenTargetIsDefault();
        IoC.bind(Types_1.Types.ILeds).to(Leds_1.Leds).inSingletonScope().whenTargetIsDefault();
    }
    else if (process.env.PLATFORM === 'pc') {
        console.log('!!! YOU ARE IN A TEST MODE (PLATFORM=pc): SENSORS AND LEDS ARE NOT AVAILABLE HERE !!!');
        const s = (new moq_ts_1.Mock());
        s.setup(x => x.SensorAChange(moq_ts_1.It.IsAny())).returns(0);
        s.setup(x => x.SensorBChange(moq_ts_1.It.IsAny())).returns(0);
        s.setup(x => x.Sensor1State).returns(-1);
        s.setup(x => x.Sensor2State).returns(-1);
        IoC.bind(Types_1.Types.ISensors).toConstantValue(s.object());
        const ledsMock = new moq_ts_1.Mock();
        IoC.bind(Types_1.Types.ILeds).toConstantValue(ledsMock.object());
    }
    else
        console.log('!!! PLATFORM NOT SELECTED. PLEASE CHOOSE pi OR pc IN .env FILE !!!');
}
catch (ex) {
    console.log('IoC exception:', ex);
}
//# sourceMappingURL=IoC.js.map