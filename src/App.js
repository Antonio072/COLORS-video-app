import logo from './logo.svg';
import './App.css';
import { Carrousel } from './components/Carrousel/Carrousel';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <h1><strong>COLORS</strong> Video Picker </h1>
        <Carrousel />
        {/* Creates a rgb slider */}
        <div className="slider-container">
          <div className="slider-label">Red</div>
          <input type="range" min="0" max="255" value="0" step="1" className="slider" id="red" />
        </div>
        <div className="slider-container">
          <div className="slider-label">Green</div>
          <input type="range" min="0" max="255" value="0" step="1" className="slider" id="green" />
        </div>
        <div className="slider-container">
          <div className="slider-label">Blue</div>
          <input type="range" min="0" max="255" value="0" step="1" className="slider" id="blue" />
        </div>
        <input type="color" id="colorPicker" />
      </header>
    </div>
  );
}

export default App;
