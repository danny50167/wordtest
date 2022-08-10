const form = document.getElementById("form");
const input = document.getElementsByClassName("input");
const input_id = document.getElementById("input_ID");
const input_pw = document.getElementById("input_PW");
const btn = document.getElementById("btn");

fetch("db/users.json")
  .then((response) => response.json())
  .then((users) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(users);

      if (users[input_id.value] == undefined) {
        console.log(1);
        alert("This ID doesn't exsist!");
      } else if (users[input_id.value]["pw"] != input_pw.value) {
        console.log(2);
        alert("Incorrect Password!");
      } else {
        console.log(3);

        let canSubmit = true;
        Array.from(input).forEach((input) => {
          if (!input.value) {
            canSubmit = false;
            alert(`Insert your ${input.name}.`);
          }
        });

        if (canSubmit) {
          form.submit();
        }
      }
    });
  });

document.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    btn.click();
  }
});
