// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <span>Hello, App!</span>
//   );
// }

// export default App;
import React from 'react';
import './App.css';
import Table from './components/Table';
import Provider from './context/provider';
import Filters from './components/Filter';

function App() {
  return (
    <Provider>
      <Table />
      <Filters />
    </Provider>
  );
}

export default App;
