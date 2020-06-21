"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const fs = require("fs");
const path = require("path");
class ConfigFile {
    constructor() {
        this.MonkeyId = "";
        this.MonkeyChallengeServerAddr = "";
    }
}
exports.ConfigFile = ConfigFile;
let Config = class Config {
    constructor() {
        this.ConfigFileDir = path.join(process.env.CONFIG_FILE_DIR || "", 'MonkeyChallengeDriver.config');
        this.config = new ConfigFile();
    }
    Load() {
        if (fs.existsSync(this.ConfigFileDir)) {
            const configAsText = fs.readFileSync(this.ConfigFileDir, 'utf8');
            try {
                this.config = JSON.parse(configAsText);
            }
            catch (error) {
                console.log(`Config file is invalid. Creating new one...`);
                this.config = new ConfigFile();
                this.Save();
            }
        }
        else {
            console.log(`Config file "${this.ConfigFileDir}" not exists. Creating empty one...`);
            this.config = new ConfigFile();
            this.Save();
        }
        console.log('Config from "' + this.ConfigFileDir + '" file:', this.config);
    }
    Save() {
        fs.writeFileSync(this.ConfigFileDir, JSON.stringify(this.config));
    }
    get MonkeyId() {
        return this.config.MonkeyId;
    }
    set MonkeyId(value) {
        this.config.MonkeyId = value;
        this.Save();
    }
    get MonkeyServer() {
        // https://monkey-challenge-server.herokuapp.com
        // http://localhost:4000
        return this.config.MonkeyChallengeServerAddr;
    }
    set MonkeyServer(value) {
        this.config.MonkeyChallengeServerAddr = value;
        this.Save();
    }
};
Config = __decorate([
    inversify_1.injectable()
], Config);
exports.Config = Config;
//# sourceMappingURL=Config.js.map