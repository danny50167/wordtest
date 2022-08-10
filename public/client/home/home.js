const display_average = document.getElementById("display_average");

let sum = 0;

userDB.history.forEach((hist) => {
  sum += Number(hist.score);
});

const average = Math.round(sum / userDB.history.length);

display_average.innerHTML = average;
