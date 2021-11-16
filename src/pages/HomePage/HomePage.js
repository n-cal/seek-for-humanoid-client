import { useEffect, useState } from "react";
import SearchController from "../../components/SearchController/SearchController";
import HumanoidsList from "../../components/HumanoidsList/HumanoidsList";
import PageSelector from "../../components/PageSelector/PageSelector";
import Loader from "../../components/Loader/Loader";

function HomePage(props) {
  const [humanoidsResult, setHumanoidsResult] = useState({
    count: 0,
    results: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [searchName, setSearchName] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const retrieveHumanoids = async () => {
      const humanoidsUrl =
        process.env.REACT_APP_API_URL +
        `/api/humanoids?pag=${currentPage}` +
        (queryParams ? "&" + queryParams : "");
  
      const humanoidsResponse = await fetch(humanoidsUrl);
  
      if (humanoidsResponse.status !== 200) {
        throw new Error("error retrieving humanoids");
      }
  
      const json = await humanoidsResponse.json();
      setHumanoidsResult({ count: json.count, results: json.results });
    };

    const retrieveCountries = async () => {
      const countriesUrl = process.env.REACT_APP_API_URL + "/api/countries";
  
      const countriesResponse = await fetch(countriesUrl);
  
      if (countriesResponse.status !== 200) {
        throw new Error("error retrieving countries");
      }
  
      const json = await countriesResponse.json();
      setCountries(json);
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        await retrieveHumanoids();
        await retrieveCountries();
        setError(false);
      } catch (e) {
        setError(true);
        setHumanoidsResult({ count: 0, results: [] });
        setCountries([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
  } else if (error) {
    content = <h1 className="text-center text-xl">An Error Occurred!</h1>;
  } else if (humanoidsResult.count > 0) {
    content = [
      <HumanoidsList key="1" humanoids={humanoidsResult.results} />,
      <PageSelector
        key="2"
        resultsCount={humanoidsResult.count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />,
    ];
  } else {
    content = <h1 className="text-center text-xl">No Humanoids Found</h1>;
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
