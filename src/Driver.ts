import { injectable } from 'inversify';
import 'reflect-metadata';
import { Board, BoardSocketConnector } from 'bluepill-client-library/bin';
import { IBoardConnector } from 'bluepill-client-library/bin/Connectors/IBoardConnector';

@injectable()
export class Driver
{
    public readonly IO: Board;
    public readonly Connector: IBoardConnector;

    constructor()
    {
        this.Connector = new BoardSocketConnector('http://192.168.1.102:3000');

        this.IO = new Board(this.Connector);
    }
}
