import { injectable } from 'inversify';
import { Laser } from './Laser';
import { MonkeyChallengeServer } from './MonkeyChallengeServer';
import { Recorder } from './Services/Recorder/Recorder';
import { Display } from './Display';
import { Gpio } from 'onoff';
import { Lasers } from './Lasers';

@injectable()
export class Main
{
    constructor(
        private _lasers: Lasers,
        private _server: MonkeyChallengeServer)
    { }

    public async Start(): Promise<void>
    {
        const led1 = new Gpio(17, 'out');
        const led2 = new Gpio(18, 'out');
       
        setInterval(() =>
        {
            led1.writeSync(led1.readSync() ^ 1);
            //  this._monkeyChallengeServer.SendSensorState(state);
        }, 1000);

        this._lasers.SensorAChange(state =>
        {
            this._server.SendSensorState({ SensorA: state });
        });

        this._lasers.SensorBChange(state =>
        {
            led2.writeSync(state);
            
            this._server.SendSensorState({ SensorB: state });
        });

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
            this._lasers.Dispose();

            // connector.Disconnect();
        });
        console.log('MONKEY-PROXY STARTED');
    }
}
