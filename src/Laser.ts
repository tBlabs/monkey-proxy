import { Driver } from "./Driver";
import { injectable } from "inversify";

@injectable()
export class Laser
{
    private onStateChange?: (state: boolean) => void;

    public OnStateChange(callback: (state: boolean) => void): void
    {
        this.onStateChange = callback;
    }

    constructor(private _driver: Driver)
    {
        let state = false;
        let oldState = !state;

        this._driver.IO.Adc1.OnChange((adc) =>
        {
            state = this.IsLaserVisible(adc.Current.Value);

            if (state != oldState)
            {
                if (this.onStateChange)
                    this.onStateChange(state);

                oldState = state;
            }
        });
    }

    private IsLaserVisible(adcValue: number): boolean
    {
        return (adcValue > 50);
    }
}
