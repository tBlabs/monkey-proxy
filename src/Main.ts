import { injectable } from 'inversify';
import { Laser } from './Laser';
import { MonkeyChallengeServer } from './MonkeyChallengeServer';
import { Recorder } from './Services/Recorder/Recorder';
import { Display } from './Display';

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
        this._laser.OnStateChange(state =>
        {
            this._monkeyChallengeServer.SendSensorState(state);
            this._recorder.Record(state);
            this._display.Timer(state);
        });

        // process.on('SIGINT', () =>
        // {
        //     connector.Disconnect();
        // });
        console.log('MONKEY-PROXY STARTED');
    }
}
