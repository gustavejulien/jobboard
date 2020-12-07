import React, { useEffect, useState, useRef } from "react";

const AutoCompletion = ({urlAPI, criteria}) => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const wrapperRef = useRef(null);
    const [crit] = useState(criteria);
  
    console.log(crit);
    useEffect(() => {
      const company = [];
      const promises = new Array(20)
        .fill()
        .map((v, i) => fetch(urlAPI + `${i + 1}`));
      Promise.all(promises).then(companyArr => {
        return companyArr.map(value =>
          value
            .json()
            .then((crit) =>
              company.push(crit)
            )
        );
      });
      setOptions(company);
      console.log(company);
    }, []);
  
    useEffect(() => {
      window.addEventListener("mousedown", handleClickOutside);
      return () => {
        window.removeEventListener("mousedown", handleClickOutside);
      };
    });
  
    const handleClickOutside = event => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target)) {
        setDisplay(false);
      }
    };
  
    const updateSearch = poke => {
      setSearch(poke);
      setDisplay(false);
    };
  
    return (
      <div ref={wrapperRef} className="flex-container flex-column pos-rel">
        <input
          id="auto"
          onClick={() => setDisplay(!display)}
          placeholder="Type to search"
          value={search}
          onChange={event => setSearch(event.target.value)}
        />
        {display && (
          <div className="autoContainer">
            {options
              .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
              .map((value, i) => {
                return (
                  <div
                    onClick={() => updateSearch(value.name)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <span>{value.name}</span>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    );
  };

  export default AutoCompletion;