import { injectable } from "inversify";
import * as fs from 'fs';
import * as path from 'path';

export class ConfigFile
{
    public MonkeyId: string = "";
    public MonkeyChallengeServerAddr: string = "";
}

@injectable()
export class Config
{
    private ConfigFileDir = path.join(process.env.CONFIG_FILE_DIR || "", 'MonkeyChallengeDriver.config');
    private config: ConfigFile = new ConfigFile();

    public Load()
    {
        if (fs.existsSync(this.ConfigFileDir))
        {
            const configAsText = fs.readFileSync(this.ConfigFileDir, 'utf8');

            try
            {
                this.config = JSON.parse(configAsText);
            }
            catch (error)
            {
                console.log(`Config file is invalid. Creating new one...`);
                this.config = new ConfigFile();
                this.Save();
            }
        }
        else 
        {
            console.log(`Config file "${this.ConfigFileDir}" not exists. Creating empty one...`);
            this.config = new ConfigFile();
            this.Save();
        }

        console.log('Config from "' + this.ConfigFileDir + '" file:', this.config);
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