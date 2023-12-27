import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('Earth');
  const [vol, setVol] = useState(1083210000000.0);

  const fetchData = (planet) => {
    var display;
    let data = localStorage.getItem("planets");
    data = JSON.parse(data);
  
    if (!data) {
      axios({
        method: "get",
        url: "https://api.le-systeme-solaire.net/rest/bodies",
      })
      .then(function(res) {
        let str = JSON.stringify(res.data);
        localStorage.setItem("planets", str);
        data = localStorage.getItem("planets");
        data = JSON.parse(data);
      })
    }
    
    data.bodies.forEach(body => {
      if (body.englishName == planet) {
        display = body;
      }
    });

    console.log(display);

    let volume = display.vol.volValue * 10 ** display.vol.volExponent;
    
    setName(display.englishName);
    setVol(volume.toFixed(1));
  }

  const handleSelect = (event) => {
    let planet = event.target.value;
    fetchData(planet);
  }

  return (
    <div className="App">
      <select onChange={handleSelect}>
        <option value="Earth">Earth</option>
        <option value="Moon">Moon</option>
        <option value="Sun">Sun</option>
      </select>

      <div>Name: { name }</div>
      <div>Volume: { vol } km^3</div>

    </div>
  );
}

export default App;
