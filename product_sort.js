function sortProducts(category) {
    
    const cards = Array.from(document.querySelector('#products').children)

    const list = {
        'all': 'All Items',
        'Men Shirt': 'Men_Shirt',
        'Women Shirt': 'Women_Shirt',
        'Men Jeans': 'Men_Jeans',
        'Women Jeans':'Women_Jeans'
    }
    
    cards.forEach(card => {
        
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block'
        } else {
            card.style.display = 'none'
        }
    })

    document.querySelectorAll('.list-item').forEach((el) => {
        if (el.innerHTML === list[category]) {
            el.classList.add('select')
        }
        else
        {
            el.classList.remove('select')
        }
    })
   
    localStorage.setItem('selected-Category', category)
}
const retrieveSavedCategory = localStorage.getItem('selected-Category') || 'all'
sortProducts(retrieveSavedCategory)



