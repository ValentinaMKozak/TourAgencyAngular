
export class Picture {
    pictureId: number;
    url: string;
    isMain: boolean;
    description: string;
    dateAdded?: Date;
    publicId?: string;

    constructor(url: string, isMain: boolean, description: string) {
        this.url = url;
        this.isMain = isMain;
        this.description = description;
    }
}
