import React from "react";
import { useSelector } from "react-redux";

function Pagination({isPreviousPage, isNextPage, moveBack, moveNext, pageNumber,}) {
  const languageType = useSelector(
    (state) => state.languageReducer.languageType
  );
  // const languageReducer = useSelector((state) => state.languageReducer);

  return (
    <ul className="pagination justify-content-center mt-3 mb-3">
      <li className="page-item" onClick={isPreviousPage && moveBack}>
        <a
          className="page-link"
          style={{
            background: !isPreviousPage && "#a9a9a9",
          }}
        >
          {languageType.PREV_TEXT}
        </a>
      </li>
      <li className="page-item">
        <a className="page-link">{pageNumber || 0}</a>
      </li>
      <li className="page-item" onClick={isNextPage && moveNext}>
        <a
          className="page-link"
          style={{
            background: !isNextPage && "#a9a9a9",
          }}
        >
         {languageType.NEXT_DAUM}
        </a>
      </li>
    </ul>
  );
}

export default Pagination;
