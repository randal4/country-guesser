export const fetchData = async () => {
  const result = await axios(
    "https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?limit=220&page=1"
  );

  setRawData(result.data);
  setLoading(false);
};
