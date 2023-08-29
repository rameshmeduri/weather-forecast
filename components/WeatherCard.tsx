import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faThunderstorm, faCloudRain, faCloudShowersHeavy, faSnowflake, faSmog, faTornado, faWind } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

interface WeatherCardProps {
  data: {
    location: string;
    description: string;
    temperature: number;
    humidity: number;
    windSpeed: number;
    date: number;
  };
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, className }) => {
  let icon;
  let color;
  const windSpeed = data.windSpeed * 2.237; // convertMetersPerSecToMPH
  const roundedWindSpeed = Math.round(windSpeed);
  const dataDescriptionStr = data.description.toLowerCase();

  if (dataDescriptionStr.includes('clear')) {
    icon = faSun;
    color = 'orange';
  } else if (dataDescriptionStr.includes('clouds')) {
    icon = faCloud;
    color = 'gray';
  } else if (dataDescriptionStr.includes('rain')) {
    icon = faCloudRain;
    color = 'blue';
  } else if (dataDescriptionStr.includes('thunderstorm')) {
    icon = faThunderstorm;
    color = 'gray';
  } else if (dataDescriptionStr.includes('snow')) {
    icon = faSnowflake;
    color = 'blue';
  } else if (dataDescriptionStr.includes('mist')) {
    icon = faSmog;
    color = 'gray';
  } else if (dataDescriptionStr.includes('tornado')) {
    icon = faTornado;
    color = 'gray';
  } else if (dataDescriptionStr.includes('drizzle')) {
    icon = faCloudShowersHeavy;
    color = 'gray';
  }

  if (windSpeed * 2.237 >= 20) {
    icon = faWind;
    color = 'gray';
  }
  
  return (
    <div className={`bg-white rounded-lg p-4 shadow-md ${className} flex`}>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">{data.location}</h2>
        <p className="text-sm mb-4">{moment.unix(data.date).format('dddd, MMMM Do, YYYY')}</p>
        <p className="mb-2">Description: {data.description}</p>
        <p className="mb-2">Temperature: {Math.round(data.temperature)} °F</p>
        <p className="mb-2">Humidity: {data.humidity}%</p>
        <p className="mb-2">Wind Speed: {roundedWindSpeed} mph</p>
      </div>
      {icon && (
        <div className="flex-shrink-0 self-center mr-8">
          <FontAwesomeIcon icon={icon} size="5x" color={color} />
        </div>
      )}
    </div>
  );
  
};

export default WeatherCard;