const ctx= document.getElementById("myChart").getContext("2d");

let delayed;

let gradient = ctx.createLinearGradient(0,0,0,400);
gradient.addColorStop(0, "rgba(59,184,188,1)");
gradient.addColorStop(1, "rgba(0,255,255,0.1)");

const years = [
    "2012", 
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
];

const data = {
    labels: years,
    datasets: [
        {
            data: [321, 326, 290, 350, 420, 440, 480, 500, 295, 410 ],
            label: 'Total de ventas',
            fill : true,
            backgroundColor: gradient, // 'rgb(180,206,77)' 'rgb(83,109,179' //'rgb(59,184,188)' // 'rgb(143,113,176)'
            borderColor: 'rgb(59,184,188)',
            pointBackgroundColor: 'rgb(83,109,179',
            tension: 0.2,
        },
    ],
};

const config = {
    type: 'line',
    data: data,
    options: { 
        radius: 4,
        hitRadius: 30,
        hoverRadius: 10,
        responsive : true,
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === "data" && context.mode === "default" && !delayed) {
                    delay = context.dataIndex * 300 + context.dataIndex * 100;
                }
                return delay;
            },  
        },
        scales: {
            y: {
                ticks: {
                    callback: function (value) {
                        return "$" + value + "M";
                    }
                }
            }
        }
    }
};

const myChart = new Chart(ctx,config);
