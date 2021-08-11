const currencyElementOne = document.getElementById('currency-one');
const amountElementOne = document.getElementById('amount-one');
const currencyElementTwo = document.getElementById('currency-two');
const amountElementTwo = document.getElementById('amount-two');

const rateElement = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate() {
    const currency_one = currencyElementOne.value;
    const currency_two = currencyElementTwo.value;

    fetch(`https://v6.exchangerate-api.com/v6/d8bb1361a95661af8cc9a984/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        const rate = data.conversion_rates[currency_two];

        rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

        amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    });
}

// Event listeners
currencyElementOne.addEventListener('change', calculate);
amountElementOne.addEventListener('input', calculate);
currencyElementTwo.addEventListener('change', calculate);
amountElementTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();
})

calculate();