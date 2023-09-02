import React, { useEffect, useState, useRef } from 'react';
import './CompDashboard.css';

let json_data = [];

function CompDashboard() {
    const [weatherData, setWeatherData] = useState(json_data);
    const effect = useRef(false);

    useEffect(() => {
        if (effect.current) {
            const fetchWeatherData = async () => {
                console.log('useEffect INSIDE');
                try {
                    const response = await fetch(
                        'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Pallara?unitGroup=metric&key=LHTBXUM6KMXN94P9DWRHTDHX4&contentType=json'
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setWeatherData(data);
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
            fetchWeatherData();
        }

        return () => {
            console.log('useEffect unmounted');
            effect.current = true;
        };
    }, []);

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
