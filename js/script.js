window.onload = function () {
    document.getElementById('currencyName').value = '';
    document.getElementById('currencyStartDate').value = '';


    document.querySelector("#submitButton").addEventListener("click", function () {
        let currencyName = document.querySelector("#currencyName").value;
        let currencyInformationType = document.querySelector("#currencyInformationType").value;
        let currencyStartDate = document.querySelector("#currencyStartDate").value;
        let currencyEndDate = document.querySelector("#currencyEndDate").value;
        console.log(currencyName, currencyInformationType, currencyStartDate, currencyEndDate);

        let ciType = bidAskAverage(currencyInformationType);

        let xmlhttp = new XMLHttpRequest();
        let url = 'http://api.nbp.pl/api/exchangerates/rates/' + ciType + '/' + currencyName +
        '/' + currencyStartDate;
        let cR = currRepresentation(currencyInformationType);

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let myArr = JSON.parse(this.responseText);
                document.getElementById("answer").innerHTML = "<strong>Date: </strong>" +
                    myArr.rates[0].effectiveDate + "<br>" + "<strong>Rate: </strong>" + 
                    myArr.rates[0][cR];
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    });

    function bidAskAverage(currencyInformationType) {
        let cit = currencyInformationType;
        if(cit === 'Bid' || cit === 'Ask') {
            return 'c';
        } else {
            return 'a';
        }
    }


    function currRepresentation(currencyInformationType) {
        let cit = currencyInformationType;
        if(cit === 'Bid') {
            return 'bid';
        } else if (cit === 'Ask') {
            return 'ask';
        } else {
            return 'mid';
        }
    }

    




}