import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@components/Layout';
import Search from '@components/Search';
import WeatherCard from '@components/WeatherCard';
import ForecastCard from '@components/ForecastCard';

interface WeatherData {
  location: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  date: number;
}

interface ForecastData {
  date: number;
  icon: string;
  temp: number;
}

const Home = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  
  const handleSearch = async (location: string) => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );

    if (response.ok) {
      const data = await response.json();
      setWeatherData({
        location: `${data.name}, ${data.sys.country}`,
        description: data.weather[0].description,
        temperature: (data.main.temp * 9) / 5 + 32, // Celsius to Fahrenheit conversion
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        date: data.dt
      });         
    } else {
      console.error(`Error fetching weather data: ${response.statusText}`);
      toast.error('No city found, please try again', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
    );

    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      const dailyData = forecastData.list.filter((item: any) =>
        item.dt_txt.includes('12:00:00')
      );
      setForecastData(
        dailyData.map((item: any) => ({
          date: item.dt,
          icon: item.weather[0].icon,
          temp: (item.main.temp * 9) / 5 + 32
        }))
      );
    } else {
      console.error(`Error fetching forecast data: ${forecastResponse.statusText}`);
    }
  };


  return (
    <Layout weather={weatherData?.description}>
      <ToastContainer />
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col w-full">
          <Search onSearch={handleSearch} />
          {weatherData && (
            <WeatherCard
              data={weatherData}
              className="mb-4 w-full md:w-auto"
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecastData.map((data, index) => (
              <ForecastCard key={index} data={data} className="forecast-card" />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;