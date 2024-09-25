function addProductInLocalstorege() {
    
    const productName = document.querySelector('.product-name').value
    const productDescription = document.querySelector('.product-description').value
    const productPrice = document.querySelector('.product-price').value
    const productCategory = document.querySelector('.product-category').value
    const productImage = document.querySelector('.product-image').value
    const productQuantity = document.querySelector('.product-quantity').value

    let productId = parseInt(Math.random() * 100)

    const imageValidation = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi

    if (!productImage.match(imageValidation)) {
        alert('invalid URL')
        return
    }   

    let product = 
    {
        'productId' : productId,
        'productName' : productName,
        'productDescription' : productDescription,
        'productPrice' : productPrice,
        'productCategory' : productCategory,
        'productImage' : productImage,
        'productQuantity' : productQuantity
    }

    localStorage.setItem(`product-${productId}`, JSON.stringify(product))    

}

document.querySelector('.submit').addEventListener('click', addProductInLocalstorege)