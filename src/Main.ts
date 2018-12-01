import { injectable, inject } from 'inversify';
import { Types } from './IoC/Types';
import * as express from 'express';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as SocketClient from 'socket.io-client';
import * as path from 'path';
import { IStartupArgs } from './Services/Environment/IStartupArgs';
import { Repeater } from './Services/Repeater/Repeater';
import { Board, BoardSocketConnector } from 'bluepill-client-library/bin';

@injectable()
export class Main
{
    constructor(
        @inject(Types.IStartupArgs) private _args: IStartupArgs)
    { }

    private get ClientDir(): string
    {
        const s = __dirname.split(path.sep); // __dirname returns '/home/tb/projects/EventsManager/bin'. We don't wanna 'bin'...
        return s.slice(0, s.length - 1).join(path.sep) + '/client';
    }

    public async Start(): Promise<void>
    {
        const server = express();
        const httpServer = http.createServer(server);
        const socket = socketIo(httpServer);
        const bluePill = new Board(new BoardSocketConnector('http://192.168.1.102:3000'));

        const monkeyChallengeServerConnectionString = 'http://localhost:4000';
        const client = SocketClient(monkeyChallengeServerConnectionString);
        client.on('connect', () =>
        {
            console.log('Connected to Monkey-Challenge-Server as', client.id);
        });

        let oldState = 0;
        bluePill.Adc1.OnChange((adc) =>
        {
            bluePill.Display1.Value = adc.Current.Value;

            const state = (adc.Current.Value > 50) ? 1 : 0;

            if (state != oldState)
            {
                console.log(state);
                client.emit('laser', state);
                oldState = state;
            }
        })

        server.get('/ping', (req, res) => res.send('pong'));

        const port = 3000;
        httpServer.listen(port, () => console.log('SERVER STARTED @ ' + port));

        process.on('SIGINT', () =>
        {
            httpServer.close(() => console.log('SERVER CLOSED'));
        });
    }
}
