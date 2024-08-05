const cards = document.querySelectorAll('.card')

const nodata = document.querySelector('.no-data')
nodata.style.display = 'none'

input.addEventListener('input', (event) => {
    cards.forEach((card) => {
        const name = card.querySelector('h3').innerText
        const price = card.querySelector('#price').innerText

        if (name.includes(event.target.value) || price.includes(event.target.value)) {
            card.style.display = 'block'
            nodata.style.display = 'none'

            return
        }
        if (card.style.display == 'none') {
            nodata.style.display = 'block'
            nodata.innerHTML = 'No Result Found'

        }
        card.style.display = 'none'


    })
})
