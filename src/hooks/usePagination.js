import { useEffect, useState } from "react";

export const usePagination = (initialData, pageSize, noOfShownPages = 4) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  const lastPageNumber = Math.ceil(initialData.length / pageSize);
  const goToNextPageNumber =
    currentPage === lastPageNumber ? null : currentPage + 1;
  const goToPreviousPageNumber = currentPage <= 1 ? null : currentPage - 1;

  const pageNumbers = [];

  if (lastPageNumber <= noOfShownPages) {
    pageNumbers.push(
      ...Array.from({ length: lastPageNumber }, (_, i) => i + 1)
    );
  } else {
    let startNumber = currentPage - Math.floor(noOfShownPages / 2);
    if (lastPageNumber - Math.floor(noOfShownPages / 2) <= currentPage) {
      startNumber = lastPageNumber - noOfShownPages + 1;
    }

    if (currentPage - Math.floor(noOfShownPages / 2) > 1) {
      pageNumbers.push("...");
      pageNumbers.push(
        ...Array.from({ length: noOfShownPages }, () => startNumber++)
      );
    } else {
      pageNumbers.push(
        ...Array.from({ length: noOfShownPages }, (_, i) => i + 1)
      );
    }
    if (lastPageNumber - currentPage > Math.floor(noOfShownPages / 2)) {
      pageNumbers.push("...");
    }
  }

  useEffect(() => {
    setData(
      initialData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    );
  }, [pageSize, currentPage]);

  const goToNextPage = () => {
    if (currentPage !== lastPageNumber) {
      setCurrentPage((current) => current + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((current) => current - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber !== currentPage && typeof pageNumber === "number") {
      setCurrentPage(pageNumber);
    }
  };

  return {
    page: {
      data,
      numbers: pageNumbers,
      current: initialData.length === 0 ? null : currentPage,
      next: initialData.length === 0 ? null : goToNextPageNumber,
      previous: initialData.length === 0 ? null : goToPreviousPageNumber,
      last: lastPageNumber,
    },
    action: {
      goToNextPage,
      goToPreviousPage,
      goTo: goToPage,
    },
  };
};
