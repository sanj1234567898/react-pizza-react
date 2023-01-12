import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setPageCount,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzasSlice";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaItem from "../components/PizzaItem";
import Skeleton from "../components/PizzaItem/Skeleton";
import Pagination from "../components/Pagination/Index";

const Home = () => {
  // const isSearch = React.useRef(false);
  // const isMounted = React.useRef(false);

  //useNavigate
  const navigate = useNavigate();

  //useState
  // const { searchValue } = useContext(SearchContext);

  //REDUX_STATE
  const {
    sortType: sortByType,
    categoryId,
    pageCount: currentPage,
    searchValue,
  } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizza);

  const dispatch = useDispatch();

  const onClickCategory = useCallback((id) => {
    dispatch(setCategoryId(id));
  }, []);

  //REDUX_PAGE-CONTROL
  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setFilters({ ...params }));
    }
  }, []);

  //SEARCHING LIGIC AND FETCH
  const sortByTitle = sortByType === "алфавиту" ? "title" : false;
  const sortByRaiting = sortByType === "популярности" ? "rating" : false;
  const sortByPrice = sortByType === "цене" ? "price" : false;

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        fetchPizzas({
          categoryId,
          sortByTitle,
          sortByRaiting,
          sortByPrice,
          currentPage,
        })
      );
    };
    fetchData();

    window.scrollTo(0, 0);
  }, [categoryId, sortByTitle, sortByRaiting, sortByPrice, currentPage]);

  //querystring parsing
  useEffect(() => {
    const queryString = qs.stringify({
      categoryId,
      sortByTitle,
      sortByRaiting,
      sortByPrice,
      currentPage,
    });
    navigate(`?${queryString}`);
  }, [categoryId, sortByTitle, sortByRaiting, sortByPrice, currentPage]);

  //PIZZA ITEMS AND SKELETONS
  const pizzas = items
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((item) => <PizzaItem key={item.id} {...item} />);
  const skeletons = [...new Array(4)].map((_, index) => (
    <Skeleton key={index} />
  ));

  //JSX
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort valueSortType={sortByType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <p>Не удалось получить данные</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination value={currentPage} onChangeNumber={onChangePage} />
    </>
  );
};

export default Home;
