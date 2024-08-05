import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchUsed } from "../../../../store/thunkFunctions";
import axios from "axios";

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
    <section>
      <div>
        {searchResults.map((item, index) => (
          <div key={index}>
            <h1>{item.title}</h1>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UsedSearch;
