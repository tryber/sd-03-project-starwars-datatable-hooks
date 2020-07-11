import React, { useContext, useEffect } from 'react';
import Table from './Table';
import Filters from './Filters';
import StarWarsContext from '../Context/StarWarsContext';
import SelectedFilters from './SelectedFilters';
import Sorter from './Sorter';

const Home = () => {
  const { filteredData, isFetching, fetchData } = useContext(StarWarsContext);
  useEffect(() => {
    fetchData();
  }, []);

  return (filteredData.length > 0 && !isFetching
    ? (
      <div className="App">
        <Filters />
        <SelectedFilters />
        <Sorter />
        <Table />
      </div>
    )
    : <h1>Sem planetas encontrados</h1>);
};

export default Home;
