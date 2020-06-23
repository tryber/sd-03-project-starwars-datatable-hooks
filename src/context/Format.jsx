import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const formatContext = createContext(false);

function FormatProvider({ children }) {
  const isMultiHeaderState = useState(true);
  console.log(isMultiHeaderState[0])
  return (
    <formatContext.Provider value={isMultiHeaderState}>
      <div className="App">{children}</div>
    </formatContext.Provider>
  );
}

FormatProvider.propTypes = { children: PropTypes.node.isRequired };

export default FormatProvider;
