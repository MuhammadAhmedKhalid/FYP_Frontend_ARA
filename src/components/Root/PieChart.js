import React from 'react'
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import '../Styling/HomeScreen.css'

function PieChart(props) {

    const {title, num, labels, backgroundColor, hoverBackgroundColor} = props

    const data = {
        labels: labels,
        datasets: [
            {
                data: num,
                backgroundColor: backgroundColor,
                hoverBackgroundColor: hoverBackgroundColor,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: { egend: { labels: { font: { family: 'Arial', size: 14 }}}},
        elements: { arc: { borderWidth: 1, borderColor: '#FFFFFF' }},
        layout: { padding: { left: 10, right: 10, top: 10, bottom: 10 }}
    };

    return (
    <div className="chart-container flexbox-container-y">
        <Pie type='line' data={data} options={options}/>
        <p style={{color: 'black', fontSize: '15px'}}>{title}</p>
    </div>
    )
}

export default PieChart