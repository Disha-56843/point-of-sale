const product = document.querySelectorAll('.card')
const nodata = document.querySelector('.no-data')
nodata.style.display = 'none'

const input = document.querySelector('#input')
input.value = localStorage.getItem('input-value') ?? ''

function searchProducts(searchValue) {

    let visibleProducts = false

    product.forEach((card) => {
        const pname = card.querySelector('.item-name').innerText
        const price = card.querySelector('#price').innerText

        if (pname.includes(searchValue) || price.includes(searchValue)) {
            card.style.display = 'block'
            visibleProducts = true
           

            return
        }

        card.style.display = 'none'
    })

    if (!visibleProducts) {
        nodata.style.display = 'block'
       


        return
    }

    nodata.style.display = 'none'

}

searchProducts(input.value)

input.addEventListener('input', (event) => {

    const searchValue = event.target.value
    localStorage.setItem('input-value', event.target.value)


    searchProducts(searchValue)
})

