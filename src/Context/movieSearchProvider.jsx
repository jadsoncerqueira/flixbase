import { useState } from "react";
import { querySearchContext } from ".";

// eslint-disable-next-line react/prop-types
export const QuerySearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  return (
    <querySearchContext.Provider value={{ query, setQuery }}>
      {children}
    </querySearchContext.Provider>
  );
};
