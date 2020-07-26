import React from 'react';
import './PeopleList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Person from '../../models/Person';

export interface IPeopleListProps {
    people: Person[];
    onPersonSelect(person: Person): void;
}

const PeopleList: React.FC<IPeopleListProps> = (props) => {
    const { people, onPersonSelect } = props;
    return (
        <div className={"peopleList"}>
            {
                people.map(
                    (person, index) =>
                        <div
                            className="peopleListRow"
                            onClick={() => onPersonSelect(person)}
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
                        </div>
                )
            }
        </div>
    );
}

export default PeopleList;
