// 1. get all the relative dom elements to use for rendering
// 2. fetch pictures from backend
// 3. render them

let objs = {
    body: null,
    inputCity: null,
    btnSearch: null,
    carousel: null
}

const unsplashKey = `umeDgXdnAgwbYZXM2kb1lloJOLMlUjcodGv-mTdjg8U`


objs.body = document.querySelector('body')
objs.inputCity = document.querySelector('.searchBar input')
objs.btnSearch = document.querySelector('.searchBar button')
objs.carousel = document.querySelector('.carousel')

const fetchData = function () {
    const newCity = objs.inputCity.value.trim().toLowerCase() || 'macbook'
    fetch(`https://api.unsplash.com/search/photos?client_id=${unsplashKey}&query=${newCity}&orientation=landscape`)
        .then(response => response.json()) // equal to function (response) {return response.json()}
        .then(data => {
            //todo: render image carousel
            console.log('data raw', data)
            renderImages(data.results)
            // usually we need to check whether results was null
            createCarousel(data.results)
        })


}

const renderImages = function (arrImages) {
    // set background image with the new data got
    const img = arrImages[0].urls.full
    objs.body.style.background = `url('${img}') no-repeat center center fixed`
    // create carousel
    createCarousel(arrImages)
}

const createCarousel = function (arrImages) {
    // to avoid hard code
    for (let i = 0; i < arrImages.length; i++) {
        let item = document.createElement('div')
        item.className = 'imgContainer'

        const img = arrImages[i].urls.regular
        item.style.background = `url(${img}) no-repeat center center fixed`
        item.dataset.index = i
        objs.carousel.appendChild(item)
        item.addEventListener('click', evt => console.log('clicked...'))
    }

}

fetchData()
objs.btnSearch.addEventListener('click', fetchData) // if use fetchData(), the return value will be given to 'click'


// where to get the fetch API address
// background fixed meaning

// reasons for no ele show:
// 1. covered
// 2. opcity
// 3. display: none
// 4. axis out of show; visiblity: credit
// 5. div empty: width/height = 0