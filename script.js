let products = []

let cart = []

function showProducts() {
    const productContainer = document.querySelector('.products-container')
    showCategory()

    fetch('https://fakestoreapi.com/products?limit=5')
        .then(response => response.json())
        .then(apiProducts => {

            apiProducts.forEach(product => {

                products.push({ ...product, name: product.title })

            })

            products.forEach((product) => {

                let shortDescription
                let shortName

                if (product.description.length > 30) {
                    shortDescription = `${product.description.slice(0, 30)}...`
                }

                if (product.description.length > 20) {
                    shortName = `${product.description.slice(0, 20)}...`
                }

                productContainer.innerHTML += `<div class="products products-${product.id}" style="cursor: pointer">
                                                    <h3 class="item-name">${shortName}</h3>
                                                    <span class="description">${shortDescription}</span>
                                                    <div class="bottom-part-of-product">
                                                        <span class="dollar">$<span class="price-product">${product.price}</span></span>
                                                        <img src="${product.image}" alt="${product.name}" class="card-img">
                                                    </div>
                                                </div>`

                // updateProductAvailability()
            })
            products.forEach((product) => {

                document.querySelector(`.products-${product.id}`).addEventListener('click', () => {
                    addToCart(product)
                    updateInvoice()
                })

            })
        })

}

function updateProductAvailability() {
    products.forEach((product) => {
        const productElements = document.querySelectorAll('.products')

        productElements.forEach((productElement) => {
            const productName = productElement.querySelector('.item-name').innerHTML

            if (productName === product.name) {
                let quantityInCart = 0
                const foundItem = cart.find(item => item.id === product.id)
                if (foundItem) {
                    quantityInCart = foundItem.quantity
                }

                if (quantityInCart >= product.quantity_limit) {
                    productElement.style.pointerEvents = 'none'
                    productElement.style.cursor = 'not-allowed'

                    productElement.classList.add('js-product-out-of-stock')


                } else {
                    productElement.classList.remove('js-product-out-of-stock')

                    productElement.style.pointerEvents = 'auto'
                }
            }
        })
    })
}

function showCategory() {

    const categoryList = document.querySelector('.category-list')

    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(apiCategories => {

            categoryList.innerHTML += `<li class="list-items select"onclick="updateCategoryUI('all')">All items</li>`

            apiCategories.forEach(category => {
                categoryList.innerHTML += `<li class="list-items select"onclick="updateCategoryUI('${category}')">${category}</li>`
            })
            // <li class="list-items select"onclick="updateCategoryUI(${apiCategory[1]})">${apiCategory[1]}</li>
            // <li class="list-items select"onclick="updateCategoryUI(${apiCategory[2]})">${apiCategory[2]}</li>
            // <li class="list-items select"onclick="updateCategoryUI(${apiCategory[3]})">${apiCategory[3]}</li>`
        })


}

function sortSearch(category, searchInputValue) {
    let visibleProducts = false
    const nodata = document.querySelector('.no-data')

    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(response => response.json())
        .then(products => {
            // console.log(products)
            console.log(category)

            products.forEach((product) => {

                const productElements = document.getElementsByClassName(`products-${product.id}`)
                const productElement = ''

                if (productElements.length > 0) {
                    productElement = productElements[0]
                }

                const productName = product.name
                const productPrice = product.price.toString()
                const productCategory = product.category
                // console.log(productCategory)

                const isOutOfStock = productElement.classList.contains('js-product-out-of-stock')
                const matchesCategory = category === 'all' || productCategory === category
                const matchesSearch = productName.toLowerCase().includes(searchInputValue.toLowerCase()) || productPrice.includes(searchInputValue)

                if (matchesSearch) {
                    if (category === 'all') {

                        productElement.style.display = 'block'
                        if (isOutOfStock) {
                            productElement.style.opacity = 0.5
                            visibleProducts = true

                            return
                        }
                        productElement.style.opacity = 1
                        visibleProducts = true
                    } else {
                        if (matchesCategory && !isOutOfStock) {
                            productElement.style.display = 'block'
                            productElement.style.opacity = 1
                            visibleProducts = true

                        } else {
                            productElement.style.display = 'none'
                        }
                    }
                } else {
                    productElement.style.display = 'none'
                }
                nodata.style.display = visibleProducts ? 'none' : 'block'
            })
        })
        .catch(error => {
            console.error('Error fetching products:', error)
        })
}

function updateCategoryUI(category) {

    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(apiCategory => {


            let categoryList = {
                all: 'All items',
            }
            
            apiCategory.forEach(category => {
                categoryList = { 'category': category }
                // console.log(categoryList)
            })


            document.querySelectorAll('.list-items').forEach((element) => {
                if (element.innerHTML.trim() === categoryList[category]) {
                    element.classList.add('select')
                } else {
                    element.classList.remove('select')
                }
            })
            const searchInputValue = document.getElementById('search-product').value
            sortSearch(category, searchInputValue)

            localStorage.setItem('selectedCategory', category)
        }
        )
        .catch(error => console.error('Error fetching categories:', error))
}

function addToCart(product) {

    const existingProduct = cart.find(existingProductInCart => existingProductInCart.id === product.id)

    if (existingProduct && existingProduct.quantity < product.quantity_limit) {
        existingProduct.quantity++

        localStorage.setItem(`cartProduct-${product.id}-quantity`, existingProduct.quantity)

        updateInvoice()
        updateProductAvailability()
    }

    else {

        cart.push({ ...product, quantity: 1 })
        localStorage.setItem(`cartProduct-${product.id}-quantity`, 1)

    }

    displayCart()
    updateInvoice()
    updateProductAvailability()
}

function displayCart() {

    const cartItemContainer = document.querySelector('.order-container')

    cartItemContainer.innerHTML = ''
    cart.forEach(cartProduct => {

        cartItemContainer.innerHTML +=
            `<div class="orders orders-${cartProduct.id}">
                <img src="${cartProduct.image}" alt="${cartProduct.name}" style="height: 60px; width: 75px; border-radius: 5px;" />
                <h4 class="ordered-product-name">${cartProduct.name}</h4>
                <button class="decrement">-</button>
                <span class="quantity">${cartProduct.quantity}</span>
                <button class="increment">+</button>
                <span class="ordered-product-price">$${(cartProduct.price * cartProduct.quantity).toFixed(2)}</span>
                <button class="remove-product">x</button>
            </div>`

    })

    addToCartEventHandlers()

}

function addToCartEventHandlers() {

    cart.forEach(cartProduct => {

        const purchasedProductContainer = document.querySelector(`.orders-${cartProduct.id}`)

        purchasedProductContainer.querySelector('.decrement').addEventListener('click', function () {

            if (cartProduct.quantity > 1) {
                cartProduct.quantity--

                localStorage.setItem(`cartProduct-${cartProduct.id}-quantity`, cartProduct.quantity)


            } else {
                if (cartProduct.quantity === 1) {
                    if (confirm('Do you want to remove this item from the cart?')) {
                        cart.splice(cart.findIndex(cartItem => cartItem.id === cartProduct.id), 1)

                        purchasedProductContainer.remove()
                        localStorage.removeItem(`cartProduct-${cartProduct.id}-quantity`)

                        return
                    }

                    return
                }
                purchasedProductContainer.remove()
            }
            displayCart()
            updateInvoice()
            updateProductAvailability()
        })

        purchasedProductContainer.querySelector('.increment').addEventListener('click', function () {
            const quantityLimit = cartProduct.quantity_limit

            if (cartProduct.quantity < quantityLimit) {
                cartProduct.quantity++

            } else {
                alert('Cannot add more of this product to the cart. Quantity limit reached.')
            }

            localStorage.setItem(`cartProduct-${cartProduct.id}-quantity`, cartProduct.quantity)

            displayCart()
            updateInvoice()
            updateProductAvailability()
        })


        purchasedProductContainer.querySelector('.remove-product').addEventListener('click', function () {
            cart.splice(cart.findIndex(cartItem => cartItem.id === cartProduct.id), 1)

            localStorage.removeItem(`cartProduct-${cartProduct.id}-quantity`)
            purchasedProductContainer.remove()

            displayCart()
            updateInvoice()
            updateProductAvailability()

        })
    })

}

function loadCart() {

    const localstorageProductKeys = Object.keys(localStorage)
    cart = []

    localstorageProductKeys.forEach(localstorageProductKey => {
        if (localstorageProductKey.startsWith('cartProduct-')) {
            const id = localstorageProductKey.split('-')[1]
            const quantity = localStorage.getItem(`cartProduct-${id}-quantity`)


            const product = products.find(product => product.id.toString() === id)
            if (product) {

                const existingProduct = cart.find(cartItem => cartItem.id.toString() === id)
                if (existingProduct) {

                    existingProduct.quantity = quantity
                } else {

                    cart.push({ ...product, quantity })
                }
            }
        }
    })

    displayCart()
    updateInvoice()
    updateProductAvailability()
}

document.addEventListener('DOMContentLoaded', () => {

    loadCart()

})

function updateInvoice() {
    let subtotal = 0

    cart.forEach((orderContainer) => {

        subtotal = orderContainer.price * orderContainer.quantity
    })

    const discount = (5 * subtotal) / 100
    const salesTax = (18 * subtotal) / 100
    const total = subtotal - discount + salesTax

    document.querySelector('.js-subtotal').innerHTML = `$${subtotal.toFixed(2)}`
    document.querySelector('.js-discount').innerHTML = `- $${discount.toFixed(2)}`
    document.querySelector('.js-sales-tax').innerHTML = `$${salesTax.toFixed(2)}`
    document.querySelector('.js-total-of-product').innerHTML = `$${total.toFixed(2)}`

    updateProducts()
}

function updateProducts() {
    document.querySelector('.products-container').innerHTML = ''
    // showProducts()

    const retrieveSavedSearchInputValue =
        localStorage.getItem('searchProduct') || ''
    const retrieveSavedCategory =
        localStorage.getItem('selectedCategory') || 'all'

    sortSearch(retrieveSavedCategory, retrieveSavedSearchInputValue)
    updateCategoryUI(retrieveSavedCategory)
}

document.getElementById('clear-all-button').addEventListener('click', function () {
    if (cart.length > 0) {
        if (confirm('Are you sure you want to clear cart')) {
            document.querySelector('.order-container').innerHTML = ''
            cart = []
            localStorage.clear()
        }

    }
    else {
        alert('No item to clear')
    }

    updateInvoice()
})

if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'))
    console.log('hey')
}

showProducts()

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'k' || event.key === 'K')) {
        event.preventDefault()

        document.getElementById('search-product').focus()

    }
})

const retrieveSavedSearchInputValue = localStorage.getItem('searchProduct') || ''
const retrieveSavedCategory = localStorage.getItem('selectedCategory') || 'all'


document.getElementById('search-product').value = retrieveSavedSearchInputValue

document.getElementById('search-product').addEventListener('input', (event) => {
    const searchInputValue = event.target.value
    const selectedCategory = localStorage.getItem('selectedCategory') || 'all'
    sortSearch(selectedCategory, searchInputValue)
    localStorage.setItem('searchProduct', searchInputValue)
})

sortSearch(retrieveSavedCategory, retrieveSavedSearchInputValue)
updateCategoryUI(retrieveSavedCategory)
