import React, { useState, useRef, useEffect } from "react";
// import './styles.scss';

const searchFilter = (searchValue, list, searchBy = "value") => {
  console.log("searchValue, list", searchValue, list);
  let lowerCaseQuery = searchValue.toLowerCase();
  let filteredList = searchValue
    ? list.filter((x) => x.toLowerCase().includes(lowerCaseQuery))
    : list;
  return filteredList;
};

const DropdownItems = ({ placeholder, items, selectItem }) => {
  const [visible, setVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const dropdownRef = useRef(null);

  // click away listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  }, []);

  const handleClick = (e) => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    if (!visible) {
      setVisible(true);
    }
  };

  const handleSelectItem = (item) => {
    setSearchValue(item);
    setSelectedItem(item);
    setVisible(false);
    selectItem(item);
  };

  const selectChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className={`wrapper-input ${visible ? "active" : ""}  no-border p-0`}>
      <input
        className="form-control"
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        onFocus={() => {
          // if (searchValue) {
          setVisible(true);
          // };
        }}
      />
      <div ref={dropdownRef} className={`dropdown ${visible ? "v" : ""}`}>
        {visible && (
          <div className="dropdown">
            <ul className="dropdown-inner">
              {!items && (
                <li key="zxc" className="dropdown_item">
                  no result
                </li>
              )}
              {/* you can remove the searchFilter if you get results from Filtered API like Google search */}
              {items &&
                searchFilter(searchValue, items).map((item) => (
                  <li
                    key={item}
                    onClick={() => handleSelectItem(item)}
                    className="dropdown_item"
                  >
                    <a>{item}</a>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownItems;
