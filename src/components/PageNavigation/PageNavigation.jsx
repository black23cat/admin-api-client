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
    <nav className="page-navigation">
      <button
        type="button"
        onClick={() => handlePageButtonNavigate('prev')}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span>{currentPage}</span>
      <button
        type="button"
        onClick={() => handlePageButtonNavigate('next')}
        disabled={isLastPage}
      >
        Next
      </button>
      <span>
        Showing {showedItems} of {totalItemCount} Purchase Order Data
      </span>
    </nav>
  );
}
