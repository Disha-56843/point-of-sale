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
    const cartItemContainer = document.querySelector('.order-container')

    const existingProduct = cart.find(existingProductInCart => existingProductInCart.id === product.id)
    const orderContainer = document.querySelector(`.orders-${product.id}`)

    if (existingProduct && existingProduct.quantity < product.quantity_limit) {
        orderContainer.querySelector('.quantity').innerHTML = ++existingProduct.quantity
        existingProduct.price = product.price * existingProduct.quantity

        updateCart()
        updateProductAvailability()
    }

    else {

        cart.push({ ...product, quantity: 1 })

        cartItemContainer.innerHTML = ''
        cart.forEach(cartProducts => {

            cartItemContainer.innerHTML +=
                `<div class="orders orders-${cartProducts.id}">
                    <img src="${cartProducts.image}" alt="${cartProducts.name}" style="height: 60px; width: 75px; border-radius: 5px;" />
                    <h4 class="ordered-product-name">${cartProducts.name}</h4>
                    <button class="decrement">-</button>
                    <span class="quantity">${cartProducts.quantity}</span>
                    <button class="increment">+</button>
                    <span class="ordered-product-price">$${cartProducts.price}</span>
                    <button class="cancel-product">x</button>
                </div>`



            const orderContainer = document.querySelector(`.orders-${cartProducts.id}`)

            orderContainer.querySelector('.decrement').addEventListener('click', function () {
                const cartProduct = cart.find(cartItem => cartItem.id === product.id)

                if (cartProduct && cartProduct.quantity > 1) {
                    orderContainer.querySelector('.quantity').innerHTML = --cartProducts.quantity;

                    console.log(cartProducts.quantity)
                    orderContainer.querySelector('.ordered-product-price').innerHTML = `$${(
                        parseFloat(cartProducts.price) * cartProducts.quantity
                    ).toFixed(2)}`

                    updateCart()
                    updateProductAvailability()
                } else {
                    if (cartProduct && cartProduct.quantity === 1) {
                        if (confirm('Do you want to remove this item from the cart?')) {
                            cart.splice(cart.findIndex(cartItem => cartItem.id === product.id), 1)

                            orderContainer.remove()
                            updateCart()
                            updateProductAvailability()

                            return
                        }

                        return
                    }
                    cartProducts.remove()
                }
            }
            )

            orderContainer.querySelector('.increment').addEventListener('click', function () {
                const cartProduct = cart.find(cartItem => cartItem.id === product.id)
                const quantityLimit = product.quantity_limit

                if (cartProducts && cartProducts.quantity < quantityLimit) {
                    orderContainer.querySelector('.quantity').innerHTML = ++cartProducts.quantity;

                    orderContainer.querySelector('.ordered-product-price').innerHTML = `$${(
                        parseFloat(cartProducts.price) * cartProducts.quantity
                    ).toFixed(2)}`

                    updateCart()
                    updateProductAvailability()
                } else {
                    alert('Cannot add more of this product to the cart. Quantity limit reached.')
                }
            })


            orderContainer.querySelector('.cancel-product').addEventListener('click', function () {
                cart.splice(cart.findIndex(cartItem => cartItem.id === product.id), 1)

                orderContainer.remove()
                updateCart()
                updateProductAvailability()

            })


        })
    }

    updateCart()
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
    const productElements = Array.from(productContainer.querySelectorAll('.products'))
    const sortIconContainer = document.querySelector('.js-sort-icon')

    sortIconContainer.innerHTML = ''

    if (sortCriteria === 'select') {     

        updateProducts()

    } else if (sortCriteria === 'Sort by: name') {
        const aToZSortIcon = document.createElement('button')
        aToZSortIcon.classList.add('fa-solid', 'fa-arrows-up-down')
        sortIconContainer.appendChild(aToZSortIcon)

        aToZSortIcon.addEventListener('click', () => {
            productElements.sort((productElement1, productElement2) => {
                const productName1 = productElement1.querySelector('.item-name').innerText.toLowerCase()
                const productName2 = productElement2.querySelector('.item-name').innerText.toLowerCase()
                return productName1.localeCompare(productName2)
            })

            productElements.forEach(productElement => productContainer.appendChild(productElement))


            aToZSortIcon.classList.remove('fa-solid', 'fa-arrows-up-down')
            sortIconContainer.removeChild(aToZSortIcon)

            const zToASortIcon = document.createElement('button')
            zToASortIcon.classList.add('fa-solid', 'fa-arrow-up')
            sortIconContainer.appendChild(zToASortIcon)

            zToASortIcon.addEventListener('click', () => {
                productElements.sort((productElement1, productElement2) => {
                    const productName1 = productElement1.querySelector('.item-name').innerText.toLowerCase()
                    const productName2 = productElement2.querySelector('.item-name').innerText.toLowerCase()
                    return productName2.localeCompare(productName1)
                })

                productElements.forEach(productElement => productContainer.appendChild(productElement))


                zToASortIcon.classList.remove('fa-solid', 'fa-arrow-up')
                sortIconContainer.removeChild(zToASortIcon)

                const sortBackNormal = document.createElement('button')
                sortBackNormal.classList.add('fa-solid', 'fa-arrow-down')
                sortIconContainer.appendChild(sortBackNormal)

                sortBackNormal.addEventListener('click', () => {

                    updateProducts()

                    sortBackNormal.classList.remove('fa-solid', 'fa-arrow-down')
                    sortIconContainer.removeChild(sortBackNormal)

                    const resetsort = document.createElement('button')
                    resetsort.classList.add('fa-solid', 'fa-arrows-up-down')
                    sortIconContainer.appendChild(resetsort)

                })
            })
        })


    } else if (sortCriteria === 'Sort by: price') {
        const lowToHighpriceShortIcon = document.createElement('button')
        lowToHighpriceShortIcon.classList.add('fa-solid', 'fa-arrows-up-down')
        sortIconContainer.appendChild(lowToHighpriceShortIcon)

        lowToHighpriceShortIcon.addEventListener('click', () => {
            productElements.sort((productElement1, productElement2) => {
                const productPrice1 = parseFloat(productElement1.querySelector('.price-product').innerText)
                const productPrice2 = parseFloat(productElement2.querySelector('.price-product').innerText)
                return productPrice1 - productPrice2
            })


            productElements.forEach(productElement => productContainer.appendChild(productElement))


            lowToHighpriceShortIcon.classList.remove('fa-solid', 'fa-arrows-up-down')
            sortIconContainer.removeChild(lowToHighpriceShortIcon)

            const highToLowPriceShortIcon = document.createElement('button')
            highToLowPriceShortIcon.classList.add('fa-solid', 'fa-arrow-up')
            sortIconContainer.appendChild(highToLowPriceShortIcon)

            highToLowPriceShortIcon.addEventListener('click', () => {
                productElements.sort((productElement1, productElement2) => {
                    const productPrice1 = parseFloat(productElement1.querySelector('.price-product').innerText)
                    const productPrice2 = parseFloat(productElement2.querySelector('.price-product').innerText)
                    return productPrice2 - productPrice1
                })


                productElements.forEach(productElement => productContainer.appendChild(productElement))


                highToLowPriceShortIcon.classList.remove('fa-solid', 'fa-arrow-up')
                sortIconContainer.removeChild(highToLowPriceShortIcon)

                const sortBackNormal = document.createElement('button')
                sortBackNormal.classList.add('fa-solid', 'fa-arrow-down')
                sortIconContainer.appendChild(sortBackNormal)

                sortBackNormal.addEventListener('click', () => {

                    updateProducts()

                    sortBackNormal.classList.remove('fa-solid', 'fa-arrow-down')
                    sortIconContainer.removeChild(sortBackNormal)


                    const resetsort = document.createElement('button')
                    resetsort.classList.add('fa-solid', 'fa-arrows-up-down')
                    sortIconContainer.appendChild(resetsort)

                })
            })
        })

    } else {
        console.warn('Unknown sort criteria:', sortCriteria)
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