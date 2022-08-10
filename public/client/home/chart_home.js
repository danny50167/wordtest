function getCookie(cname) {
  let name = cname + "=";
  let ca = decodeURIComponent(document.cookie).split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const userDB = JSON.parse(getCookie("userDB"));

console.log(userDB);

let history = userDB.history;
if (history.length > 10) {
  history.slice(0, 10);
}

let labels = [];
let scores = [];
history.forEach((study) => {
  labels.push(study.date);
  scores.push(study.score);
});

console.log(labels);

const data = {
  labels: labels,
  datasets: [
    {
      label: "Recent scores",
      backgroundColor: "rgb(110, 110, 248)",
      borderColor: "rgb(110, 110, 248)",
      data: scores,
      tension: 0.1,
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    layout: {
      padding: 20,
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18,
          },
        },
      },
    },
  },
};

const myChart = new Chart(document.getElementById("myChart"), config);
