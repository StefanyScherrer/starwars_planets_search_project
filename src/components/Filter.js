// import React, { useContext } from 'react';
// import Context from '../context/context';

// function Filter() {
//   const { NameFilter } = useContext(Context);

//   const handleChangeName = ({ target }) => {
//     const { value } = target;
//     NameFilter(value);
//   };

//   return (
//     <div>
//       <form>
//         <input
//           type="text"
//           name="name-filter"
//           id="name-filter"
//           data-testid="name-filter"
//           onChange={ handleChangeName }
//         />
//       </form>
//     </div>
//   );
// }

// export default Filter;
import React, { useContext, useEffect } from 'react';
import Context from '../context/context';

export default function Filters() {
  const {
    planetInput,
    setPlanetInput,
    setSelectColumn,
    selectColumn,
    setSelectedFilters,
    selectedFilters,
    dataFilter,
    listPlanets,
    setListPlanets,
    columnList,
    setColumnList,
    sortColumn,
    setSortColumn,
    sortList,
  } = useContext(Context);
  const handleClick = () => {
    let filterList = columnList;
    filterList = columnList.filter((column) => column !== selectColumn.column);
    dataFilter(listPlanets, planetInput, selectedFilters);
    setSelectedFilters((prevState) => ([
      ...prevState,
      selectColumn,
    ]));
    setColumnList(filterList);
  };

  const handleSort = () => {
    const { column, sort } = sortColumn;
    const MINUS_1 = -1;
    if (sort === 'ASC') {
      listPlanets.sort((a, b) => {
        if (b[column] === 'unknown') { return MINUS_1; }
        if (Number(a[column]) < Number(b[column])) {
          return MINUS_1;
        }
        return true;
      });
      setListPlanets([...listPlanets]);
    }
    if (sort === 'DESC') {
      listPlanets.sort((a, b) => {
        if (b[column] === 'unknown') { return MINUS_1; }
        if (Number(a[column]) > Number(b[column])) {
          return MINUS_1;
        }
        return true;
      });
      setListPlanets([...listPlanets]);
    }
  };

  useEffect(() => {
    setSelectColumn({
      column: columnList[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [columnList, setSelectColumn]);

  return (
    <div>
      <span>
        <input
          placeholder="Filtro por nome do planeta"
          type="text"
          name="planetInput"
          data-testid="name-filter"
          value={ planetInput }
          onChange={ (({ target }) => setPlanetInput(target.value)) }
        />
        <select
          data-testid="column-filter"
          name="column"
          value={ selectColumn.column }
          onChange={ ({ target }) => {
            setSelectColumn({
              ...selectColumn,
              [target.name]: target.value });
          } }
        >
          {
            columnList.map((column, index) => (
              <option value={ column } key={ index }>{ column }</option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="column"
          value={ selectColumn.comparison }
          onChange={ ({ target }) => setSelectColumn((prevSelected) => ({
            ...prevSelected, comparison: target.value,
          })) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          placeholder="Digite o valor"
          type="number"
          data-testid="value-filter"
          name="filterValue"
          value={ selectColumn.value }
          onChange={ ({ target }) => setSelectColumn((prevSelected) => ({
            ...prevSelected, value: target.value })) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            handleClick();
          } }
        >
          Filtrar
        </button>
        <br />
        {selectedFilters.map((filter, index) => (
          <div data-testid="filter" key={ index }>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
            {' '}
            <button
              type="button"
              onClick={ () => {
                setSelectedFilters(selectedFilters
                  .filter((e) => e.column !== filter.column));
                setColumnList([...columnList, filter.column]);
              } }
            >
              Excluir
            </button>
          </div>
        ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setSelectedFilters([]);
            setColumnList([
              'population',
              'orbital_period',
              'diameter',
              'rotation_period',
              'surface_water',
            ]);
          } }
        >
          Remover Filtros
        </button>
      </span>
      <span>
        <div>
          <span>
            <select
              data-testid="column-sort"
              name="column"
              value={ sortColumn.column }
              onChange={ ({ target }) => {
                setSortColumn({
                  ...sortColumn,
                  [target.name]: target.value });
              } }
            >
              {
                sortList.map((column, index) => (
                  <option value={ column } key={ index }>{ column }</option>
                ))
              }
            </select>
          </span>
          <span>
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              value="ASC"
              name="sort"
              onClick={ () => setSortColumn({ ...sortColumn, sort: 'ASC' }) }
            />
            Ascendente
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              value="DESC"
              name="sort"
              onClick={ () => setSortColumn({ ...sortColumn, sort: 'DESC' }) }
            />
            Descendente
          </span>
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ handleSort }
          >
            Ordenar
          </button>
        </div>
      </span>
    </div>
  );
}
