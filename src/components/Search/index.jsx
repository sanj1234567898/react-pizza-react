import React, { useRef, useCallback, useState } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { BiSearchAlt } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const inputRef = useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 1000),
    []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.search}>
      <BiSearchAlt className={styles["search-icon"]} />
      <input
        ref={inputRef}
        className={styles["search-input"]}
        onChange={(e) => onChangeInput(e)}
        value={value}
        placeholder="Найти вкусную пиццу..."
      ></input>
      {value && (
        <ImCross className={styles["cross-icon"]} onClick={onClickClear} />
      )}
    </div>
  );
};

export default Search;
