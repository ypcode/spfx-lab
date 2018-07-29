import { ServiceKey } from "@microsoft/sp-core-library";

export interface ITimeGreetingsService {
    getGreetings() : string;
}

export class TimeGreetingsService implements ITimeGreetingsService {
    public getGreetings() : string {
        let now = new Date();
        let currentHour = now.getHours();
        let greetings = 'Hello';
        if (currentHour >= 0 && currentHour < 13) {
            greetings = "Good morning";
        } else if (currentHour >= 13 && currentHour <= 16) {
            greetings = "Good afternoon";
        } else if (currentHour > 16 && currentHour <= 23) {
            greetings = "Good evening";
        } 
        console.log(currentHour, greetings);
        return greetings;
    }
}


export const TimeGreetingsServiceKey = ServiceKey.create<ITimeGreetingsService>(
	'YPCODE:TimeGreetingsService',
	TimeGreetingsService
);