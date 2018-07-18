window.onload = function () {
    // document.getElementById('currencyName').value = '';
    // document.getElementById('currencyStartDate').value = '';


    document.querySelector("#submitButton").addEventListener("click", function () {
        let currencyName = document.querySelector("#currencyName").value;
        let currencyInformationType = document.querySelector("#currencyInformationType").value;
        let currencyStartDate = document.querySelector("#currencyStartDate").value;
        let currencyEndDate = document.querySelector("#currencyEndDate").value;
        console.log(currencyName, currencyInformationType, currencyStartDate, currencyEndDate);
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
        if(cit === 'Bid' || cit === 'Ask') {
            return 'c';
        } else {
            return 'a';
        }
    }


    function currTable(currencyInformationType) {
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