'use strict';

const chartData = document.querySelector('.chart-data__graph');

populateChart();

async function populateChart() {
   chartData.innerHTML = '';

   await fetch('../data/data.json')
      .then((res) => res.json())
      .then((data) => {
         // COUNT MAX EXPENSE
         let maxAmount = 0;
         data.forEach((day) => {
            maxAmount = maxAmount < day.amount ? day.amount : maxAmount;
         });

         // CREATE NEW DIV ELEMENT FOR EACH DAY
         data.forEach((day, index) => {
            const div = document.createElement('div');
            div.className =
               new Date().getDay() === index + 1 ? 'day current' : 'day';

            div.innerHTML = `
            <div class="day-amount">
            <div class="day-sum">$${day.amount}</div>
            </div>
            <p class="day-name">${day.day}</p>
            `;

            chartData.appendChild(div);

            // // CALCULATE HEIGHT FOR CURRENT DIV ACCORDING TO MAX EXPENSE

            const currentDiv = document
               .querySelectorAll('.day .day-amount')
               .item(index);
            const currentHeight = Math.floor(
               currentDiv.getBoundingClientRect().height *
                  (maxAmount > 0 ? day.amount / maxAmount : 0)
            );

            currentDiv.style.height = `${currentHeight}px`;
            console.log(currentHeight);
         });
      });
}
