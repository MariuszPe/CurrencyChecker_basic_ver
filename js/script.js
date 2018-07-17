window.onload = function () {
    document.querySelector("#submitButton").addEventListener("click", function () {
        const currencyName = document.querySelector("#currencyName").value;
        const currencyInformationType = document.querySelector("#currencyInformationType").value;
        const currencyDate = document.querySelector("#currencyDate").value;
        console.log(currencyName, currencyInformationType, currencyDate);


        var xmlhttp = new XMLHttpRequest();
        var url = 'http://api.nbp.pl/api/exchangerates/rates/a/eur';

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                document.getElementById("id01").innerHTML = "Date: " +
                    myArr.rates[0].effectiveDate + "<br>" + "Rate: " + myArr.rates[0].mid;
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

    });
}