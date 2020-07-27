import React from 'react';
import './App.css';
import { mockPeople } from '../../helpers/MockData';
import Label from '../Label/Label';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import IconButton from '../IconButton/IconButton';
import { availableIcons } from '../../helpers/FontAwesome.helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PeopleList from '../PeopleList/PeopleList';
import Person from '../../models/Person';
import Start from '../Start/Start';
import { addIcon, removeIcon, saveIcons, loadIconsFromStorage, addIconsToPeople } from '../../helpers/Label.helpers';
library.add(...availableIcons)

function App() {

  const [people, setPeople] = React.useState<Person[]>((window.location.href.includes("localhost")) ? mockPeople : []);
  const [selectedPerson, setSelectedPerson] = React.useState<number>(-1);
  const [lineHeight, setLineHeight] = React.useState<string>("34.7");
  const icons = availableIcons.map(icon => icon.iconName);
  React.useEffect(() => {
  }, [people]);

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

  function getSelectedPerson() {
    if (people.length > selectedPerson && selectedPerson >= 0) {
      return people[selectedPerson];
    }
    return new Person();
  }
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

    const selected = getSelectedPerson();
    const peopleToMutate = (selectedPerson === -1)
      ? people
      : [selected];

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
                  selectedPerson={selectedPerson}
                  onPersonSelect={(personIndex => setSelectedPerson(personIndex))}
                  onPersonAdd={() => addPerson()}
                  onPersonDelete={(personIndex) => deletePerson(personIndex)}
                />
              </div>
              <div className="panel personPanel">
                <div className={"iconsHeader"}>{(selectedPerson >= 0) ? "Add icon to selected label" : "Add icon to all labels"}</div>
                <div className="iconsGrid">
                  {
                    icons.map((icon, index) =>
                      <IconButton
                        icon={icon}
                        key={index}
                        selected={(getSelectedPerson().icons.filter(selectedIcon => selectedIcon === icon).length > 0)}
                        onButtonClicked={(selected) => onIconButtonClicked(icon, selected)}
                      />
                    )
                  }
                </div>
                {
                  (people.length > 0) &&
                  <div>
                    <h2>Preview</h2>
                    <div className={"previewBox"}>
                      <Label name={getSelectedPerson().name} height={parseFloat(lineHeight)} icons={getSelectedPerson().icons} />
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
              return (<Label key={index} name={person.name} height={parseFloat(lineHeight)} icons={person.icons} />)
            })

            :
            <div>Nothing to print :/</div>
        }
      </div>
    </>
  );
}

export default App;
