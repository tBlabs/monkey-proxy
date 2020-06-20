import { Gpio, BinaryValue } from 'onoff';
import { injectable } from 'inversify';

export interface ISensors
{
    StateAsString: string;
    SensorAChange(callback);
    SensorBChange(callback);
    Dispose();
}

@injectable()
export class Sensors implements ISensors
{
    private sensorAChangeCallback;
    private sensorBChangeCallback;

    private button1 = new Gpio(24, 'in', 'both', { debounceTimeout: 10 });
    private button2 = new Gpio(25, 'in', 'both', { debounceTimeout: 10 });

    constructor()
    {
        this.button1.watch((err, value: BinaryValue) =>
        {
            if (err) throw err;

            this.sensorAChangeCallback?.(value);
        });

        this.button2.watch((err, value: BinaryValue) =>
        {
            if (err) throw err;

            this.sensorBChangeCallback?.(value);
        });
    }
    public get StateAsString(): string
    {
        return "A: " + this.button1.readSync() ? "1" : "0"
            + "B: " + this.button2.readSync() ? "1" : "0";
    }

    public SensorAChange(callback)
    {
        this.sensorAChangeCallback = callback;
    }

    public SensorBChange(callback)
    {
        this.sensorBChangeCallback = callback;
    }

    public Dispose()
    {
        this.button1.unexport();
        this.button2.unexport();
    }
}