import { injectable } from "inversify";

@injectable()
export class Repeater
{
    public EverySecond(callback)
    {
        let i = 0;
        setInterval(() =>
        {
            callback(i);
            i++;
        }, 1000);
    }

    public Every100Ms(callback)
    {
        let i = 0;
        setInterval(() =>
        {
            callback(i);
            i++;
        }, 100);
    }
}