import React from 'react';
import './App.css';
import { mockNames } from '../../helpers/MockData';
import Label from '../Label/Label';
import { library, IconProp, findIconDefinition } from '@fortawesome/fontawesome-svg-core'
import IconButton from '../IconButton/IconButton';
import { faCheckSquare, faCoffee, faRocket, faStar, faAddressBook, faAd, faAlignCenter, faAllergies, faAngry, faAtom } from '@fortawesome/free-solid-svg-icons'
const availableIcons = [faCheckSquare, faCoffee, faRocket, faStar, faAddressBook, faAd, faAlignCenter, faAllergies, faAngry, faAtom];
library.add(...availableIcons)
function App() {

  const [names, setNames] = React.useState<string[]>(mockNames);
  const [selectedIcons, setSelectedIcons] = React.useState<string[]>([]);
  const fileInputRef = React.createRef<HTMLInputElement>();
  const icons = availableIcons.map(icon => icon.iconName);
  function submit() {
    if (fileInputRef.current?.files?.length === 1) {
      const file = fileInputRef.current?.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          let contents = event.target.result?.toString().replace(/"/g, '');
          const lines = contents?.split('\n'); // TODO get prefered names
          lines?.splice(0, 1); // Ignore the first line
          if (lines) setNames(lines);

        }
      }
      reader.readAsText(file);
    }
  }

  function onIconButtonClicked(icon: string, enabled: boolean) {
    const newSelected = [...selectedIcons];
    if (enabled) {
      newSelected.push(icon);
      setSelectedIcons(newSelected);
    } else {
      newSelected.splice(newSelected.indexOf(icon), 1);
    }
    setSelectedIcons(newSelected);


  }

  function print() {
    window.print();
  }

  return (
    <div>
      <div className="App">
        <div>
          Drop file here
      </div>
        <div>
          <input type="file" ref={fileInputRef} />
          <button onClick={() => submit()}>Submit</button>
        </div>
        <div className="iconsGrid">
          {
            icons.map((icon, index) =>
              <IconButton
                icon={icon}
                key={index}
                selected={(selectedIcons.filter(selectedIcon => selectedIcon === icon).length > 0)}
                onButtonClicked={(selected) => onIconButtonClicked(icon, selected)}
              />
            )
          }
        </div>
        <button onClick={() => setSelectedIcons([])}>Clear</button>
        {
          (names.length > 0) &&
          <>
            <div className="previewHeading">
              Preview
          </div>
            <div className={"previewBox"}>
              <Label name={names[0]} icons={selectedIcons} />
            </div>
            <button onClick={() => print()} className="printButton" >Print</button>

          </>
        }
      </div>
      <div className="toPrint">
        {
          (names.length > 0) ?
            names.map((name, index) => {
              return (<Label key={index} name={name} icons={selectedIcons} />)
            })

            :
            <div>Nothing to print :/</div>
        }
      </div>
    </div>
  );
}

export default App;
