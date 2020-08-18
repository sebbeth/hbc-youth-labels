import React from 'react';
import './App.css';
import Label from '../Label/Label';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import IconButton from '../IconButton/IconButton';
import { availableIcons } from '../../helpers/FontAwesome.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PeopleList from '../PeopleList/PeopleList';
import Person from '../../models/Person';
import Start from '../Start/Start';
import { addIcon, removeIcon, saveIcons } from '../../helpers/Label.helpers';
import { useMessage, usePeople, usePerson } from '../../hooks/Label.hooks';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
library.add(...availableIcons)

const defaultLineHeight: string = "34.7";

function App() {

  const { people, setPeople, loadPeople } = usePeople();
  const { selectedPerson, selectedPersonIndex, setSelectedPerson } = usePerson(people);
  const [lineHeight, setLineHeight] = React.useState<string>(defaultLineHeight);
  const { message, updateMessage } = useMessage();
  const icons = React.useMemo(() => availableIcons.map(icon => icon.iconName), []);
  function deletePerson(personIndex: number) {
    if (people.length > personIndex) {
      people.splice(personIndex, 1);
      setSelectedPerson(-1);
      setPeople([...people]);
    }
  }

  function addPerson() {
    people.push(new Person());
    setPeople([...people]);
  }

  function clearIcons() {
    people.map(person => person.icons = []);
    setPeople([...people]);
    saveIcons(people);
  }

  function onIconButtonClicked(icon: string, enabled: boolean) {

    const peopleToMutate = (selectedPersonIndex === -1)
      ? people
      : [selectedPerson];

    peopleToMutate.forEach(person => {
      const icons = person.icons;
      if (enabled) {
        addIcon(icons, icon);
      } else {
        removeIcon(icons, icon);
      }
    });
    setPeople([...people]);
    saveIcons(people);
  }

  return (
    <>
      <div className="App">
        {
          people.length === 0 ?
            <Start
              onSubmit={(file) => loadPeople(file)}
            />
            :
            <div className="editor">
              <div className="panel">
                <PeopleList
                  people={people}
                  selectedPersonIndex={selectedPersonIndex}
                  onPersonSelect={(personIndex => setSelectedPerson(personIndex))}
                  onPersonAdd={() => addPerson()}
                  onPersonDelete={(personIndex) => deletePerson(personIndex)}
                />
              </div>
              <div className="panel personPanel">
                <div className={"iconsHeader"}>{(selectedPersonIndex >= 0) ? "Add icon to selected label" : "Add icon to all labels"}</div>
                <div className="iconsGrid">
                  {
                    icons.map((icon, index) =>
                      <IconButton
                        icon={icon}
                        key={index}
                        selected={(selectedPerson.icons.filter(selectedIcon => selectedIcon === icon).length > 0)}
                        onButtonClicked={(selected) => onIconButtonClicked(icon, selected)}
                      />
                    )
                  }
                </div>
                <div>
                  <h2>Message</h2>
                  <input
                    value={message}
                    type="text"
                    className={"messageField"}
                    onChange={(e) => updateMessage(e.target.value)}
                  />
                  <FontAwesomeIcon
                    title="Reset message"
                    color={"black"}
                    icon={faUndo}
                    className={"resetButton"}
                    onClick={() => updateMessage(null)}
                    size={"lg"}
                  />
                </div>
                {
                  (people.length > 0) &&
                  <div>
                    <h2>Preview</h2>
                    <div className={"previewBox"}>
                      <Label
                        name={selectedPerson.name}
                        height={parseFloat(lineHeight)}
                        message={message}
                        icons={selectedPerson.icons}
                      />
                    </div>
                  </div>
                }
              </div>
            </div>
        }
        <div className="footer">
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/sebbeth/hbc-youth-labels"><FontAwesomeIcon title="View code" color={"black"} icon={faGithub} size={"lg"} /></a>
          {
            people.length > 0 &&
            <div className="footer-items">
              <button onClick={() => clearIcons()} className="" >Clear Icons</button>

              <button onClick={() => setPeople([])} className="" >Start Again</button>
              <div className={"optionLine"}>
                Label height (mm):
          <input value={lineHeight} type="text" onChange={(e) => setLineHeight(e.target.value)} />
              </div>
              <button onClick={() => window.print()} className="button" >Print</button>
            </div>
          }
        </div>
      </div>
      <div className="toPrint">
        {
          (people.length > 0) ?
            people.map((person, index) => {
              return (<Label
                key={index}
                name={person.name}
                message={message}
                height={parseFloat(lineHeight)}
                icons={person.icons} />)
            })

            :
            <div>Nothing to print :/</div>
        }
      </div>
    </>
  );
}

export default App;
