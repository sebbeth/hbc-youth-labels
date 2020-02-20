import React from 'react';
import './App.css';
import { mockNames } from '../../helpers/MockData';
import Label from '../Label/Label';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee, faRocket, faStar } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckSquare, faCoffee, faRocket, faStar)
function App() {

  const [names, setNames] = React.useState<String[]>(mockNames);
  const fileInputRef = React.createRef<HTMLInputElement>();

  function submit() {
    if (fileInputRef.current?.files?.length === 1) {
      const file = fileInputRef.current?.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          let contents = event.target.result?.toString().replace(/"/g, '');
          const lines = contents?.split('\n'); // TODO get prefered names
          console.log(lines);

        }
      }
      reader.readAsText(file);
    }
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
        {
          (names.length > 0) &&
          <>
            <div className="previewHeading">
              Preview
          </div>
            <div className={"previewBox"}>
              <Label name={names[0]} icons={["coffee", "rocket", "star"]} />
            </div>
            <button onClick={() => print()} className="printButton" >Print</button>

          </>
        }
      </div>
      <div className="toPrint">
        {
          (names.length > 0) ?
            names.map((name, index) => {
              return (<Label key={index} name={name} icons={["coffee", "rocket", "star"]} />)
            })

            :
            <div>Nothing to print :/</div>
        }
      </div>
    </div>
  );
}

function onFileChange(event: React.ChangeEvent) {
  console.log(event.target.nodeValue);


}

export default App;
