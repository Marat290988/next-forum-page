import { FC } from 'react';
import styles from './MyPagination.module.scss';
import ReactPaginate from 'react-paginate';

export const MyPagination: FC<{qtyPerPage: number, totalPage: number, parentPaginationHandle: (event: { selected: number }) => void, initialPage: number | undefined}> = 

({ qtyPerPage, totalPage, parentPaginationHandle, initialPage }) => {

  const handlePageClick = (event: { selected: number }) => {
    parentPaginationHandle(event);
  }

  return (
    <div className={styles['my-pagination']}>
      {typeof initialPage === 'number' && <ReactPaginate
        pageCount={Math.ceil(totalPage / qtyPerPage)}
        initialPage={initialPage}
        onPageChange={handlePageClick}
        nextLabel=">"
        previousLabel="<"
      />}
    </div>
  )
}