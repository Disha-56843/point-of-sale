const input = document.getElementById("input");
const cards = document.querySelectorAll(".card");

input.addEventListener("input", () => {

    const input_value = input.value;

    cards.forEach(card => {

      const name = card.querySelector("h3").innerText;
      const price = card.querySelector("#price").innerText;

      if(name.includes(input_value) || price.includes(input_value))
      {
        card.style.display = ""; 
      }
      else
      {
        card.style.display = "none";
      }
    });

})
