function addProductInLocalstorege() {
    
    const productName = document.querySelector('.product-name').value
    const productDescription = document.querySelector('.product-description').value
    const productPrice = document.querySelector('.product-price').value
    const productCategory = document.querySelector('.product-category').value
    const productImage = document.querySelector('.product-image').value
    const productQuantity = document.querySelector('.product-quantity').value


    const imageValidation = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi

    if (!productImage.match(imageValidation)) {
        alert('invalid URL')
        return
    }

    let product = 
    {
        'productNmae' : productName,
        'productDescription' : productDescription,
        'productPrice' : productPrice,
        'productCategory' : productCategory,
        'productImage' : productImage,
        'productQuantity' : productQuantity
    }

    localStorage.setItem('product', JSON.stringify(product))


    // localStorage.setItem('product', `${productId}${productName}${productDescription}${productPrice}${productCategory}${productImage}${productQuantity}`)
    // localStorage.setItem(`productName-${productId}`, productName)
    // localStorage.setItem(`productDescription-${productId}`, productDescription)
    // localStorage.setItem(`productPrice-${productId}`, productPrice)
    // localStorage.setItem(`productCategory-${productId}`, productCategory)
    // localStorage.setItem(`productImage-${productId}`, productImage)
    // localStorage.setItem(`productQuantity-${productId}`, productQuantity)



    

}

document.querySelector('.submit').addEventListener('click', addProductInLocalstorege)