import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchUsed } from "../../../../store/thunkFunctions";
import axios from "axios";
import { Link } from "react-router-dom";

const UsedSearch = () => {
  const searchWord = localStorage.getItem("searchWord");
  const [searchResults, setSearchResults] = useState([]);
  const getSearch = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}search/used`,
        {
          key: searchWord,
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSearch();
  }, []);

  return (
    <section className="search-new">
      {searchResults.length === 0 ? (
        <h1 style={{ fontSize: 30, marginTop: 10, marginLeft: 30 }}>
          검색된 결과가 없습니다
        </h1>
      ) : (
        <div className="new-book">
          <div className="new-header">
            <h1>검색결과</h1>
          </div>
          {searchResults?.map((book, index) => (
            <div key={book.id} className="new-book-box">
              <div className="new-book-img">
                <Link to={`/product/used/detail/${book._id}`}>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}${book.images[0]}`}
                    alt=""
                  />
                </Link>
              </div>
              <div className="new-book-text">
                <h1>{book.title}</h1>
                {book.description.length > 1199 ? (
                  <h1>{book.description.slice(0, 1200)}....</h1>
                ) : (
                  <h1>{book.description}</h1>
                )}

                <h1>{book.discount}원</h1>
              </div>
            </div>
          ))}
          <div className="new-book-btn">
            <button>더보기</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default UsedSearch;
