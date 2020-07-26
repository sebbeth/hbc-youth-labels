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
library.add(...availableIcons)

function App() {

  const [people, setPeople] = React.useState<Person[]>((window.location.href.includes("localhost")) ? mockPeople : []);
  const [selectedPerson, setSelectedPerson] = React.useState<number>(-1);
  const [lineHeight, setLineHeight] = React.useState<string>("34.7");
  const fileInputRef = React.createRef<HTMLInputElement>();
  const icons = availableIcons.map(icon => icon.iconName);


  // React.useEffect(() => {
  //   // const p = people.find((person) => person.id === selectedPerson.id);
  //   setPeople([...people]);
  // },[selectedPerson])

  function submit() {
    if (fileInputRef.current?.files?.length === 1) {
      const file = fileInputRef.current?.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          // TODO lift to helper method
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
          if (people) setPeople(people);
        }
      }
      reader.readAsText(file);
    }
  }

  function setIcons(icons: string[]) {
  }

  function getSelectedPerson() {
    if (selectedPerson >= 0) {
      return people[selectedPerson];
    }
    return new Person();
  }


  function onIconButtonClicked(icon: string, enabled: boolean) {
    console.log(icon, enabled);
    const person = getSelectedPerson();
    if (person !== null) {
      const icons = person.icons;
      if (enabled) {
        icons.push(icon);
      } else {
        icons.splice(icons.indexOf(icon), 1)
      }
      setPeople([...people]);
    }
  }

  return (
    <div>
      <div className="App">
        <div className="optionsPanel">
          <h2>
            HBC Youth Labels
        </h2>
          <div>
            <span>Export <a href="https://hbc.elvanto.com.au/report/?id=d518fd62-9ee2-40d0-ac6f-c3bb35cc2803&authkey=AnyB6Hvz">this report</a> as a .csv and upload it here: </span>
            <input type="file" ref={fileInputRef} onChange={() => submit()} />
          </div>
          <div className={"optionLine"}>
            Label height (mm):
          <input value={lineHeight} type="text" onChange={(e) => setLineHeight(e.target.value)} />
          </div>
          <PeopleList
            people={people}
            onPersonSelect={(person => setSelectedPerson(people.indexOf(person)))}
          />
          {
            (people.length > 0) &&
            <>
              <h2>
                Preview
          </h2>
              <div className={"previewBox"}>
                <Label name={getSelectedPerson().name} height={parseFloat(lineHeight)} icons={getSelectedPerson().icons} />
              </div>
            </>
          }
        </div>
        <div className="iconsPanel">
          <div className={"iconsHeader"}>Select some icons:
          {
              (getSelectedPerson().icons.length > 0) &&
              <button
                className="button"
                onClick={() => setIcons([])}>
                Clear
          </button>
            }
          </div>
          <div className="iconsGrid">
            {
              icons.map((icon, index) =>
                <IconButton
                  icon={icon}
                  key={index}
                  disabled={selectedPerson === -1}
                  selected={(getSelectedPerson().icons.filter(selectedIcon => selectedIcon === icon).length > 0)}
                  onButtonClicked={(selected) => onIconButtonClicked(icon, selected)}
                />
              )
            }
          </div>
        </div>
      </div>
      <div className="footer">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/sebbeth/hbc-youth-labels"><FontAwesomeIcon title="View code" color={"black"} icon={faGithub} size={"lg"} /></a>
        <button onClick={() => setPeople([])} className="button" >Clear</button>
          <button onClick={() => window.print()} className="button" >Print</button>
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
    </div>
  );
}

/**
 * returns the icons object from localStorage
 */
function getIcons() {
  const iconsString = window.localStorage.getItem("icons");
  if (iconsString) {
    return JSON.parse(iconsString);
  } else {
    return [];
  }
}

export default App;
