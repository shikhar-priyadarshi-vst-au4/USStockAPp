import React from 'react';
import { Pagination as IPagination } from '../../core/providers/appProvider';
import "./pagination.scss";
interface PaginationProps {
  pagination: IPagination;
  onPageChange: (pageIndex: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  const { pageIndex, pageTotal, pageLimit } = pagination;
  const pageNumber = Math.ceil(pageTotal/pageLimit)
  const handlePageChange = (newPageIndex: number) => {
    if (newPageIndex > 0 && newPageIndex <= pageNumber) {
      onPageChange(newPageIndex);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    
    for (let i = 1; i <= pageNumber; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={i === pageIndex}
          className={i === pageIndex ? "active" : ""}
          style={{ margin: '0 2px', padding: '5px 10px', cursor: 'pointer' }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className='pagination'>
      <button
        onClick={() => handlePageChange(pageIndex - 1)}
        disabled={pageIndex === 1}
        style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8.30455 2.30454L7.5 1.5L3 6L7.5 10.5L8.30455 9.69545L4.60909 6L8.30455 2.30454Z" fill="#171A1F"/>
        </svg>
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(pageIndex + 1)}
        disabled={pageIndex === pageNumber}
        style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3.5 9.69545L4.30454 10.5L8.80453 6L4.30454 1.5L3.5 2.30454L7.19543 6L3.5 9.69545Z" fill="#171A1F"/>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;