import * as SocketClient from 'socket.io-client';
import { injectable } from 'inversify';
import { Config } from './Services/Config/Config';


@injectable()
export class MonkeyChallengeServer
{
    private socketClient!: SocketIOClient.Socket;

    constructor(private _config: Config)
    { }

    public get IsConnected(): boolean
    {
        return this.socketClient?.connected;
    }
    public get ConnectionString(): string
    {
        return this._config.MonkeyServer;
    }

    public Connect(addr: string, id: string): void
    {
        if (this.socketClient?.connected) this.socketClient?.disconnect();

        const connectionString = `${addr}/monkey?id=${id}`;

        console.log('Trying to connect to ', connectionString);

        this.socketClient = SocketClient(connectionString, { rejectUnauthorized: false });

        this.socketClient.on('connect', () =>
        {
            console.log(`Connected to Monkey-Challenge-Server (${connectionString}) as ${this.socketClient.id}`);
        });

        this.socketClient.on('disconnect', () =>
        {
            console.log('Disconnected from', connectionString);
        });
    }

    public SendSensorState(state)
    {
        if (this.IsConnected)
        {
            this.socketClient.emit('update', state);
        }
    }
}
