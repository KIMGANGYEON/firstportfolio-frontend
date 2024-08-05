import axios from "axios";

export const getNaverBook = async () => {
  const response = await axios.get("/v1/search/book.json", {
    params: { query: "자기계발", display: 20, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response;
};

export const newSearchBook = async (search, count) => {
  const response = await axios.get("/v1/search/book.json", {
    params: { query: search, display: count, start: 1, sort: "sim" },
    headers: {
      "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
    },
  });
  return response.data.items;
};
