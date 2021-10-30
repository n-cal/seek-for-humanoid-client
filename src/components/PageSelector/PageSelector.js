function PageSelector({ currentPage, pagesCount, setCurrentPage }) {
  const selectedStyle = "text-gray-700 underline";

  let centralPages = [];

  if (pagesCount < 5) {
    centralPages = [...Array(pagesCount).keys()].slice(2);
  } else if (currentPage === 1 || currentPage === 2) {
    centralPages = [2, 3];
  } else if (currentPage === pagesCount || currentPage === pagesCount - 1) {
    centralPages = [pagesCount - 2, pagesCount - 1];
  } else {
    centralPages = [currentPage - 1, currentPage, currentPage + 1];
  }

  return (
    <div className="mt-5 text-gray-400">
      <p className="text-center font-mono">
        {currentPage > 1 && (
          <span
            className="cursor-pointer p-1"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {"<-"}
          </span>
        )}

        <span
          className={`p-1 cursor-pointer ${
            currentPage === 1 ? selectedStyle : ""
          }`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </span>
        {centralPages[0] - 1 > 1 && <span className="p-1">..</span>}
        {centralPages.map((n) => (
          <span
            key={n}
            className={`p-1 cursor-pointer ${
              n === currentPage ? selectedStyle : ""
            }`}
            onClick={() => setCurrentPage(n)}
          >
            {n}
          </span>
        ))}
        {pagesCount - centralPages[centralPages.length - 1] > 1 && (
          <span className="p-1">..</span>
        )}
        {pagesCount > 1 && (
          <span
            className={`p-1 cursor-pointer ${
              currentPage === pagesCount ? selectedStyle : ""
            }`}
            onClick={() => setCurrentPage(pagesCount)}
          >
            {pagesCount}
          </span>
        )}
        {currentPage < pagesCount && (
          <span
            className="cursor-pointer p-1"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {"->"}
          </span>
        )}
      </p>
    </div>
  );
}

export default PageSelector;
