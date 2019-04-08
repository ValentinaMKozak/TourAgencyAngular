
export class Order {
    public orderId: number;

    public firstName: string;
    public lastName: string;
    public dateOfBirthday: Date;
    public phoneNumber: string;
    public email: string;

    public isBiometricPassport: boolean;
    public serieAndNumberOfPassport: string;

    public isBookingRailwayTicket: boolean;
    public isBookingAviaTicket: boolean;
    public isVisaSupport: boolean;
    public isInsurance: boolean;

    public desiredHotelAccom: string;

    public tourId: number;
    public tourName: string;

    constructor(tourId: number, tourName: string) {
        this.tourId = tourId;
        this.tourName = tourName;
    }
}
