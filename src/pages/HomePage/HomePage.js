import { useEffect, useState } from "react";
import SearchController from "../../components/SearchController/SearchController";
import HumanoidsList from "../../components/HumanoidsList/HumanoidsList";
import PageSelector from "../../components/PageSelector/PageSelector";

function HomePage(props) {
  const [humanoids, setHumanoids] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchName, setSearchName] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [haveHumanoids, setHaveHumanoids] = useState(false);

  // function fetchHumanoids
  // function fetchCountries

  useEffect(() => {
    console.log(queryParams);
    console.log(`pag=${currentPage}`);
    console.log(process.env.REACT_APP_API_URL);
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
      })
      .catch((err) => {
        setHaveHumanoids(false);
        setHumanoids([]);
      });
  }, [currentPage, queryParams]);

  useEffect(() => {
    fetch(process.env.API_URL + "/api/countries")
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

  return (
    <div className="flex flex-col items-center p-3 text-gray-600 sm:flex-row-reverse sm:justify-center sm:items-start">
      <SearchController
        makeQuery={makeQuery}
        setSearchName={setSearchName}
        setSelectedCountry={setSelectedCountry}
        countries={countries}
      />
      <div className="flex-col items-stretch flex-grow max-w-xl">
        {haveHumanoids ? (
          <HumanoidsList humanoids={humanoids} />
        ) : (
          <h2 className="text-center text-xl">No Humanoids Found</h2>
        )}
        {haveHumanoids && (
          <PageSelector
            pagesCount={pagesCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
