import * as SocketClient from 'socket.io-client';
import { injectable } from 'inversify';

@injectable()
export class MonkeyChallengeServer
{
    private readonly socketClient: SocketIOClient.Socket;

    constructor()
    {
        const monkeyChallengeServerConnectionString = process.env.SERVER + '/monkey?id=' + process.env.ID;
        // const monkeyChallengeServerConnectionString = 'https://monkey-challenge-server.herokuapp.com?clientType=monkey-proxy';
        this.socketClient = SocketClient(monkeyChallengeServerConnectionString, { rejectUnauthorized: false });

        this.socketClient.on('connect', () =>
        {                            
            console.log(`Connected to Monkey-Challenge-Server (${process.env.SERVER}) as ${this.socketClient.id}`);
        });      
        
        this.socketClient.on('disconnect', () =>
        {                            
            console.log('Disconnected from', process.env.SERVER);
        });
    }

    public SendSensorState(state)
    {
        this.socketClient.emit('update', state);
    } 
}
