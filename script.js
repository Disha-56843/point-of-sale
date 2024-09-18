const products = [
    {
        id: 1,
        name: 'STONEBERG',
        description: 'Men Formal Shirt',
        price: 1.75,
        image: 'https://tinyurl.com/men-striped-formal-shirt',
        alt: 'Men_Shirt',
        category: 'Men Shirt',
        quantity_limit: 4,
    },

    {
        id: 2,
        name: 'FIBERMILL',
        description: 'Men Printed Shirt',
        price: 11.75,
        image: 'https://tinyurl.com/men-printed-casual-shirt',
        alt: 'Men_Shirt',
        category: 'Men Shirt',
        quantity_limit: 6,
    },

    {
        id: 3,
        name: 'CHEMISTRY',
        description: 'Women Casual Shirt',
        price: 12.75,
        image: 'https://tinyurl.com/women-casual-shirt',
        alt: 'Women_Shirt',
        category: 'Women Shirt',
        quantity_limit: 3,
    },

    {
        id: 4,
        name: 'TURRITOPSIS',
        description: 'Women Retro Shirts',
        price: 11.25,
        image: 'https://tinyurl.com/women-classic-retro-shirts',
        alt: 'Women_Shirt',
        category: 'Women Shirt',
        quantity_limit: 7,
    },

    {
        id: 5,
        name: 'zenesty',
        description: 'Women Casual Shirt',
        price: 13.75,
        image: 'https://tinyurl.com/women-solid-casual-shirt',
        alt: 'Women_Shirt',
        category: 'Women Shirt',
        quantity_limit: 2,
    },

    {
        id: 6,
        name: 'Spykar',
        description: 'Men Skinny Fit Jeans',
        price: 11.5,
        image:
            'https://rukminim2.flixcart.com/image/612/612/xif0q/jean/i/8/k/32-udjeno1328-u-s-polo-assn-denim-co-original-imagypf6b4g5rfe6.jpeg?q=70',
        alt: 'Men_Jeans',
        category: 'Men Jeans',
        quantity_limit: 9,
    },

    {
        id: 7,
        name: 'JACK & JONES',
        description: 'Men Skinny Fit Jeans',
        price: 10.75,
        image:
            'https://rukminim2.flixcart.com/image/612/612/xif0q/jean/x/s/o/32-fmjen2840-flying-machine-original-imagzrsja5zpajrz.jpeg?q=70',
        alt: 'Men_Jeans',
        category: 'Men Jeans',
        quantity_limit: 7,
    },

    {
        id: 8,
        name: 'TYFFYN',
        description: 'Women Black Jeans',
        price: 13.5,
        image:
            'https://rukminim2.flixcart.com/image/612/612/xif0q/jean/x/h/p/28-wd-black-2z-nucouths-original-imahfysehpazsnns.jpeg?q=70',
        alt: 'Women_Jeans',
        category: 'Women Jeans',
        quantity_limit: 10,
    },

    {
        id: 9,
        name: 'Miss Chase',
        description: 'Women Black Jeans',
        price: 16.75,
        image:
            'https://rukminim2.flixcart.com/image/612/612/l12h1u80/jean/m/l/q/34-jeans-black2-4-zayla-original-imagcpy6jgjj43um.jpeg?q=70',
        alt: 'Women_Jeans',
        category: 'Women Jeans',
        quantity_limit: 4,
    },
]

let cart = []

function showProducts() {
    const productContainer = document.querySelector('.products-container')

    products.forEach((product) => {

        productContainer.innerHTML += `<div class="products products-${product.id}" style="cursor: pointer" data-category="${product.category}">
            <h3 class="item-name">${product.name}</h3>
            <span class="description">${product.description}</span>
            <div class="bottom-part-of-product">
                <span class="dollar">$<span class="price-product">${product.price}</span></span>
                <img src="${product.image}" alt="${product.name}" class="card-img">
            </div>
        </div>`

        updateProductAvailability()
    })

    products.forEach((product) => {

        document.querySelector(`.products-${product.id}`).addEventListener('click', () => {
            addToCart(product)
            updateCart()
        })

    })

}

function updateProductAvailability() {
    products.forEach((product) => {
        const productElements = document.querySelectorAll('.products')

        productElements.forEach((productElement) => {
            const productName = productElement.querySelector('.item-name').innerText

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

// script js 
function sortSearch(category, searchInputValue) {
    let visibleProducts = false
    const nodata = document.querySelector('.no-data')

    document.querySelectorAll('.products').forEach((product) => {
        const productName = product.querySelector('.item-name').innerText
        const productPrice = product.querySelector('.price-product').innerText
        const productCategory = product.getAttribute('data-category')
        const isOutOfStock = product.classList.contains('js-product-out-of-stock')

        const matchesCategory = category === 'all' || productCategory === category
        const matchesSearch = productName.includes(searchInputValue) || productPrice.includes(searchInputValue)

        if (matchesSearch) {
            if (category === 'all') {
                product.style.display = 'block'
                if (isOutOfStock) {
                    product.style.opacity = 0.5
                    visibleProducts = true

                    return
                }
                product.style.opacity = 1
                visibleProducts = true
            } else {
                if (matchesCategory && !isOutOfStock) {
                    product.style.display = 'block'
                    product.style.opacity = 1
                    visibleProducts = true

                } else {
                    product.style.display = 'none'
                }
            }
        } else {
            product.style.display = 'none'
        }
    })

    nodata.style.display = visibleProducts ? 'none' : 'block'
}

function updateCategoryUI(category) {
    const categoryList = {
        all: 'All items',
        'Men Shirt': 'Men Shirt',
        'Women Shirt': 'Women Shirt',
        'Men Jeans': 'Men Jeans',
        'Women Jeans': 'Women Jeans',
    }

    document.querySelectorAll('.list-items').forEach((el) => {
        if (el.innerHTML.trim() === categoryList[category]) {
            el.classList.add('select')
        } else {
            el.classList.remove('select')
        }
    })
    const searchInputValue = document.getElementById('search-product').value
    sortSearch(category, searchInputValue)

    localStorage.setItem('selectedCategory', category)
}


// script js over 


function addToCart(product) {

    const existingProduct = cart.find(existingProductInCart => existingProductInCart.id === product.id)
    const purchasedProductContainer = document.querySelector(`.orders-${product.id}`)

    if (existingProduct && existingProduct.quantity < product.quantity_limit) {
        purchasedProductContainer.querySelector('.quantity').innerHTML = ++existingProduct.quantity

        updateCart()
        updateProductAvailability()
    }

    else {

        cart.push({ ...product, quantity: 1 })

    }

    renderCart()
    updateCart()
    updateProductAvailability()
}

function renderCart() {

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
                <span class="ordered-product-price">$${cartProduct.price * cartProduct.quantity}</span>
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
                purchasedProductContainer.querySelector('.quantity').innerHTML = --cartProduct.quantity

                renderCart()
                updateCart()
                updateProductAvailability()
            } else {
                if (cartProduct.quantity === 1) {
                    if (confirm('Do you want to remove this item from the cart?')) {
                        cart.splice(cart.findIndex(cartItem => cartItem.id === cartProduct.id), 1)

                        purchasedProductContainer.remove()
                        renderCart()
                        updateCart()
                        updateProductAvailability()

                        return
                    }

                    return
                }
                purchasedProductContainer.remove()
            }
        })

        purchasedProductContainer.querySelector('.increment').addEventListener('click', function () {
            const quantityLimit = cartProduct.quantity_limit

            if (cartProduct.quantity < quantityLimit) {
                purchasedProductContainer.querySelector('.quantity').innerHTML = ++cartProduct.quantity;

                renderCart()
                updateCart()
                updateProductAvailability()
            } else {
                alert('Cannot add more of this product to the cart. Quantity limit reached.')
            }
        })


        purchasedProductContainer.querySelector('.remove-product').addEventListener('click', function () {
            cart.splice(cart.findIndex(cartItem => cartItem.id === cartProduct.id), 1)

            purchasedProductContainer.remove()
            renderCart()
            updateCart()
            updateProductAvailability()

        })
    })

}

function updateCart() {
    const cartItemContainer = document.querySelector('.order-container')
    let subtotal = 0

    Array.from(cartItemContainer.children).forEach((orderContainer) => {
        const priceText = orderContainer
            .querySelector('.ordered-product-price')
            .innerHTML.replace('$', '')
        const price = parseFloat(priceText)

        subtotal += price
    })

    const discount = (5 * subtotal) / 100
    const salesTax = (18 * subtotal) / 100
    const total = subtotal - discount + salesTax

    document.querySelector('.js-subtotal').innerText = `$${subtotal.toFixed(2)}`
    document.querySelector('.js-discount').innerHTML = `- $${discount.toFixed(
        2
    )}`
    document.querySelector('.js-sales-tax').innerHTML = `$${salesTax.toFixed(2)}`
    document.querySelector('.js-total-of-product').innerHTML = `$${total.toFixed(
        2
    )}`

    updateProducts()
}

function updateProducts() {
    document.querySelector('.products-container').innerHTML = ''
    showProducts()

    const retrieveSavedSearchInputValue =
        localStorage.getItem('searchProduct') || ''
    const retrieveSavedCategory =
        localStorage.getItem('selectedCategory') || 'all'

    sortSearch(retrieveSavedCategory, retrieveSavedSearchInputValue)
    updateCategoryUI(retrieveSavedCategory)
}

document.getElementById('clear-all-button').addEventListener('click', function () {
    const cartItemList = document.querySelector('.order-container')
    if (cartItemList.children.length > 0) {
        if (confirm('Are you sure you want to clear cart')) {


            while (cartItemList.firstChild) {
                cartItemList.removeChild(cartItemList.firstChild)
            }
        }

    }
    else {
        alert('No item to clear')
    }
    cart = []
    updateCart()
})

showProducts()

function sortProductsByNameAndPrice(sortCriteria) {
    const productContainer = document.querySelector('.products-container')
    const sortIconContainer = document.querySelector('.js-sort-icon')
    const isOutOfStock = products.forEach((product) => product.isOutOfStock)
    // const productElements = Array.from(productContainer.querySelectorAll('.products'))
    // const isOutOfStock = document.querySelectorAll('.products').forEach((product) => {product.classList.contains('js-product-out-of-stock')})

    sortIconContainer.innerHTML = ''

    if (sortCriteria === 'select') {

        updateProducts()

    } else if (sortCriteria === 'Sort by: name') {

        sortIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="js-a-to-z-sort" height='14px' width:'14px'><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3l0 293.5L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7l0-293.5 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z"/></svg>`

        document.querySelector('.js-a-to-z-sort').addEventListener('click', () => {
            products.sort((product1, product2) => {
                // const productName1 = productElement1.querySelector('.item-name').innerText.toLowerCase()
                // const productName2 = productElement2.querySelector('.item-name').innerText.toLowerCase()
                return product1.name.toLowerCase().localeCompare(product2.name.toLowerCase)
            })

            productContainer.innerHTML = ''
            products.forEach(product => {
                const productElement = document.getElementById(product.id)
                productContainer.appendChild(productElement)
            })


            sortIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class='js-z-to-a-sort' height='14px' width:'14px'><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`

            document.querySelector('.js-z-to-a-sort').addEventListener('click', () => {
                products.sort((product1, product2) => {
                    // const productName1 = productElement1.querySelector('.item-name').innerText.toLowerCase()
                    // const productName2 = productElement2.querySelector('.item-name').innerText.toLowerCase()
                    return product2.name.toLowerCase().localeCompare(product1.name.toLowerCase())
                })

                productContainer.innerHTML = ''
                products.forEach(product => {
                    const productElement = document.getElementById(product.id)
                    productContainer.appendChild(productElement)
                })


                sortIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="js-sort-back-normal" height='14px' width:'14px'><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`

                document.querySelector('.js-sort-back-normal').addEventListener('click', () => {

                    updateProducts()
                    sortProductsByNameAndPrice(sortCriteria)

                })
            })
        })


    } else if (sortCriteria === 'Sort by: price') {
        sortIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="fa-solid fa-arrows-up-down js-low-to-high-sort" height='14px' width:'14px'><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3l0 293.5L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7l0-293.5 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z"/></svg>`

        document.querySelector('.js-low-to-high-sort').addEventListener('click', () => {
            products.sort((product1, product2) => {
                // const productPrice1 = parseFloat(productElement1.querySelector('.price-product').innerText)
                // const productPrice2 = parseFloat(productElement2.querySelector('.price-product').innerText)
                return product1.price - product2.price
            })

            productContainer.innerHTML = ''
            products.forEach(product => {
                const productElement = document.getElementById(product.id)
                productContainer.appendChild(productElement)
            })


            sortIconContainer.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class='js-high-to-low-sort' height='14px' width:'14px'><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>`

            document.querySelector('.js-high-to-low-sort').addEventListener('click', () => {
                products.sort((product1, product2) => {
                    // const productPrice1 = parseFloat(productElement1.querySelector('.price-product').innerText)
                    // const productPrice2 = parseFloat(productElement2.querySelector('.price-product').innerText)
                    return product2.price - product1.price
                })

                productContainer.innerHTML = ''
                products.forEach(product => {
                    const productElement = document.getElementById(product.id)
                    productContainer.appendChild(productElement)
                })


                sortIconContainer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="js-sort-back-normal" height='14px' width:'14px'><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>`

                document.querySelector('.js-sort-back-normal').addEventListener('click', () => {

                    updateProducts()
                    sortProductsByNameAndPrice(sortCriteria)

                })
            })
        })

    }


}

document.querySelector('.sort-product').addEventListener('change', (event) => {
    const selectedSortCriteria = event.target.value
    sortProductsByNameAndPrice(selectedSortCriteria)
})

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && (event.key === 'k' || event.key === 'K')) {
        event.preventDefault()
        const searchContainer = document.getElementById('search-product')
        if (
            searchContainer.style.display === 'none' ||
            searchContainer.style.display === ''
        ) {
            searchContainer.style.display = 'block'
            document.getElementById('search-product').focus()
        } else {
            searchContainer.style.display = 'none'
        }
    }
})

// Local Storage start 

const retrieveSavedSearchInputValue =
    localStorage.getItem('searchProduct') || ''
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

// local Storage end 