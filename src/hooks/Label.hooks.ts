import { loadMessageFromStorage, saveMessage, clearMessage, loadIconsFromStorage, addIconsToPeople } from "../helpers/Label.helpers";
import React from 'react';
import Person from "../models/Person";
import { mockPeople } from "../helpers/MockData";

const defaultMessage: string = "But you can call me...";
const maxCharaters = 34;

export function useMessage() {
    const storedMessage = loadMessageFromStorage();
    const [message, setMessage] = React.useState<string>(storedMessage ? storedMessage : defaultMessage);
    function updateMessage(input: string | null) {
        if (input === null) {
            clearMessage();
            setMessage(defaultMessage);
        } else {
            if (input.length <= maxCharaters) {
                saveMessage(input);
                setMessage(input);
            }
        }
    }
    return { message, updateMessage };
}

export function usePeople() {
    const [people, setPeople] = React.useState<Person[]>((window.location.href.includes("localhost")) ? mockPeople : []);

    function loadPeople(file: File) {
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target) {
                let contents = event.target.result?.toString().replace(/"/g, '');
                let lines = contents?.split('\n');
                lines?.splice(0, 1); // Ignore the first line
                lines = lines?.filter(line => line !== "");
                const people: Person[] = [];
                lines?.forEach(line => {
                    const columns = line.split(',');
                    if (columns.length >= 2) {
                        const person = new Person({ name: columns[0], id: columns[1] });
                        people.push(person);
                    }
                });
                const peopleWithIcons = loadIconsFromStorage();
                if (peopleWithIcons) {
                    addIconsToPeople(people, peopleWithIcons);
                }
                setPeople([...people]);

            }
        }
        reader.readAsText(file);
    }
    return { people, setPeople, loadPeople };
}

export function usePerson(people: Person[]) {
    const [selectedPersonIndex, setSelectedPersonIndex] = React.useState<number>(-1);
    React.useEffect(() => {
        // If the people array has been nulled or selectedPersonIndex is out of bounds set selectedPersonIndex to -1
        if (people === null || people.length <= selectedPersonIndex) {
            setSelectedPersonIndex(-1);
        }
    }, [people, selectedPersonIndex])

    const selectedPerson = React.useMemo(() => {
        if (people.length > selectedPersonIndex && selectedPersonIndex >= 0) {
            return people[selectedPersonIndex];
        }
        return new Person();
    }, [selectedPersonIndex, people]);

    function setSelectedPerson(index: number) {
        setSelectedPersonIndex(index);
    }
    return { selectedPerson, selectedPersonIndex, setSelectedPerson };
}