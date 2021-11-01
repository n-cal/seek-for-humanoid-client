import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CountryInfo from "../../components/CountryInfo/CountryInfo";
import Loader from "../../components/Loader/Loader";

function DetailPage(props) {
  const params = useParams();
  const [humanoid, setHumanoid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_API_URL + `/api/humanoids/${params.id}`)
      .then((response) => response.json())
      .then((json) => {
        setHumanoid(json);
      })
      .catch((err) => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1 className="text-center text-xl">An Error Occurred!</h1>;
  }

  return (
    <div
      className="
      flex flex-col
      text-gray-600
      sm:flex-row sm:items-start sm:justify-center
      p-2
    "
    >
      <div className="flex-col items-center mt-3 max-w-2xl sm:mr-3">
        <div className="flex items-center justify-between bg-white shadow rounded p-3">
          <Link to="/">
            <button className="text-xs bg-green-200 rounded p-1 shadow mr-3 hover:bg-green-50">
              {"<-"} back to list
            </button>
          </Link>
          <h1 className="text-3xl m-auto">
            {humanoid.name} {humanoid.surname}
          </h1>
          <CountryInfo countryName={humanoid.country} />
        </div>

        <div className="bg-white rounded p-4 shadow mt-3">
          <h2 className="text-lg font-bold">{">"} Humanoid Bio</h2>
          <p>{humanoid.bio}</p>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex justify-center mt-3 sm:min-w-max">
          <img
            className="bg-white p-3 rounded shadow"
            src={process.env.REACT_APP_API_URL + humanoid.img_url}
            alt={humanoid.name}
          />
        </div>
        <div className="bg-white rounded shadow p-3 mt-3">
          <h2 className="text-lg font-bold">{">"} Details</h2>
          <p>email - {humanoid.email}</p>
          <p>address - {humanoid.address}</p>
          <p>city - {humanoid.city}</p>
          <p>zip code - {humanoid.zip_code}</p>
          <p>mobile - {humanoid.mobile}</p>
          <p>phone - {humanoid.phone}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
