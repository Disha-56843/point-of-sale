document.addEventListener('DOMContentLoaded', () => {
    let searchInputValue = localStorage.getItem('search-input-value') || ''

    document.querySelector('#search-product').value = searchInputValue

    searchProduct(searchInputValue)
})

document.querySelector('#search-product').addEventListener('input', (event) => {
    const inputValue = event.target.value

    localStorage.setItem('search-input-value', inputValue)

    searchProduct(inputValue)
})

function searchProduct(searchInputValue) {
    const products = Array.from(document.querySelector('#products').children)

    let hasVisibleProduct = false

    products.forEach(product => {
        const itemName = product.querySelector('.item-name').textContent.toLowerCase()
        const itemPrice = product.querySelector('.js-item-price').textContent.slice(1)

        const isVisible = itemName.includes(searchInputValue.toLowerCase()) || itemPrice.includes(searchInputValue)
        product.style.display = isVisible ? 'block' : 'none'

        if (isVisible) {
            hasVisibleProduct = true
        }
    })

    const nodata = document.querySelector('.no-data')

    if (!hasVisibleProduct) {
        nodata.style.display = 'block'
    } else {
        nodata.style.display = 'none'
    }
}
