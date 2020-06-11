import { Gpio } from 'onoff';
import { injectable } from 'inversify';

@injectable()
export class Leds
{
    private readonly led1: Gpio;
    private readonly led2: Gpio;

    constructor()
    {
        this.led1 = new Gpio(17, 'out');
        this.led2 = new Gpio(18, 'out');
    }

    public Led1Toggle()
    {
        this.led1.writeSync(this.led1.readSync() ^ 1);
    }

    public Led2Toggle()
    {
        this.led2.writeSync(this.led2.readSync() ^ 1);
    }

    public Dispose()
    {
        this.led1.unexport();
        this.led2.unexport();
    }
}