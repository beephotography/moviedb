import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
    const [data, setData] = useState(null);
    const [cityName, setCityName] = useState('');
    const [cityList, setCityList] = useState(undefined);
    const [coordsList, setCoordsList] = useState(
        {
            "latitude": "48.5459",
            "longitude": "10.8518"
        }
    );

    useEffect(() => {
        axios.get('https://api.open-meteo.com/v1/forecast?latitude=' + coordsList.latitude + '&longitude=' + coordsList.longitude + '&current_weather=true')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [coordsList]);

    useEffect(() => {
        console.log(cityList);
    }, [cityList]);

    const handleInputChange = (e) => {
        setCityName(e.target.value);
    };

    const retrieveCityData = (cityName) => {
        const response = axios.get('https://geocoding-api.open-meteo.com/v1/search?name='+cityName+'&count=5&language=de&format=json')
            .then(response => setCityList(response.data.results))
            .catch(error => console.error('Error fetching data:', error))
        ;
    };

    const updateWeather = (longitude, latitude) => {
	setCoordsList(
	    {
	        "latitude": latitude,
		"longitude": longitude
	    }
	);
    }

    const hasCityList = () => {
        if (undefined === cityList) {
            return false;
        }
        return cityList.length > 0;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <div className="w-72 mb-4">
                    <div className="relative w-full min-w-[200px] h-10">
                        <input
                            className="
                      peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 
                      disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 
                      placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 
                      py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                            placeholder=" "
                            onChange={handleInputChange}
                        />
                        <label
                            className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Stadt
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={() => retrieveCityData(cityName)}
                    >
                        Stadt aktualisieren
                    </button>
                </div>
                <div className="mb-4">
                    <ul className="list-decimal">
                        {hasCityList() ? (
                            cityList.map(city => (
                                <li key={city.id} onClick={() => updateWeather(city.longitude, city.latitude)}>
                                    <div>
                                        Longitude: {city.longitude}, Latitude: {city.latitude}
                                    </div>
                                </li>

                            ))
                        ) : (
                            <li className="noCity">Keine Städe gefunden!</li>
                        )}
                    </ul>
                </div>
                <h1 className="text-2xl font-bold mb-4">Wetterdaten</h1>

                {data ? (
                    <div>
                        <p>Temperatur: {data.current_weather.temperature}°C</p>
                        <p>Luftfeuchtigkeit: {data.current_weather.relative_humidity}%</p>
                        <p>Gefühlte Temperatur: {data.current_weather.apparent_temperature}°C</p>
                        <p>Tag/Nacht: {data.current_weather.is_day ? 'Tag' : 'Nacht'}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default App;

