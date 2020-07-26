export default class Person {
    public name: string = "";
    public id: string = "";
    public icons: string[] = [];
    constructor(item?: any) {
        if (!item) {
            return this;
        }
        this.name = item.name ?? "";
        this.id = item.id ?? "";
    }
}