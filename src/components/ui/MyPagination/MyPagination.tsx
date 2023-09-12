import { FC } from 'react';
import styles from './MyPagination.module.scss';
import ReactPaginate from 'react-paginate';

export const MyPagination: FC<{qtyPerPage: number, totalPage: number, parentPaginationHandle: (event: { selected: number }) => void}> = 

({ qtyPerPage, totalPage, parentPaginationHandle }) => {

  const handlePageClick = (event: { selected: number }) => {
    parentPaginationHandle(event);
  }

  return (
    <div className={styles['my-pagination']}>
      <ReactPaginate
        pageCount={Math.floor(totalPage / qtyPerPage)}
        initialPage={0}
        onPageChange={handlePageClick}
        nextLabel=">"
        previousLabel="<"
      />
    </div>
  )
}