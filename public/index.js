function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}

async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=5e4609e3bfd542e89f9995c8e2d0eaa6')
    let result = await response.json()
   
    const { GME, MSFT, DIS, BNTX } = result;

    const stocks = [GME, MSFT, DIS, BNTX];

    stocks.forEach( stock => stock.values.reverse())

    // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.reverse().map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                data: stock.values.reverse().map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),
            }))
        }
    });

        // Time Chart
        new Chart(highestPriceChartCanvas.getContext('2d'), {
            type: 'bar',
            data: {
                labels: stocks.map(stock => stock.meta.symbol),
                datasets: [{
                    label: 'Highest',
                    data: stocks.map(stock => priceHigh(stock.values)),
                    backgroundColor: stocks.map( stock => (getColor(stock.meta.symbol))),
                    borderColor: stocks.map( stock => (getColor(stock.meta.symbol))),
                
                }]
                     }
                });






        
}

function priceHigh(values){
    let highNum = 0;
    values.forEach(value => {
        if(parseFloat(value.high) > highNum){
            highNum = value.high
        }
    })
    return highNum;
}

main()