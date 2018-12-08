import { injectable } from "inversify";

@injectable() 
export class Config
{
    public get MonkeyId(): string
    {
        return "Monkey1";
    }
}