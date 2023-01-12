import { useDispatch } from "react-redux";
import { useState, useRef, useEffect, memo } from "react";
import { setSortType } from "../redux/slices/filterSlice";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";

const Sort = memo(({ valueSortType }) => {
  //useState
  const [open, setOpen] = useState(false);
  const categories = ["популярности", "цене", "алфавиту"];
  const sortRef = useRef();

  //REDUX_STATE
  const dispatch = useDispatch();
  const onClickChangeSortType = (value) => {
    dispatch(setSortType(value));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div onClick={() => setOpen(!open)} ref={sortRef} className="sort">
      <div className="sort__label">
        {open === true ? (
          <BsFillArrowUpCircleFill />
        ) : (
          <BsFillArrowDownCircleFill />
        )}
        <b>Сортировка по:</b>
        <span>{valueSortType}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {categories.map((value, index) => {
              return (
                <li
                  className={valueSortType === value ? "active" : ""}
                  onClick={() => onClickChangeSortType(value)}
                  key={index}
                >
                  {value}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
