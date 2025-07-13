import React, { useState } from "react";
import { addPage } from "@/features/filter/filterSlice";
import { useDispatch } from "react-redux";

const PaginationCustom = ({ page, size, totalPages }) => {
  const [currentPage, setCurrentPage] = useState(page);

  const dispatch = useDispatch();

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    dispatch(addPage(Math.max(currentPage - 1, 1)));
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    dispatch(addPage(Math.min(currentPage + 1, totalPages)));
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
