import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchState } from "../../../../atom";
import { useQuery } from "@tanstack/react-query";
import { newSearchBook } from "../../../../api";

const NewSearch = () => {
  const search = localStorage.getItem("searchWord");
  const [count, setCount] = useState(20);
  const { isLoading, data } = useQuery({
    queryKey: ["newSearch", search, count],
    queryFn: () => newSearchBook(search, count),
  });
  const dataArray = Array.isArray(data) ? data : [];
  const dataCount = dataArray.length;

  const handleClick = () => {
    setCount((prev) => prev + 20);
  };
  return (
    <section>
      {dataCount === 0 ? (
        <h1 style={{ fontSize: 30, marginTop: 10, marginLeft: 30 }}>
          검색된 결과가 없습니다
        </h1>
      ) : (
        <div>
          {data?.map((book, index) => (
            <div key={index}>
              <h1>{book.title}</h1>
            </div>
          ))}
          <button onClick={handleClick}>더보기</button>
        </div>
      )}
    </section>
  );
};

export default NewSearch;
