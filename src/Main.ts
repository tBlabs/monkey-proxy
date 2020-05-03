import { injectable } from 'inversify';
import { Laser } from './Laser';
import { MonkeyChallengeServer } from './MonkeyChallengeServer';
import { Recorder } from './Services/Recorder/Recorder';
import { Display } from './Display';
import { Gpio } from 'onoff';

@injectable()
export class Main
{
    constructor(
        private _laser: Laser,
        private _display: Display,
        private _recorder: Recorder,
        private _monkeyChallengeServer: MonkeyChallengeServer)
    { }

    public async Start(): Promise<void>
    {
        const led1 = new Gpio(17, 'out');
        const led2 = new Gpio(18, 'out');
        let state = 0;
        const button1 = new Gpio(24, 'in', 'rising', { debounceTimeout: 10 });
        const button2 = new Gpio(25, 'in', 'rising', { debounceTimeout: 10 });

        button1.watch((err, value) =>
        {
            if (err)
            {
                throw err;
            }

            led1.writeSync(led1.readSync() ^ 1);
        });
        button2.watch((err, value) =>
        {
            if (err)
            {
                throw err;
            }

            led2.writeSync(led2.readSync() ^ 1);

        });

        setInterval(() =>
        {
            // led1.writeSync(led1.readSync() ^ 1);
            //  led2.writeSync(led2.readSync() ^ 1);

            state = 1 - state;

            //  this._monkeyChallengeServer.SendSensorState(state);
        }, 1000);

        // this._laser.OnStateChange(state =>
        // {
        //     this._monkeyChallengeServer.SendSensorState(state);
        //     this._recorder.Record(state);
        //     this._display.Timer(state);
        // });

        process.on('SIGINT', () =>
        {
            console.log('SIGINT DETECTED');
            led1.unexport();
            led2.unexport();
            button1.unexport();
            button2.unexport();
            // connector.Disconnect();
        });
        console.log('MONKEY-PROXY STARTED');
    }
}
