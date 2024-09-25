function addProductInLocalStorage() {
    const productName = document.querySelector('.product-name').value
    const productDescription = document.querySelector('.product-description').value
    const productPrice = document.querySelector('.product-price').value
    const productCategory = document.querySelector('.product-category').value
    const productImage = document.querySelector('.product-image').value
    const productQuantity = document.querySelector('.product-quantity').value

    let productId = parseInt(Math.random() * 100)

    let products = []

    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'))
    }

    let product = {
        id: productId,
        name: productName,
        description: productDescription,
        price: productPrice,
        image: productImage,
        alt: productName,
        category: productCategory,
        quantity_limit: productQuantity
    }

    localStorage.setItem('products', JSON.stringify([...products, product]))
}

document.querySelector('.submit').addEventListener('click', addProductInLocalStorage)
