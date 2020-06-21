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
const inversify_1 = require("inversify");
const MonkeyChallengeServer_1 = require("./MonkeyChallengeServer");
const Types_1 = require("./IoC/Types");
const Config_1 = require("./Services/Config/Config");
const HelpBuilder_1 = require("./HelpBuilder");
const Server_1 = require("./Server");
let Main = class Main {
    constructor(_config, _server, _monkeyChallengeServer, _leds, _sensors) {
        this._config = _config;
        this._server = _server;
        this._monkeyChallengeServer = _monkeyChallengeServer;
        this._leds = _leds;
        this._sensors = _sensors;
    }
    async Start() {
        this._config.Load();
        // this._config.MonkeyId="Monkey1";
        // this._config.MonkeyServer="http://localhost:4000";
        // this._config.Save();
        this._server.OnQuery('/', (req, res) => {
            const help = new HelpBuilder_1.HelpBuilder("MonkeyChallenge.Driver")
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
        this._server.OnCommand('/reconnect', (params) => {
            this._monkeyChallengeServer.Connect(this._config.MonkeyServer, this._config.MonkeyId);
        });
        this._server.Start(+process.env.PORT || 4321);
        this._monkeyChallengeServer.Connect(this._monkeyChallengeServer.ConnectionString, this._config.MonkeyId);
        this._sensors.SensorAChange(state => {
            this._leds.Led1State(state);
            this._monkeyChallengeServer.SendSensorState({ SensorA: state });
        });
        this._sensors.SensorBChange(state => {
            this._leds.Led2State(state);
            this._monkeyChallengeServer.SendSensorState({ SensorB: state });
        });
        process.on('SIGINT', () => {
            console.log('SIGINT DETECTED');
            this._sensors.Dispose();
            this._leds.Dispose();
        });
    }
};
Main = __decorate([
    inversify_1.injectable(),
    __param(3, inversify_1.inject(Types_1.Types.ILeds)),
    __param(4, inversify_1.inject(Types_1.Types.ISensors)),
    __metadata("design:paramtypes", [Config_1.Config,
        Server_1.Server,
        MonkeyChallengeServer_1.MonkeyChallengeServer, Object, Object])
], Main);
exports.Main = Main;
//# sourceMappingURL=Main.js.map