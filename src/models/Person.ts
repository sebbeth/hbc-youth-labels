export default class Person {
    public name: string = "";
    public id: string = "";
    public icons: string[] = [];
    constructor(item?: any) {
        if (!item) {
            return this;
        }
        this.name = this.parseName(item.name) ?? "";
        this.id = item.id ?? "";
    }
    
    // Parse name to remove prefered name in parentheses
    private parseName(name: string) {
        if (name.indexOf("(") !== -1) {
            const regex = /(.*)\([^)]+\)/;
            const matches = name.match(regex);
            if (matches) return matches[1];
        } else {
            return name;
        }
    }
}