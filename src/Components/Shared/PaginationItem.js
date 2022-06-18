import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";

function PaginationItem({ currentPage, setCurrentPage, totalPages, onPress }) {
  const [disable, setDisable] = useState(0);

  const disabling = () => {
    if (currentPage === 1 && currentPage === totalPages) {
      setDisable(-2);
    } else if (currentPage > 1 && currentPage === totalPages) {
      setDisable(1);
    } else if (currentPage === 1 && currentPage < totalPages) {
      setDisable(-1);
    } else {
      setDisable(0);
    }
  };

  useEffect(() => {
    disabling();
  }, [currentPage]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination>
        <Pagination.Prev
          disabled={disable === -1 || disable === -2 ? true : false}
          onClick={() => {
            onPress({ cPage: currentPage - 1 });
            setCurrentPage(currentPage - 1);
          }}
        />
        <Pagination.Ellipsis disabled />
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Ellipsis disabled />
        <Pagination.Next
          disabled={disable === 1 || disable === -2 ? true : false}
          onClick={() => {
            onPress({ cPage: currentPage + 1 });
            setCurrentPage(currentPage + 1);
          }}
        />
      </Pagination>
    </div>
  );
}

export default PaginationItem;
