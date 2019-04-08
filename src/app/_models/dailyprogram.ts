
export class DailyProgram {
    dailyProgramId: number;
    theme: string;
    description: string;
    tourId: number;

    constructor(theme: string, description: string, tourId: number) {
        this.theme = theme;
        this.description = description;
        this.tourId = tourId;
    }
}
