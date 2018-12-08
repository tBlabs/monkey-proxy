import * as SocketClient from 'socket.io-client';
import { Config } from './Services/Config/Config';
import { injectable } from 'inversify';

@injectable()
export class MonkeyChallengeServer
{
    private client;

    constructor(private _config: Config)
    {
        const monkeyChallengeServerConnectionString = 'http://localhost:4000?clientType=monkey-proxy&id=' + this._config.MonkeyId;
        // const monkeyChallengeServerConnectionString = 'https://monkey-challenge-server.herokuapp.com?clientType=monkey-proxy';
        this.client = SocketClient(monkeyChallengeServerConnectionString, { rejectUnauthorized: false });

        this.client.on('connect', () =>
        {                            
            console.log('Connected to Monkey-Challenge-Server as', this.client.id);
        });
    }

    public SendSensorState(state)
    {
        this.client.emit('laser', state);
    }
}
