const cards = document.querySelectorAll('.card')

input.addEventListener('input', (event) => {
    cards.forEach((card) => {
        const name = card.querySelector('h3').innerText
        const price = card.querySelector('#price').innerText

        if (name.includes(event.target.value) || price.includes(event.target.value)) {
            card.style.display = 'block'

            return
        }
        card.style.display = 'none'
    })
})
