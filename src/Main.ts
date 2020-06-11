import { injectable } from 'inversify';
import { MonkeyChallengeServer } from './MonkeyChallengeServer';
import { Lasers } from './Lasers';
import { Leds } from './Leds';

@injectable()
export class Main
{
    constructor(
        private _leds: Leds,
        private _lasers: Lasers,
        private _server: MonkeyChallengeServer)
    { }

    public async Start(): Promise<void>
    {
        this._lasers.SensorAChange(state =>
        {
            this._leds.Led1Toggle();
            
            this._server.SendSensorState({ SensorA: state });
        });

        this._lasers.SensorBChange(state =>
        {
            this._leds.Led2Toggle();

            this._server.SendSensorState({ SensorB: state });
        });

        process.on('SIGINT', () =>
        {
            console.log('SIGINT DETECTED');
            this._leds.Dispose();
            this._lasers.Dispose();
        });

        console.log('MONKEY-CHALLENGE-DRIVER STARTED');
    }
}
