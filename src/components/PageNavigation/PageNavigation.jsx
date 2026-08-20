import Arrow from '../../assets/svg/Arrow';
import styles from './PageNavigation.module.css';

export default function PageNavigation({
  totalItemCount,
  currentPage,
  handlePageNavigation,
}) {
  const displayedItemsCount = 25;
  const isLastPage =
    displayedItemsCount * currentPage === Number(totalItemCount) ||
    displayedItemsCount * currentPage > Number(totalItemCount);

  const showedItems = isLastPage
    ? totalItemCount
    : currentPage * displayedItemsCount;
  const handlePageButtonNavigate = (navigate) => {
    if (
      (navigate === 'prev' && currentPage === 1) ||
      (navigate === 'next' && isLastPage)
    ) {
      return;
    }
    handlePageNavigation(navigate);
  };
  return (
    <nav className={styles['page-navigation']}>
      {' '}
      <p>
        Showing <span>{showedItems}</span> of <span>{totalItemCount}</span> PO
        Data
      </p>
      <div className={styles['button-wrapper']}>
        <button
          className={styles.prev}
          type="button"
          onClick={() => handlePageButtonNavigate('prev')}
          disabled={currentPage === 1}
        >
          <Arrow />
          <p>Prev</p>
        </button>
        <p>{currentPage}</p>
        <button
          className={styles.next}
          type="button"
          onClick={() => handlePageButtonNavigate('next')}
          // disabled={isLastPage}
        >
          Next
          <span>
            <Arrow />
          </span>
        </button>
      </div>
    </nav>
  );
}
