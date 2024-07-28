import './App.css'
import Seat from './seat'

function App() {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = [0,1, 2, 3, 4];
  return (
      <div className='cinema'>
        <h1>Bienvenido al Cine</h1>
      <p>Seleccione su asiento:</p>
        {rows.map((row) => (
          <div key={row} className='row'>
            {cols.map((col) => (
              <Seat key={`${row}${col}`} seatNumber={`${row}${col}`} />
            ))}
      </div>
    ))}
  </div>
  );
}

export default App;
