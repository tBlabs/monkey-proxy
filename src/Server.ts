import { injectable } from 'inversify';
import * as express from 'express';
import * as cors from 'cors';

@injectable()
export class Server
{
    private server;

    constructor()
    {
        this.server = express();
        this.server.use(cors());

        this.server.get('/ping', (req, res) => res.send('pong'));
    }


    public Start(port: number)
    {
        this.server.listen(port, () => console.log(`Monkey-Challenge-Driver server started @ http://localhost:${port}`));
    }


    public OnCommand(url, callback: (urlParams) => void)
    {
        this.server.get(url, (req, res) =>
        {
            callback(req.params);

            res.sendStatus(200);
        });
    }


    public OnQuery(url, callback: (req, res) => void)
    {
        this.server.get(url, (req, res) =>
        {
            callback(req, res);
        });
    }
}
