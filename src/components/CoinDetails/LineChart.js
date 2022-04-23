import React from 'react'
import {Line} from 'react-chartjs-2'
import {Typography , Col , Row} from 'antd'
import moment from 'moment';
import {Chart as ChartJS} from 'chart.js/auto'


const LineChart = ({coinHistory , currentPrice , coinName}) => {
    const {Title} = Typography;
    const coinPrice = [];
    const coinTimestamp = [];


    // const len = coinHistory.data.history.length;
    // const yLen = coinHistory.data.history.length;
    // for (let i = len-1; i > 0; i--) {
    //   coinPrice.push(coinHistory.data.history[i].price);
    // }
    // for (let i = yLen-1; i > 0; i--) {
    //   coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp*1000).toLocaleDateString("en-US"));
    // }





    for(let i = 0; i<coinHistory.data.history.length; i++){
        coinPrice.push(coinHistory.data.history[i].price)
        coinTimestamp.push(moment.unix(coinHistory.data.history[i].timestamp).format('YYYY-MM-DD'));
        // coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp).toLocaleDateString());

    }
    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };



      
  return (
    <>
    <Row className='chart-header'>
<Title level={2} className='chart-title'>
{coinName} Price Chart
</Title>
<Col>
<Title level={5} className='price-change'>{coinHistory.data.change}% </Title>
<Title level={5} className='current-price'> Current {coinName} Price : $ {currentPrice} </Title>
</Col>
    </Row>
    <Line data={data} options={options} />
    </>
  )
}

export default LineChart
