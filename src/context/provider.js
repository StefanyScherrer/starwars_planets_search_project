// import PropTypes from 'prop-types';
// import React, { useMemo, useState, useEffect } from 'react';
// import TabelaContext from './context';

// export default function Provider({ children }) {
//   const [planets, setPlanets] = useState();
//   const [numberFilter, setNumberFilter] = useState({
//     coluna: 'population',
//     operador: 'maior que',
//     value: '0',
//   });
//   const [termoDeBusca, setSearchTerm] = useState('');
//   const [buttonClick, setButtonClick] = useState(false);
//   const getValuesFromFilter = (name, value) => {
//     setNumberFilter((prevState) => ({
//       ...prevState, [name]: value,
//     }));
//   };

//   const getPlanets = async () => {
//     const response = await fetch('https://swapi.dev/api/planets');
//     const data = await response.json();
//     const newData = data.results;
//     const filter = newData.filter((planet) => (
//       planet.residents ? delete planet.residents : true));
//     return setPlanets(filter);
//   };

//   useEffect(() => {
//     getPlanets();
//   }, []);

//   const obj = useMemo(() => ({
//     getValuesFromFilter,
//     setSearchTerm,
//     setButtonClick,
//     numberFilter,
//     termoDeBusca,
//     buttonClick,
//     planets,
//   }), [numberFilter, termodeBusca, buttonClick, planets]);
//   return (
//     <div>
//       <TabelaContext.Provider value={ obj }>
//         {children}
//       </TabelaContext.Provider>
//     </div>
//   );
// }
// Provider.propTypes = {
//   children: PropTypes.any,
// }.isRequires;

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

function Provider({ children }) {
  const [listPlanets, setListPlanets] = useState([]);
  const [planetInput, setPlanetInput] = useState('');
  // const [filterName, setFilterName] = useState([]);
  // const [selectColumn, setSelectColumn] = useState({
  //   column: 'population',
  //   comparison: 'maior que',
  //   value: 0,
  // });
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [columnList, setColumnList] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [selectColumn, setSelectColumn] = useState({
    column: columnList[0],
    comparison: 'maior que',
    value: 0,
  });

  const [sortList, setSorList] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [sortColumn, setSortColumn] = useState({
    column: sortList[0],
    sort: 'ASC',
  });

  const apiUrl = 'https://swapi.dev/api/planets';

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { results } = await fetch(apiUrl).then((response) => response.json());
  //     setListPlanets(results);
  //   };
  //   fetchData();
  // }, []);

  const dataFilter = useCallback((planets, name, numericValues) => (
    numericValues.length === 0
      ? planets.filter((planet) => planet.name.includes(name))
      : numericValues.reduce(
        (acc, { column, comparison, value }) => acc.filter((planet) => {
          switch (comparison) {
          case 'maior que':
            return (
              planet.name.includes(name)
                  && planet[column] > Number(value)
            );
          case 'menor que':
            return (
              planet.name.includes(name)
                  && planet[column] < Number(value)
            );
          case 'igual a':
            return (
              planet.name.includes(name)
                  && planet[column] === value
            );
          default:
            return planet.name.includes(name);
          }
        }),
        planets,
      )
  ), []);

  useEffect(() => {
    const fetchData = async () => {
      const { results } = await fetch(apiUrl).then((response) => response.json());
      setListPlanets(results);
    };
    fetchData();
  }, []);

  const listData = useMemo(
    () => ({
      listPlanets,
      setListPlanets,
      planetInput,
      setPlanetInput,
      // filterName,
      // setFilterName,
      selectColumn,
      setSelectColumn,
      selectedFilters,
      setSelectedFilters,
      dataFilter,
      columnList,
      setColumnList,
      sortList,
      sortColumn,
      setSorList,
      setSortColumn,
    }),
    [listPlanets,
      planetInput,
      dataFilter,
      selectColumn,
      selectedFilters,
      columnList,
      sortList,
      sortColumn],
  );

  return (
    <Context.Provider value={ listData }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.func,
}.isRequired;

export default Provider;
