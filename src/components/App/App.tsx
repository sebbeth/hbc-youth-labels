import React from 'react';
import './App.css';
import { mockNames } from '../../helpers/MockData';
import Label from '../Label/Label';
import { library, IconProp, findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'
import IconButton from '../IconButton/IconButton';
import { availableIcons } from '../../helpers/FontAwesome.helper';
library.add(...availableIcons)

function App() {

  const [names, setNames] = React.useState<string[]>([]);
  const [lineHeight, setLineHeight] = React.useState<string>("34.7");
  const [selectedIcons, setSelectedIcons] = React.useState<string[]>(getIcons());
  const fileInputRef = React.createRef<HTMLInputElement>();
  const icons = availableIcons.map(icon => icon.iconName);
  function submit() {
    if (fileInputRef.current?.files?.length === 1) {
      const file = fileInputRef.current?.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          let contents = event.target.result?.toString().replace(/"/g, '');
          const lines = contents?.split('\n');
          lines?.splice(0, 1); // Ignore the first line
          if (lines) setNames(lines);
        }
      }
      reader.readAsText(file);
    }
  }

  function setIcons(icons: string[]) {
    window.localStorage.setItem("icons", JSON.stringify(icons));
    setSelectedIcons(icons);
  }

  function onIconButtonClicked(icon: string, enabled: boolean) {
    const newSelected = [...selectedIcons];
    if (enabled) {
      newSelected.push(icon);
      setIcons(newSelected);
    } else {
      newSelected.splice(newSelected.indexOf(icon), 1);
    }
    setIcons(newSelected);


  }

  return (
    <div>
      <div className="App">
        <div className="app-heading">
          Export <a href="https://hbc.elvanto.com.au/report/?id=d518fd62-9ee2-40d0-ac6f-c3bb35cc2803&authkey=AnyB6Hvz">This Report</a> as a .csv and upload it here:
      </div>
        <div>
          <input type="file" ref={fileInputRef} />
          <button className="button" onClick={() => submit()}>Submit</button>
        </div>
        <div>
          Label height (mm):
          <input value={lineHeight} type="text" onChange={(e) => setLineHeight(e.target.value)} />
        </div>
        <div className="app-heading">
          Select some icons:
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
        {
          (selectedIcons.length > 0) &&
          <button
            className="button"
            onClick={() => setIcons([])}>
            Clear
          </button>
        }
        {
          (names.length > 0) &&
          <>
            <div className="previewHeading">
              Preview
          </div>
            <div className={"previewBox"}>
              <Label name={names[0]} height={parseFloat(lineHeight)} icons={selectedIcons} />
            </div>
            <button onClick={() => window.print()} className="button printButton" >Print</button>
          </>
        }
      </div>
      <div className="toPrint">
        {
          (names.length > 0) ?
            names.map((name, index) => {
              return (<Label key={index} name={name} height={parseFloat(lineHeight)} icons={selectedIcons} />)
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
