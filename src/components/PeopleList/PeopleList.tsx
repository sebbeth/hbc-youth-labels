import React from 'react';
import './PeopleList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Person from '../../models/Person';

export interface IPeopleListProps {
    people: Person[];
    selectedPersonIndex: number;
    onPersonSelect(index: number): void;
    onPersonAdd(): void;
    onPersonDelete(index: number): void;
}

const PeopleList: React.FC<IPeopleListProps> = (props) => {
    const { people, selectedPersonIndex, onPersonSelect, onPersonAdd, onPersonDelete } = props;
    return (
        <div className={"peopleList"}>
            <div className={"peopleListHeader"}>
                <h2>Labels</h2>
                {
                    selectedPersonIndex >= 0 &&
                    <button onClick={() => onPersonSelect(-1)}>Deselect</button>
                }
            </div>

            <div className={"header peopleListRow"}>
                <div>Name</div>
                <div>Icons</div>
                <div>Delete</div>
            </div>
            <div className="itemList">

                {
                    people.map(
                        (person, index) =>
                            <div
                                className={(index === selectedPersonIndex) ? "peopleListRow selected" : "peopleListRow"}
                                onClick={() => onPersonSelect(index)}
                            >
                                <div>{person.name}</div>
                                <div>
                                    {person.icons.map((icon, index) =>
                                        <FontAwesomeIcon
                                            key={index}
                                            icon={icon as IconProp}
                                            className="icon"
                                        />
                                    )}
                                </div>
                                <FontAwesomeIcon
                                    key={index}
                                    icon={"trash-alt" as IconProp}
                                    className="icon deleteButton"
                                    onClick={() => onPersonDelete(index)}
                                />
                            </div>
                    )
                }
                <div className={"peopleListRow"}>
                    <button onClick={() => onPersonAdd()}>Add Row</button>
                </div>
            </div>
        </div>
    );
}

export default PeopleList;
