import { filter, toLower, includes } from "lodash";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";

const DropdownList = (props) => {
  const {
    id,
    name,
    className,
    style,
    value,
    items,
    placeHolder,
    disabled,
    noborder,
    enableAutoComplete,
    enableAutoCompleteSearch,
    badge,
    gray_bg,
  } = props;

  const [show, setShow] = useState(false);
  const [itemsList, setItemsList] = useState([]);
  const input = useRef();
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );

  const toggleOpen = () => {
    if (!props.disabled) setShow(!show);
  };

  const selectItem = (value) => {
    props.selectItem(value);
    setShow(false);
  };

  useEffect(() => {
    window.addEventListener("click", function (event) {
      if (
        event.target.className !== "wrapper-input-text" &&
        event.target.className !== "wrapper-input-text-search" &&
        event.target.className !== "wrapper-input-text-search-icon" &&

        event.target.id !== props.id
        // || (event.target.id === props.id && document.getElementById(props.id).classList.contains('active')))
      )
        setShow(false);
    });
  }, []);

  useEffect(() => {
    if (items) setItemsList(items);
  }, [items]);

  const RenderPlaceHolderText = () =>
    value
      ? itemsList.filter((x) => {
          return x.value === value;
        }).length > 0
        ? itemsList.filter((x) => {
            return x.value === value;
          })[0].text
        : placeHolder
        ? placeHolder
        : languageType.SELECT_TEXT
      : placeHolder
      ? placeHolder
      : languageType.SELECT_TEXT;

  useEffect(() => {
    if (value && input.current) {
      if (value !== placeHolder) {
        input.current.value = RenderPlaceHolderText().toString();
      }
    }
  }, [value, input.current]);

  const onTextChange = (e) => {
    const string = e.target.value;
    if (string) {
      setItemsList(
        filter(items, ({ text }) => includes(toLower(text), toLower(string)))
      );
    } else {
      props.selectItem("");
      setItemsList(items);
    }
  };
  return (
    <>
      <div
        tabIndex="1"
        id={id}
        name={name ? name : ""}
        className={`${className ? className : ""} wrapper-input text-left ${
          show ? "active" : ""
        } ${disabled ? "disabled" : ""} ${noborder ? "no-border" : ""}`}
        style={style ? style : {}}
        onClick={() => (enableAutoComplete || enableAutoCompleteSearch ? setShow(true) : toggleOpen())}
      >
        {!enableAutoComplete && (
          <span className="wrapper-input-text">{RenderPlaceHolderText()}</span>
        )}
        {enableAutoComplete && (
          <input
            id={id}
            ref={input}
            style={{ background: gray_bg ? "#f3f2f2" : "" }}
            className="wrapper-input-text w-100 border-0"
            type="text"
            placeholder={RenderPlaceHolderText().toString()}
            onChange={onTextChange}
            onFocus={() => setShow(true)}
            autoComplete="off"
          />
        )}
        <div className="dropdown">
          <ul className="dropdown-inner">
            <span> 
            {enableAutoCompleteSearch ? (
              <> 
              <i class="fa fa-search wrapper-input-text-search-icon" onFocus={() => setShow(true)}></i> 
              <input 
                id={id}
                onChange={onTextChange}
                placeholder="Search"
                type="text"
                className="wrapper-input-text-search"
                autoComplete="off"
                onFocus={() => setShow(true)}
              />
              </>
            )
              :
              ( ""
            )}
            </span>
            {itemsList &&
              itemsList.length > 0 &&
              itemsList.map((item, i) => (
                <li key={i}>
                  <a onClick={() => selectItem(item.value)}>
                    {item.icon && <i className={`${item.icon} icon-large`}></i>}
                    {item.text ? item.text : item.text}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropdownList;
