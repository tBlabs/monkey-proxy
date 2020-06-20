import { injectable } from "inversify";
import * as fs from 'fs';
import * as path from 'path';

export interface ConfigFile
{
    MonkeyId: string;
    MonkeyChallengeServerAddr: string;
}

@injectable()
export class Config
{
    private ConfigFileDir = path.join(process.env.CONFIG_FILE_DIR || "", 'MonkeyChallengeDriver.config');
    private config: ConfigFile = { MonkeyId: "", MonkeyChallengeServerAddr: "" };

    public Load()
    {
        if (fs.existsSync(this.ConfigFileDir))
        {
            this.config = JSON.parse(fs.readFileSync(this.ConfigFileDir, 'utf8'));
            console.log('Config', this.config);
        }
        else console.log(`Config file "${this.ConfigFileDir}" not exists`);
    }

    public Save()
    {
        fs.writeFileSync(this.ConfigFileDir, JSON.stringify(this.config));
    }

    public get MonkeyId(): string
    {
        return this.config.MonkeyId;
    }

    public set MonkeyId(value: string)
    {
        this.config.MonkeyId = value; 

        this.Save();
    }

    public get MonkeyServer(): string
    {
        // https://monkey-challenge-server.herokuapp.com
        // http://localhost:4000
        return this.config.MonkeyChallengeServerAddr;
    }

    public set MonkeyServer(value: string)
    {
        this.config.MonkeyChallengeServerAddr = value;

        this.Save();
    }
}