async function getData() {
  const response = await fetch("./data.json");
  const data = await response.json();
  return data;
}

const data = await getData();
console.log(data);

function controller() {
  const chartBars = document.querySelector(".chart__bars");
  const amountArr = [];
  let highestAmount;

  // RENDER BARS

  data.forEach(bar => {
    amountArr.push(bar.amount);
    const markup = renderChart(bar);
    chartBars.insertAdjacentHTML("afterbegin", markup);
    const chartBar = document.querySelector(".chart__bar");
    chartBar.style.height = `${Math.ceil(bar.amount)}%`;
  });

  // GET HIGHEST AMOUNT AND APPLY BACKGROUND COLOR

  highestAmount = data.filter(
    n => n.amount === Math.max(...amountArr)
  );

  for (const bar of chartBars.children) {
    if (bar.getAttribute("data-day") === highestAmount[0].day) {
      bar.children[1].classList.add("highest");
    }
  }
}

function renderChart(data) {
  const markup = `
    <li class="bar-container" data-day=${data.day}>
      <p class="chart__amount">$${data.amount}</p>
      <div class='chart__bar'></div>
      <p class="chart__legend">${data.day}</p>
    </li>
  `;

  return markup;
}

controller();
