import React from "react";
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Bar } from "recharts";
import { Button } from "antd";
import { Link } from "react-router-dom";
import "./chart.css";

interface Person {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

interface DataPoint {
  city: string;
  count: number;
  percent: number;
}

interface Props {
  people: Person[];
}

const CityChart: React.FC<Props> = ({ people }) => {
  // Create an object that will hold the count of people for each city
  const cityCounts: { [key: string]: number } = {};

  // Iterate over the people array and increment the count for each city
  people.forEach((person) => {
    const city = person.address.city;
    cityCounts[city] = (cityCounts[city] || 0) + 1;
  });

  // Convert the cityCounts object to an array of data points for the BarChart
  const data: DataPoint[] = Object.entries(cityCounts).map(([city, count]) => ({
    city,
    count,
    percent: (count / people.length) * 100,
  }));

  return (
    <div className="chartMainContainer">
      <Link to="/">
        <Button className="backToHome">Back to Table</Button>
      </Link>

      <BarChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="percent" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default CityChart;
