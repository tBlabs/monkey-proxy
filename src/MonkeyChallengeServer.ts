import * as SocketClient from 'socket.io-client';
import { injectable } from 'inversify';

@injectable()
export class MonkeyChallengeServer
{
    private socketClient;

    constructor()
    {
        const monkeyChallengeServerConnectionString = process.env.SERVER + '/monkey?id=' + process.env.ID;
        // const monkeyChallengeServerConnectionString = 'https://monkey-challenge-server.herokuapp.com?clientType=monkey-proxy';
        this.socketClient = SocketClient(monkeyChallengeServerConnectionString, { rejectUnauthorized: false });

        this.socketClient.on('connect', () =>
        {                            
            console.log('Connected to Monkey-Challenge-Server as', this.socketClient.id);
        });
    }

    public SendSensorState(state)
    {
        this.socketClient.emit('update', state);
    }
}
