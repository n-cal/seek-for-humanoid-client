import { useEffect, useState } from "react";
import SearchController from "../../components/SearchController/SearchController";
import HumanoidsList from "../../components/HumanoidsList/HumanoidsList";
import PageSelector from "../../components/PageSelector/PageSelector";
import Loader from "../../components/Loader/Loader";

function HomePage(props) {
  const [humanoids, setHumanoids] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchName, setSearchName] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [haveHumanoids, setHaveHumanoids] = useState(false);
  const [loading, setLoading] = useState(true);

  // function fetchHumanoids
  // function fetchCountries

  useEffect(() => {
    setLoading(true);
    fetch(
      process.env.REACT_APP_API_URL +
        `/api/humanoids?pag=${currentPage}` +
        (queryParams ? "&" + queryParams : "")
    )
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("error fetching humanoids");
        } else {
          return response.json();
        }
      })
      .then((json) => {
        if (json.count === 0) {
          throw new Error("no humanoids in response");
        }

        setPagesCount(Math.floor(json.count / json.results.length));
        setHumanoids(json.results);
        setHaveHumanoids(true);
        setLoading(false);
      })
      .catch((err) => {
        setHaveHumanoids(false);
        setHumanoids([]);
        setLoading(false);
      });
  }, [currentPage, queryParams]);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "/api/countries")
      .then((response) => response.json())
      .then((json) => {
        setCountries(json);
        if (!json.includes(selectedCountry)) {
          setSelectedCountry("");
        }
      })
      .catch((err) => {
        setCountries([]);
      });
  }, [currentPage, queryParams]);

  function makeQuery() {
    const params = new URLSearchParams();

    if (selectedCountry) {
      params.append("country", selectedCountry);
    }

    let searchValue = searchName
      .split(" ")
      .filter((ch) => ch)
      .join(" ");

    if (searchValue) {
      params.append("search", searchValue);
    }

    if (!params.has("country") && !params.has("search")) {
      setCurrentPage(1);
      setQueryParams("");
      return;
    }

    setCurrentPage(1);
    setQueryParams(params.toString());
  }

  let content = null;

  if (loading) {
    content = <Loader />;
  } else if (haveHumanoids) {
    content = [
      <HumanoidsList humanoids={humanoids} />,
      <PageSelector {...{ pagesCount, currentPage, setCurrentPage }} />,
    ];
  } else {
    content = <h1 className="text-center text-xl">No Humanoids found </h1>;
  }

  return (
    <div className="flex flex-col items-center p-3 text-gray-600 sm:flex-row-reverse sm:justify-center sm:items-start">
      <SearchController
        makeQuery={makeQuery}
        setSearchName={setSearchName}
        setSelectedCountry={setSelectedCountry}
        countries={countries}
      />
      <div className="flex-col items-stretch flex-grow max-w-xl">{content}</div>
    </div>
  );
}

export default HomePage;
