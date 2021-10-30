function SearchController({ makeQuery, setSearchName, setSelectedCountry, countries}) {
    return (
        <div className="max-w-full flex flex-col bg-white rounded-lg shadow p-3 mb-5 sm:mx-5">
            <input 
                onChange={e => setSearchName(e.target.value)}
                className="p-1 bg-gray-100 border border-gray-300 rounded" 
                placeholder="name" />
            
            <div className="w-full mt-2">
                <select
                    onChange={e => setSelectedCountry(e.target.value)} 
                    className="w-full p-1 bg-gray-200 rounded shadow-2xl">
                    <option value="">all countries</option>
                    { countries.map(country => <option key={country} value={country}>{country}</option>) }
                </select>
            </div>

            <button 
                onClick={makeQuery} 
                className="mt-4 p-2 rounded bg-green-200 shadow font-mono"
            > 
                search {'->'}
            </button>
        </div>
    );
}

export default SearchController;