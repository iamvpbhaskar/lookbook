import { useEffect, useState } from 'react';
import './App.css';
import './styles/lookbook.css';
import { LookbookProvider, useLookbook } from './context/LookbookContext';
import Lookbook from './components/Lookbook/Lookbook';

function App() {
  const [looks, setLooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/looks.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load looks.json');
        return res.json();
      })
      .then((data) => {
        setLooks(Array.isArray(data?.looks) ? data.looks : []);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <LookbookProvider looks={looks}>
      <div className="App app-container">
        <h1>Lookbook </h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {!error && looks.length === 0 && <p>Loading looks…</p>}
        {looks.length > 0 && (
          <>
            <Summary />
            <Lookbook />
          </>
        )}
      </div>
    </LookbookProvider>
  );
}

export default App;

function Summary() {
  const { looks, activeLookIndex, activeMediaIndex } = useLookbook();
  const active = looks[activeLookIndex];
  // return (
  //   <div>
  //     <p>Total looks: {looks.length}</p>
  //     <p>Active look: {active?.title || active?.id}</p>
  //     <p>Active media index: {activeMediaIndex}</p>
  //   </div>
  // );
}
