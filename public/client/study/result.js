const result_big = document.getElementById("result_big");
const result_image = document.getElementById("result_image");
const result_small = document.getElementById("result_small");
const hidden = document.getElementById("hidden");
const btn = document.getElementById("btn");

const result = JSON.parse(localStorage.getItem("result"));

const score = result.score;
const score_100 = Math.round((score[0] / score[1]) * 100);

result_small.innerHTML = `${result.score[0]}/${result.score[1]}`;
result_image.innerHTML = result.image;
result_big.innerHTML = score_100;
hidden.value = score_100;

localStorage.removeItem("result");
