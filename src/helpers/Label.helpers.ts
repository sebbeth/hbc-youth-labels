import Person from "../models/Person";


export function addIcon(icons: string[], icon: string) {
    if (!icons.includes(icon) && icons.length < 11)
        icons.push(icon);
    return icons;
}

export function removeIcon(icons: string[], icon: string) {
    icons.splice(icons.indexOf(icon), 1)
    return icons;
}

export function saveIcons(people: Person[]) {
    window.localStorage.setItem("hbc-youth-label-icons", JSON.stringify(people));
}

export function addIconsToPeople(people: Person[], iconPeople: Person[]) {
    for (let i = 0; i < people.length; i++) {
        const person = people[i];
        const iconPerson = iconPeople.find(p => p.id === person.id);
        if (iconPerson) {
            person.icons = iconPerson.icons;
        }
    }
    return people;
}

export function loadIconsFromStorage() {
    try {
        const json = window.localStorage.getItem("hbc-youth-label-icons");
        if (!json) {
            return null;
        }
        const items = JSON.parse(json) as any[];
        const people = items.map(item => item as Person);
        return people;
    } catch (error) {
        console.error(error);
        return null;
    }
}