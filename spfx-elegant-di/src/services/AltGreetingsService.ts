import { IGreetingsService } from "./GreetingsService";

export class AltGreetingsService implements IGreetingsService {

    public sayHello(who: string) : string {
        return `Hello ${who.toUpperCase()}`;
    }

    public getBackgroundColor() : string {
        return 'green';
    }
}
