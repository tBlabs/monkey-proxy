import { Gpio } from 'onoff';
import { injectable } from 'inversify';

@injectable()
export class Lasers
{
    private sensorAChangeCallback;
    private sensorBChangeCallback;

    private button1 = new Gpio(24, 'in', 'both', { debounceTimeout: 10 });
    private button2 = new Gpio(25, 'in', 'both', { debounceTimeout: 10 });
    
    constructor()
    {
        this.button1.watch((err, value) =>
        {
            if (err) throw err;
            
            this.sensorAChangeCallback?.(value);        
        });
        this.button2.watch((err, value) =>
        {
            if (err) throw err;
            
                      
        });
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