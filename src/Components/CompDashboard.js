import React, { useState} from 'react';
import './CompDashboard.css';

function CompDashboard() {
    const [location, setLocation] = useState([]);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                fetchWeatherData(position.coords.latitude, position.coords.longitude);
            }, (error) => {
                console.error('Error getting location:', error);
            });
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }

    const fetchWeatherData = async (longitude, latitude) => {
        console.log('useEffect INSIDE');
        try {
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${longitude}, ${latitude}?unitGroup=metric&key=LHTBXUM6KMXN94P9DWRHTDHX4&contentType=json`
            );
            if (response.ok) {
                const data = await response.json();
                // Set values in the HTML elements
                document.getElementById('resolvedAddress').textContent = data.resolvedAddress;
                document.getElementById('temp').textContent = data.currentConditions.temp;
                document.getElementById('feelslike').textContent = data.currentConditions.feelslike;
                document.getElementById('humidity').textContent = data.currentConditions.humidity;
                document.getElementById('pressure').textContent = data.currentConditions.pressure;
                document.getElementById('conditions').textContent = data.currentConditions.conditions;
            } else {
                console.log('Error:', response.statusText);
            }
        } catch (error) {
            console.log('Error:', error.message);
        }
    };

    return (
        <div>
            <div className="row" >
                <h1 className="col-md-6">Weather information</h1>
            </div>
            <div className="mt-5">
                <div className="row">
                    <div className="col-sm-6 col-md-4 mt-2">
                        <div className="card bg-dark text-white animated fadeInUp">
                        <div className="card-body">
                            <h5 className="card-title">
                                <button className="btn btn-warning" onClick={getLocation}>
                                    Click here to get your location
                                </button>
                            </h5>
                            <div className="weather-box">
                                {location ? (
                                    <div>
                                        Latitude: {location.latitude}
                                        <br />
                                        Longitude: {location.longitude}
                                    </div>
                                ) : (
                                    'Location not available'
                                )}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 mt-2">
                        <div className="card bg-dark text-white animated fadeInUp">
                        <div className="card-body">
                            <h5 className="card-title">Location</h5>
                            <div className="weather-box">
                            <span id="resolvedAddress">Xyz</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 mt-2">
                        <div className="card bg-dark text-white animated fadeInUp">
                        <div className="card-body">
                            <h5 className="card-title">Temperature</h5>
                            <div className="weather-box">
                            <span id="temp">19.6</span>°C
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 mt-2">
                        <div className="card bg-dark text-white animated fadeInUp">
                        <div className="card-body">
                            <h5 className="card-title">Feels Like</h5>
                            <div className="weather-box">
                            <span id="feelslike">19.6</span>°C
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 mt-2">
                        <div className="card bg-dark text-white animated fadeInUp">
                        <div className="card-body">
                            <h5 className="card-title">Humidity</h5>
                            <div className="weather-box">
                            <span id="humidity">32</span>%
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 mt-2">
                        <div className="card bg-dark text-white animated fadeInUp">
                        <div className="card-body">
                            <h5 className="card-title">Pressure</h5>
                            <div className="weather-box">
                            <span id="pressure">1020.5</span> hPa
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-4 mt-2">
                        <div className="card bg-dark text-white animated fadeInUp">
                        <div className="card-body">
                            <h5 className="card-title">Conditions</h5>
                            <div className="weather-box">
                            <span id="conditions">Clear</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompDashboard;
