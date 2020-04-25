import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {

  const [ dailyData, setDailyData ] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const initialData = await fetchDailyData();

      setDailyData(initialData);
    }

    fetchApi();
  }, [])

  const lineChart = (
    
    dailyData.length
      ?
        <Line
          data={{
            labels: dailyData.map(({ date }) => date ),
            datasets: [{
              data: dailyData.map(({ confirmed }) => confirmed ),
              label: 'Infectados',
              borderColor: '#3333ff',
              fill: true
            }, {
              data: dailyData.map(({ deaths }) => deaths ),
              label: 'Fallecidos',
              borderColor: 'red',
              backgroundColor: 'rgba(255,0,0,0.5)',
              fill: true
            }]
          }}
        ></Line>
      : null
  );

  const barChar = (
    confirmed
      ? (
          <Bar
            data={{
              labels: ['Infectados', 'Recuperados', 'Fallecidos'],
              datasets: [{
                label: 'Personas',
                backgroundColor: ['rgba(0,0,255,0.5', 'rgba(0,255,0,0.5', 'rgba(255,0,0,0.5'],
                data: [ confirmed.value, recovered.value, deaths.value ],
              }],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Estado actual en ${country} ` }
            }}
          ></Bar>
        )
      : null
  )

  return (
    <div className={styles.container}>
      { country ? barChar : lineChart }
    </div>
  );
}

export default Chart;