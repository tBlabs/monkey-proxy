import { injectable, inject } from 'inversify';
import { MonkeyChallengeServer } from './MonkeyChallengeServer';
import { Sensors, ISensors } from './Sensors';
import { Leds, ILeds } from './Leds';
import { Types } from './IoC/Types';
import * as express from 'express';
import * as cors from 'cors';
import { Config } from './Services/Config/Config';

@injectable()
export class Server
{
    private server;

    constructor()
    {
        this.server = express();
        this.server.use(cors());

        this.server.get('/ping', (req, res) => res.send('pong'));
    }

    public Start(port: number)
    {
        this.server.listen(port, () => console.log(`Monkey-Challenge-Driver server started @ http://localhost:${port}`));
    }

    public OnCommand(url, callback: (urlParams) => void)
    {
        this.server.get(url, (req, res) =>
        {
            callback(req.params);

            res.sendStatus(200);
        });
    }

    public OnQuery(url, callback: (req, res) => void)
    {
        this.server.get(url, (req, res) =>
        {
            callback(req, res);
        });
    }
}

export class HelpBuilder
{

}

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
            // const help = new HelpBuilder();

            // help.AppName("MonkeyChallenge.Driver");
            // help.Definition("MCS", "Monkey Challenge Server");
            // help.Status(`Connection to Monkey-Challenge-Server (${this._monkeyChallengeServer.ConnectionString})`, this._monkeyChallengeServer.IsConnected);
            // help.Api('/reconnect', `connect to another Monkey-Challenge-Server defined in config (/set commands)`)

            let r = `Welcom to MonkeyChallenge.Driver. This driver id is <b>${this._config.MonkeyId}</b>`;
            r += '<br><br>';
            r += `Connection to Monkey-Challenge-Server (${this._monkeyChallengeServer.ConnectionString}) status: ${this._monkeyChallengeServer.IsConnected ? "connected":"not connected"}`;
            r += '<br>';
            r += `Sensors state: ${this._sensors.StateAsString}`;
            r += '<br><br>';
            r += `Use <b>/reconnect</b> to connect to another Monkey-Challenge-Server defined in config (/set commands)<br>`;
            r += `Use <b>/set/id/:newId</b> to change this driver id permanently<br>`;
            r += `Use <b>/set/server/:addr</b> to change Monkey-Challenge-Server address permanently. User ! for a / sign. Then call /reconnect`;

            // res.send(help.ToString());
            res.send(r);
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
