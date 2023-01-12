import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ value, onChangeNumber }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      previousLabel="<"
      nextLabel=">"
      onPageChange={(event) => onChangeNumber(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      renderOnZeroPageCount={null}
      forcePage={value - 1}
    />
  );
};

export default Pagination;
