import { Gpio, BinaryValue } from 'onoff';
import { injectable } from 'inversify';

export interface ILeds
{
    Led1State(state: 0 | 1);
    Led1Toggle();
    Led1On();
    Led1Off();
    Led2State(state: 0 | 1);
    Led2Toggle();
    Led2On();
    Led2Off();
    Dispose();
}

@injectable()
export class Leds implements ILeds
{
    private readonly led1: Gpio;
    private readonly led2: Gpio;

    constructor()
    {
        this.led1 = new Gpio(20, 'out');
        this.led2 = new Gpio(21, 'out');
    }

    public Led1State(state: 0 | 1)
    {
        this.led1.writeSync(state);
    }

    public Led1Toggle()
    {
        this.led1.writeSync(this.led1.readSync() ^ 1);
    }

    public Led1On()
    {
        this.led1.writeSync(1);
    }


    public Led1Off()
    {
        this.led1.writeSync(0);
    }

    public Led2State(state: 0 | 1)
    {
        this.led2.writeSync(state);
    }

    public Led2Toggle()
    {
        this.led2.writeSync(this.led2.readSync() ^ 1);
    }

    public Led2On()
    {
        this.led2.writeSync(1);
    }


    public Led2Off()
    {
        this.led2.writeSync(0);
    }

    public Dispose()
    {
        this.led1.unexport();
        this.led2.unexport();
    }
}