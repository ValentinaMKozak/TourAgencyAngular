
export class Role {
    public id: string;
    public name: string;
    public normalizedName?: string;
    public concurrencyStamp?: string;

   constructor(name: string) {
        this.name = name;
   }
}

