import React, { useState } from "react";
import { addPagintion } from "@/features/filter/filterSlice";
import { useDispatch } from "react-redux";

const PaginationCustom = ({ page, size, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(page);

  const dispatch = useDispatch();

  const handlePrevClick = () => {
    // setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    dispatch(addPagintion({ page: Math.max(currentPage - 1, 1), size }));
  };

  const handleNextClick = () => {
    // setCurrentPage((prevPage) => prevPage + 1);
    dispatch(addPagintion({ page: currentPage + 1, size }));
  };

  const renderPaginationItems = () => {
    const items = [];

    for (let page = 1; page <= totalPages; page++) {
      const isCurrentPage = page === currentPage;
      const className = isCurrentPage ? "current-page" : "";

      items.push(
        <li key={page}>
          <span className={className} onClick={() => setCurrentPage(page)}>
            {page}
          </span>
        </li>
      );
    }

    return items;
  };

  return (
    <nav className="ls-pagination">
      <ul>
        <li className="prev">
          <span onClick={handlePrevClick}>
            <i className="fa fa-arrow-left"></i>
          </span>
        </li>
        {renderPaginationItems()}
        <li className="next">
          <span onClick={handleNextClick}>
            <i className="fa fa-arrow-right"></i>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationCustom;
