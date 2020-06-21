import { injectable, inject } from 'inversify';
import { MonkeyChallengeServer } from './MonkeyChallengeServer';
import { Sensors, ISensors } from './Sensors';
import { Leds, ILeds } from './Leds';
import { Types } from './IoC/Types';
import { Config } from './Services/Config/Config';
import { HelpBuilder } from './HelpBuilder';
import { Server } from './Server';

@injectable()
export class Main
{
    constructor(
        private _config: Config,
        private _server: Server,
        private _monkeyChallengeServer: MonkeyChallengeServer,
        @inject(Types.ILeds) private _leds: ILeds,
        @inject(Types.ISensors) private _sensors: ISensors)
    { }

    public async Start(): Promise<void>
    {
        this._config.Load();
        // this._config.MonkeyId="Monkey1";
        // this._config.MonkeyServer="http://localhost:4000";
        // this._config.Save();

        this._server.OnQuery('/', (req, res) =>
        {
            const help = new HelpBuilder("MonkeyChallenge.Driver")
                .Glossary("MCS", "Monkey Challenge Server")
                .Glossary("MID", "Monkey ID - should be unique for every driver")
                .Config("MID (from config file)", this._config.MonkeyId, "empty string", "Monkey1")
                .Config("MCS (from config file)", this._config.MonkeyServer, "empty string", "http://server.addr")
                .Config("Platform (from env)", process.env.PLATFORM, "undefined", "pc (for PC) / pi (for Raspberry Pi)")
                .Config("Mode (from env)", process.env.MODE, "undefined", "dev / stage / test / prod")
                .Config("Config file dir (from env)", process.env.CONFIG_FILE_DIR, "undefined", "~/MonkeyChallengeDriver.config")
                .Status(`MCS (${this._config.MonkeyServer ? this._config.MonkeyServer : "not set"})`, () => this._monkeyChallengeServer.IsConnected ? "Connected as " + this._config.MonkeyId : "Not connected")
                .Status(`Sensor A`, () => this._sensors.Sensor1State.toString())
                .Status(`Sensor B`, () => this._sensors.Sensor2State.toString())
                .Api('/reconnect', `Connect to another MCS defined in config (/set commands)`)
                .Api('/set/id/:newId', `Change MID permanently`)
                .Api('/set/server/:addr', ` Change MCS address permanently. User ! for a / sign. Then call /reconnect`);

            res.send(help.ToString());
        });

        this._server.OnCommand('/set/id/:newId', params => this._config.MonkeyId = params.newId);
        this._server.OnCommand('/set/server/:addr', params => this._config.MonkeyServer = params.addr.replace(/!/g, "/"));

        this._server.OnCommand('/reconnect', (params) =>
        {
            this._monkeyChallengeServer.Connect(this._config.MonkeyServer, this._config.MonkeyId);
        });

        this._server.Start(+process.env.PORT || 4321);

        this._monkeyChallengeServer.Connect(this._monkeyChallengeServer.ConnectionString, this._config.MonkeyId);


        this._sensors.SensorAChange(state =>
        {
            this._leds.Led1State(state);

            this._monkeyChallengeServer.SendSensorState({ SensorA: state });
        });

        this._sensors.SensorBChange(state =>
        {
            this._leds.Led2State(state);

            this._monkeyChallengeServer.SendSensorState({ SensorB: state });
        });

        process.on('SIGINT', () =>
        {
            console.log('SIGINT DETECTED');
            this._sensors.Dispose();
            this._leds.Dispose();
        });
    }
}
