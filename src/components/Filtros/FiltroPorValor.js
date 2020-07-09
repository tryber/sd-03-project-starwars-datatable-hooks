import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../../context/StarWarsContext';
import updateColumn from './AtualizaColuna';
import { getColunas, getComparar } from './Seletores';

function FiltroPorValor() {
  const [number, setNumber] = useState('');
  const [column, setColumn] = useState('');
  const [comparation, setComparation] = useState('');
  const {
    filterByNumericValues,
    filters: { filterByNumericValues: numericValues },
  } = useContext(StarWarsContext);

  useEffect(() => {
    updateColumn(numericValues);
  }, []);

  const onNumberChange = (event) => setNumber(event.target.value);
  const onColumnChange = (event) => setColumn(event.target.value);
  const onComparationChange = (event) => setComparation(event.target.value);

  const onClick = () => {
    filterByNumericValues(column, comparation, number);
    setNumber('');
    setColumn('');
    setComparation('');
  };

  return (
    <div>
      {getColunas(onColumnChange, numericValues, column)}
      {getComparar(onComparationChange, comparation)}
      <input
        type="number"
        data-testid="value-filter"
        value={number}
        onChange={(event) => onNumberChange(event)}
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={onClick}
      >
        Filtrar
      </button>
    </div>
  );
}

export default FiltroPorValor;
