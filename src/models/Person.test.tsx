import Person from "./Person";

test('person full name is returned when no preffered name is provided', () => {
    const person = new Person({
        name: "Samuel",
        icons: [],
        id: "1"
    });
    expect(person.name).toBe("Samuel");
});

test('person preffered name is returned when a preffered name is provided', () => {
    const person = new Person({
        name: "Samuel (Sam) ",
        icons: [],
        id: "1"
    });
    expect(person.name).toBe("Sam");
});