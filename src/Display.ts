import { injectable } from "inversify";
import { Driver } from "./Driver";
import { Repeater } from "./Services/Repeater/Repeater";

@injectable()
export class Display
{
    private t = 0;
    public set Value(val: number)
    {
        this._driver.IO.Display1.Value = val;
    }

    constructor(
        private _driver: Driver,
        private _repeater: Repeater)
    {
        this._driver.IO.Display1.Value = 0;
        this._driver.IO.Display1.Dot = 2;
        this._driver.IO.Pwm1.Value = 990;

        this._repeater.Every100Ms(() =>
        {
            if (this.oldState)
            {
                this._driver.IO.Display1.Value = this.t++;
            }
        });
    }

    private state = false;
    private oldState = false;
    public Timer(state: boolean): any
    {
        if (state !== this.oldState)
        {
            this.t = 0;

            this.SetBacklight(state);
            
            this.oldState = state;
        }
    }
    
    private backlightTimeoutHandler;
    
    private SetBacklight(state)
    {
        if (state)
        {
            this._driver.IO.Pwm1.Value = 90;

            clearTimeout(this.backlightTimeoutHandler);
        }
        else
        {
            this.backlightTimeoutHandler = setTimeout(() =>
            {
                this._driver.IO.Pwm1.Value = 990;
            }, 3000);
        }
    }
}