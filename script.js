const currencyElementOne = document.getElementById('currency-one'); // original currency choice
const amountElementOne = document.getElementById('amount-one'); // user-input amount
const currencyElementTwo = document.getElementById('currency-two'); // target currency choice
const amountElementTwo = document.getElementById('amount-two'); // calculated amount dependent on conv. rate

const rateElement = document.getElementById('rate'); // shows conversion rate between the two currencies
const swap = document.getElementById('swap'); // swap button

// Fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currencyElementOne.value; // USD, EUR, etc.
    const currency_two = currencyElementTwo.value; // USD, EUR, etc.

    fetch(`https://v6.exchangerate-api.com/v6/d8bb1361a95661af8cc9a984/latest/${currency_one}`)
    .then(res => res.json()) // res.json() = response from website in JSON format
    .then(data => {
        // console.log(data)
        const rate = data.conversion_rates[currency_two]; // conversion_rates is an array from API
        // [currency_two] looks up numerical value at index currency_two

        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`; // updates conv. rate on screen

        amountElementTwo.value = (amountElementOne.value * rate).toFixed(2); // to at least 2 decimal places
    });
}

// Event listeners
currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    // perform generic swap algorithm on click, and then calculate new conv. rate and display
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
})

calculate();