import CountryInfo from "../CountryInfo/CountryInfo";

function HumanoidItem({ humanoid }) {
    return (
        <div className="cursor-pointer bg-white shadow rounded flex items-center pl-4 py-3 mb-2 overflow-hidden sm:flex-row-reverse sm:justify-between sm:pr-4 sm:mr-5">
    
            <img className="rounded-full" src={`http://${humanoid.thumbnail_url}`} alt={humanoid.name}/>

            <div className="flex flex-col justify-between items-center p-2 sm:flex-row-reverse sm:flex-grow sm:max-w-xs">
                <p className="block text-xl">{humanoid.name} {humanoid.surname}</p>
                <CountryInfo countryName={humanoid.country}/>
            </div>
    
        </div>
    );
}

export default HumanoidItem;