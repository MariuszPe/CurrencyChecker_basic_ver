window.onload = function () {
    // document.getElementById('currencyName').value = '';
    // document.getElementById('currencyStartDate').value = '';


    document.querySelector("#submitButton").addEventListener("click", function () {
        let currencyName = document.querySelector("#currencyName").value;
        let currencyInformationType = document.querySelector("#currencyInformationType").value;
        let currencyStartDate = document.querySelector("#currencyStartDate").value;
        let currencyEndDate = document.querySelector("#currencyEndDate").value;
        let dataContainer = [];
        //console.log(currencyName, currencyInformationType, currencyStartDate, currencyEndDate);
        document.getElementById("answer").innerHTML = '';

        let ciType = bidAskAverage(currencyInformationType);

        let xmlhttp = new XMLHttpRequest();
        let url = 'http://api.nbp.pl/api/exchangerates/rates/' + ciType + '/' + currencyName +
            '/' + currencyStartDate + '/' + currencyEndDate;

        let cR = currTable(currencyInformationType);

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let myArr = (JSON.parse(this.responseText)).rates;

                myArr.forEach(i => {
                    document.getElementById("answer").innerHTML += "<strong>Date: </strong>" +
                        i.effectiveDate + " <strong>Rate: </strong>" + i[cR] + "<br>";
                    drawChart(i.effectiveDate);
                });

            } else if (this.status == 404) {
                document.getElementById("answer").innerHTML = "Selected data doesn't exist";
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    });

    function bidAskAverage(currencyInformationType) {
        let cit = currencyInformationType;
        if (cit === 'Bid' || cit === 'Ask') {
            return 'c';
        } else {
            return 'a';
        }
    }


    function currTable(currencyInformationType) {
        let cit = currencyInformationType;
        if (cit === 'Bid') {
            return 'bid';
        } else if (cit === 'Ask') {
            return 'ask';
        } else {
            return 'mid';
        }
    }






    function drawChart(date) {

        let dateY = date.substr(0, 4);
        let dateM = date.substr(5, 2);
        let dateD = date.substr(8, 2);
        console.log(date);
        let chart = new CanvasJS.Chart("myChart", {
            animationEnabled: true,
            title: {
                text: "Currency rate in selected peroid of time"
            },
            axisX: {
                valueFormatString: "YYYY MM DD",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: "Closing Price (in USD)",
                includeZero: false,
                valueFormatString: "$##0.00",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true,
                    labelFormatter: function (e) {
                        return "$" + CanvasJS.formatNumber(e.value, "##0.00");
                    }
                }
            },
            data: [
                {
                    type: "line",
                    dataPoints: [
                        { x: new Date(dateY, dateM, dateD), y: 76.727997 },
                        { x: new Date(dateY, dateM, dateD), y: 71.727997 }

                    ]
                }
            ]
        });
        chart.render();
    }




    //check https://canvasjs.com/javascript-charts/json-data-api-ajax-chart/


}



