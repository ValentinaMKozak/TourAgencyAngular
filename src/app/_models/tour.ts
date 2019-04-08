import { DailyProgram } from './dailyprogram';
import { Country } from './country';
import { Picture } from './picture';
import { Transport } from './transport';

export class Tour {
    public tourId: number;
    public tourName: string;
    public departureDate: Date;
    public numberOfDays: number;
    public price: number;
    public currency: string;
    public typeTransport?: Transport;
    public created?: Date;
    public pictureUrl?: string;
    public pictures?: Picture[];
    public dailyPrograms?: DailyProgram[];
    public countries?: Country[];

    constructor(tourName: string, departureDate: Date, numberOfDays: number,  price: number, currency: string) {
        this.tourName = tourName;
        this.departureDate = departureDate;
        this.numberOfDays = numberOfDays;
        this.price = price;
        this.currency = currency;
    }
}
