import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [planet, setPlanet] = useState('planet');
  const [body, setBody] = useState();

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
      // console.log(body);
      if (body.englishName == planet) {
        display = JSON.stringify(body);
      }
    });
    
    setBody(display);
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

      <div>{ body }</div>
    </div>
  );
}

export default App;
