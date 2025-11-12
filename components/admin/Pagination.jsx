import { ChevronsLeft, ChevronRight, ChevronLeft, ChevronsRight } from "lucide-react";

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("...");
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push("...");
                for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages;
    };


    return (
        <div className="pagination-container">
            <div className="pagination-info">

            </div>

            <div className="pagination-controls">
                <button
                    className="page-btn"
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    title="Trang đầu"
                >
                    <ChevronsLeft size={18} />
                </button>

                <button
                    className="page-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    title="Trang trước"
                >
                    <ChevronLeft size={18} />
                </button>

                {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                        <span key={`ellipsis-${index}`} className="page-ellipsis">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={`page-btn ${currentPage === page ? "active" : ""}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    className="page-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    title="Trang sau"
                >
                    <ChevronRight size={18} />
                </button>

                <button
                    className="page-btn"
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    title="Trang cuối"
                >
                    <ChevronsRight size={18} />
                </button>
            </div>
        </div>
    );
}
