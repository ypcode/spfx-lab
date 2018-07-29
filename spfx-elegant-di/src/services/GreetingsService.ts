import { ServiceKey } from "@microsoft/sp-core-library";
import { ITimeGreetingsService, TimeGreetingsServiceKey } from "./TimeGreetingsService";
import { inject } from "../di/DependenciesManager";

export interface IGreetingsService {
    sayHello(who: string) : string;
    getBackgroundColor() : string;
}

export class GreetingsService implements IGreetingsService {
    @inject(TimeGreetingsServiceKey)
    private timeGreetingsService: ITimeGreetingsService;

    public sayHello(who: string) : string {
        let greetings = this.timeGreetingsService.getGreetings();
        return `${greetings} ${who}`;
    }

    public getBackgroundColor() : string {
        return 'red';
    }
}

export const GreetingsServiceKey = ServiceKey.create<IGreetingsService>(
	'YPCODE:GreetingsService',
	GreetingsService
);