import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import './Table.css';

const tableCreator = (obj) =>
  <tr key={obj.name}>
    <td>{obj.name}</td>
    <td>{obj.rotation_period}</td>
    <td>{obj.orbital_period}</td>
    <td>{obj.diameter}</td>
    <td>{obj.climate}</td>
    <td>{obj.gravity}</td>
    <td>{obj.terrain}</td>
    <td>{obj.surface_water}</td>
    <td>{obj.population}</td>
    <td>
      {obj.films.map((e) =>
        <p key={e}><a href={e} target="_blank" rel="noopener noreferrer">{e}</a></p>)
      }
    </td>
    <td>{obj.created}</td>
    <td>{obj.edited}</td>
    <td>
      <a href={obj.url} target="_blank" rel="noopener noreferrer">{obj.url}</a>
    </td>
  </tr>;

const filteredPlanets = (filters, planets) => {
  let result = [...planets];
  filters.forEach(
    ({ column, comparison, value }) => {
      if (Number(value) === 0) { return planets; }
      switch (comparison) {
        case 'maior que':
          result = result.filter((e) => (e[column] - value) > 0);
          return result;
        case 'menor que':
          result = result.filter((e) => (value - e[column]) > 0);
          return result;
        case 'igual a':
          result = result.filter((e) => (e[column] - value) === 0);
          return result;
        default:
          return result;
      }
    },
  );
  return result;
};

const Table = () => {
  const { data, filters } = useContext(StarWarsContext);
  const { planets, isFetching } = data;
  const { filterByName, filterByNumericValues } = filters;
  const dataReceived = planets.length;
  let planetoides = [];
  let dataReady = false;
  let dataKeys = [];
  let regex = '';
  if (dataReceived) {
    dataKeys = [...Object.keys(planets[0])];
    const cutData = dataKeys.indexOf('residents');
    regex = new RegExp(`${filterByName}`, 'i');
    dataKeys.splice(cutData, 1);
    dataReady = true;
    planetoides = [...filteredPlanets(filterByNumericValues, planets)];
  }
  return (
    <div>
      {dataReady && !isFetching &&
      <table><tbody>
        <tr>{dataKeys.map((e) => <th key={e}>{e}</th>)}</tr>
        {
          planetoides.filter(({ name }) => name.match(regex)).map((e) => tableCreator(e))
        }
      </tbody></table>
      }
      { isFetching && <span>...Loading</span>}
    </div>
  );
}

export default Table;
