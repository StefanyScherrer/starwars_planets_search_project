// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from '../App';

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });




// import React from 'react';
// import { render, screen, waitFor, act } from '@testing-library/react';
// import App from '../App';
// import { nameFilterContext, planets } from './mockData';
// import userEvent from '@testing-library/user-event';
// import testData from '../../cypress/mocks/testData';
// import renderWithContext from './renderWithContext';



// describe('Testes da aplicação Star Wars', () => {
//   it('Ao iniciar a aplicação é feita uma chamada a API e então a tabela é reenderizada', async () => {
//     jest.spyOn(global, 'fetch');

//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(planets),
//     });

//     render(<App />);

//     const loading = screen.getByText(/Carregando.../i);
//     expect(loading).toBeInTheDocument();
//     expect(global.fetch).toHaveBeenCalled();

//     const columns = await screen.findAllByRole('columnheader');
//     const rows = await screen.findAllByTestId('planet-name');
//     expect(columns).toHaveLength(13);
//     expect(rows).toHaveLength(10);
//   });

//   it('Testa o filtro de nome de planeta', async () => {
//     let rows;

//     jest.spyOn(global, 'fetch');

//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(planets),
//     });

//     render(<App />);

//     const nameInput = screen.getByTestId('name-filter');
//     expect(nameInput).toBeInTheDocument();
//     userEvent.type(nameInput, 'T');
//     expect(await screen.findAllByTestId('planet-name')).toHaveLength(1);
//   });

//   it('Testa o filtro numérico', async () => {
//     jest.spyOn(global, 'fetch');

//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(planets),
//     });

//     render(<App />);

//     const valueInput = screen.getByTestId('value-filter');
//     const filterButton = screen.getByTestId('button-filter');
//     const comparison = screen.getByTestId('comparison-filter');
//     const fieldSelect = screen.getByTestId('column-filter');

//     userEvent.type(valueInput, '2000');
//     userEvent.click(filterButton);

//     waitFor(() => {
//       userEvent.selectOptions(fieldSelect, 'orbital_period')
//       userEvent.selectOptions(comparison, 'menor que')
//       userEvent.click(filterButton);
//     }, { timeout: 10000 })

//     await waitFor(() => {
//       expect(screen.getAllByTestId('planet-name')).toHaveLength(6);

//      const clearAllButton = screen.getByTestId('button-remove-filters');
//      const removeFilterButton = screen.getAllByTestId('remove-filter');
//      userEvent.click(removeFilterButton[1]);
//      expect(screen.getAllByTestId('planet-name')).toHaveLength(7);

//      userEvent.click(clearAllButton);
//      expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
//     }, { timeout: 3000 })
//   });

//   it('Testa a o operador de comparação igual no filtro', async () => {
//     jest.spyOn(global, 'fetch');

//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(planets),
//     });

//     render(<App />);

//     const valueInput = screen.getByTestId('value-filter');
//     const filterButton = screen.getByTestId('button-filter');
//     const comparison = screen.getByTestId('comparison-filter');
//     const fieldSelect = screen.getByTestId('column-filter');

//     userEvent.type(valueInput, '1000');
//     userEvent.selectOptions(comparison, 'igual a');
//     userEvent.click(filterButton);

//     await waitFor(() => {
//       expect(screen.getAllByTestId('planet-name')).toHaveLength(1);
//     }, { timeout: 3000 })
//   });

//   it('Testa a ordenação da tabela', async () => {
//     jest.spyOn(global, 'fetch');

//     global.fetch.mockResolvedValue({
//       json: jest.fn().mockResolvedValue(planets),
//     });

//     render(<App />);

//     const fieldSort = screen.getByTestId('column-sort');
//     const sortASC = screen.getByLabelText('ascendente');
//     const sortDESC = screen.getByLabelText('descendente');
//     const sortButton = screen.getByTestId('column-sort-button');

//     userEvent.selectOptions(fieldSort, 'orbital_period');

//     waitFor(() => {
//       act(() => {
//         userEvent.click(sortASC);
//         userEvent.click(sortDESC);
//         userEvent.click(sortButton);
//       })
//     }, { timeout: 1000 })

//     await waitFor(() => {
//       expect(screen.getAllByTestId('planet-name')[0].textContent).toBe('Yavin IV');
//     }, { timeout: 3000 })
//   });
// });
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
// import { planets } from './mockData';
import renderWithContext from './renderWithContext';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

afterEach(() => jest.clearAllMocks());
describe('API', () => {
  test('Testa se ao iniciar a aplicação é feita uma chamada a API e a tabela é reenderizada', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(async () => {
      renderWithContext(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
    const inputPlanet = screen.getByTestId('name-filter');
    const selectColumn = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    expect(inputPlanet).toBeInTheDocument;
    expect(selectColumn).toBeInTheDocument;
    expect(btnFilter).toBeInTheDocument;
    userEvent.type(inputPlanet, 'Al');
    expect(await screen.findByRole('cell', { name: /Alderaan/i })).toBeInTheDocument();
    userEvent.selectOptions(selectColumn, ['population']);
    userEvent.selectOptions(comparisonFilter, ['maior que']);
    userEvent.type(inputValueFilter, "2000");
    userEvent.click(btnFilter);
    expect(await screen.findByText('Alderaan')).toBeInTheDocument();
    userEvent.selectOptions(selectColumn, ['orbital_period']);
    userEvent.selectOptions(comparisonFilter, ['menor que']);
    userEvent.type(inputValueFilter, "380");
    userEvent.click(btnFilter);
    expect(await screen.findByText('Alderaan')).toBeInTheDocument();
  });
});
describe('Testes Filter', () => {
  test('Testa filtros', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }));
    await act(async () => {
      renderWithContext(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
    const selectColumn = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const inputValueFilter = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    userEvent.selectOptions(selectColumn, ['orbital_period']);
    userEvent.selectOptions(comparisonFilter, ['igual a']);
    userEvent.type(inputValueFilter, "304");
    userEvent.click(btnFilter);
    const btnDelete = await screen.findByRole('button', { name: /excluir/i });
    expect(btnDelete).toBeInTheDocument();
    userEvent.click(btnDelete);
  });
});

  // it('Testa a o operador de comparação igual no filtro', async () => {
  //   jest.spyOn(global, 'fetch');

  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(planets),
  //   });

  //   render(<App />);

  //   const valueInput = screen.getByTestId('value-filter');
  //   const filterButton = screen.getByTestId('button-filter');
  //   const comparison = screen.getByTestId('comparison-filter');
  //   const fieldSelect = screen.getByTestId('column-filter');

  //   userEvent.type(valueInput, '1000');
  //   userEvent.selectOptions(comparison, 'igual a');
  //   userEvent.click(filterButton);

  //   await waitFor(() => {
  //     expect(screen.getAllByTestId('planet-name')).toHaveLength(1);
  //   }, { timeout: 3000 })
  // });
