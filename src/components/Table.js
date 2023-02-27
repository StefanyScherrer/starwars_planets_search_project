// import React, { useContext } from 'react';
// import Filter from './Filter';
// import tabelaContext from '../context/context';

// export default function Table() {
//   const { termoDeBusca, buttonClick,
//     numberFilter, planets,
//   } = useContext(tabelaContext);
//   return (
//     <div>
//       <Filter />
//       <table>
//         <tr>
//           <th>name</th>
//           <th>rotation_period</th>
//           <th>orbital_period</th>
//           <th>diameter</th>
//           <th>climate</th>
//           <th>gravity</th>
//           <th>terrain</th>
//           <th>surface_water</th>
//           <th>population</th>
//           <th>films</th>
//           <th>created</th>
//           <th>edited</th>
//           <th>url</th>
//         </tr>
//         {buttonClick ? planets.filter((planet) => {
//           let result;
//           if (numberFilter.operador === 'igual a') {
//             result = planet[numberFilter.coluna] === numberFilter.value;
//           }
//           if (numberFilter.operador === 'maior que') {
//             result = Number(planet[numberFilter.coluna]) > numberFilter.value;
//           }
//           if (numberFilter.operador === 'menor que') {
//             result = Number(planet[numberFilter.coluna]) < numberFilter.value;
//           }
//           return result;
//         }).map((planet) => (
//           <tr key={ planet.name }>
//             <td>{planet.name}</td>
//             <td>{planet.rotation_period}</td>
//             <td>{planet.orbital_period}</td>
//             <td>{planet.diameter}</td>
//             <td>{planet.climate}</td>
//             <td>{planet.gravity}</td>
//             <td>{planet.terrain}</td>
//             <td>{planet.surface_water}</td>
//             <td>{planet.population}</td>
//             <td>{planet.films}</td>
//             <td>{planet.created}</td>
//             <td>{planet.edited}</td>
//             <td>{planet.url}</td>
//           </tr>
//         ))
//           : (planets && planets.filter((planet) => {
//             let result;
//             if (planet.name.toLowerCase().includes(termoDeBusca.toLowerCase())) {
//               result = planet;
//             }
//             return result;
//           }).map((planet) => (
//             <tr key={ planet.name }>
//               <td>{planet.name}</td>
//               <td>{planet.rotation_period}</td>
//               <td>{planet.orbital_period}</td>
//               <td>{planet.diameter}</td>
//               <td>{planet.climate}</td>
//               <td>{planet.gravity}</td>
//               <td>{planet.terrain}</td>
//               <td>{planet.surface_water}</td>
//               <td>{planet.population}</td>
//               <td>{planet.films}</td>
//               <td>{planet.created}</td>
//               <td>{planet.edited}</td>
//               <td>{planet.url}</td>
//             </tr>
//           )))}
//       </table>
//     </div>
//   );
// }
import React, { useContext } from 'react';
import Context from '../context/context';

export default function Table() {
  const { listPlanets, planetInput, selectedFilters, dataFilter } = useContext(Context);
  const data = dataFilter(listPlanets, planetInput, selectedFilters);
  console.log(data);
  return (
    <div>
      <table border="1" cellSpacing="0">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>
                  {planet.films.map((film) => (
                    <div key={ film }>{film}</div>
                  ))}
                </td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
