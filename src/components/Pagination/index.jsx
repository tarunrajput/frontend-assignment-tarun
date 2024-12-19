import {
  ChevronLeft,
  ChevronRight,
  DoubleChevronLeft,
  DoubleChevronRight,
} from "../../icons";
import "./styles.css";

const Pagination = ({ page, action }) => {
  if (!page.current) return null;
  const pageSize = page.pageSize;
  return (
    <div className="pagination">
      <p className="pagination-info">{`${(page.current - 1) * pageSize + 1} - ${
        (page.current - 1) * pageSize + page.data.length
      } of ${page.total} results`}</p>

      <ul className="pagination-list">
        <li className="pagination-item">
          <PaginationButton
            onClick={() => action.goTo(1)}
            disabled={page.current === 1}
          >
            <DoubleChevronLeft />
            <span className="pagination-item-label">First</span>
          </PaginationButton>
        </li>
        <li className="pagination-item ">
          <PaginationButton
            onClick={action.goToPreviousPage}
            disabled={page.previous === null}
          >
            <ChevronLeft />
            <span className="pagination-item-label">Previous</span>
          </PaginationButton>
        </li>
        {page.numbers.map((number, index) => (
          <li
            key={index}
            className={`pagination-item ${
              number === page.current ? "active" : ""
            }`}
          >
            <PaginationNumber
              number={number}
              isActive={number === page.current}
              onClick={() => action.goTo(number)}
            />
          </li>
        ))}
        <li className="pagination-item">
          <PaginationButton
            onClick={action.goToNextPage}
            disabled={page.next === null}
          >
            <ChevronRight />
            <span className="pagination-item-label">Next</span>
          </PaginationButton>
        </li>
        <li className="pagination-item">
          <PaginationButton
            onClick={() => action.goTo(page.last)}
            disabled={page.current === page.last}
          >
            <DoubleChevronRight />
            <span className="pagination-item-label">Last</span>
          </PaginationButton>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

const PaginationButton = ({ onClick, disabled, children }) => (
  <button
    className={`pagination-button ${disabled ? "disabled" : ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const PaginationNumber = ({ number, isActive, onClick }) => (
  <button
    className={`pagination-number ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    {number}
  </button>
);
