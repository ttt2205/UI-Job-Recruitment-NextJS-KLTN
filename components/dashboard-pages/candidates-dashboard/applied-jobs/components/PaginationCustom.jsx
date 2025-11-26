import React, { useState } from "react";

const PaginationCustom = ({ currentPage, totalPages, onChangePage }) => {
  const handlePrevClick = () => {
    onChangePage(Math.max(currentPage - 1, 1));
  };

  const handleNextClick = () => {
    onChangePage(Math.min(currentPage + 1, totalPages));
  };

  const renderPaginationItems = () => {
    const items = [];
    const totalVisible = 5;

    // Tính start và end page để hiển thị
    let startPage = Math.max(currentPage - Math.floor(totalVisible / 2), 1);
    let endPage = startPage + totalVisible - 1;

    // Nếu endPage vượt quá totalPages thì dịch ngược lại
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - totalVisible + 1, 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      const isCurrentPage = page === currentPage;
      const className = isCurrentPage ? "current-page" : "";

      items.push(
        <li key={page}>
          <span
            className={className}
            onClick={() => onChangePage(page)}
            style={{ cursor: "pointer" }}
          >
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
