// 1. get all the relative dom elements to use for rendering
// 2. fetch pictures from backend
// 3. render them

let objs = {
    body: null,
    inputCity: null,
    btnSearch: null,
    carousel: null,
    preUrl : null,
}

const unsplashKey = `umeDgXdnAgwbYZXM2kb1lloJOLMlUjcodGv-mTdjg8U`


objs.body = document.querySelector('body')
objs.inputCity = document.querySelector('.searchBar input')
objs.btnSearch = document.querySelector('.searchBar button')
objs.carousel = document.querySelector('.carousel')


const setKeyEvent = function (){
    objs.inputCity.addEventListener('keyup', function (evt){
        if (evt.key === 'Enter' && objs.inputCity.value.trim().length) {
            fetchData()
        }
    })

    // todo: add more key event here
}

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

const updateBackgroundImage = function (url) {
    objs.body.style.background = `url('${url}') no-repeat center center fixed`
}

const createCarousel = function (arrImages) {
    objs.carousel.innerHTML = ''
    // to avoid hard code
    for (let i = 0; i < arrImages.length; i++) {
        let item = document.createElement('div')
        item.className = 'imgContainer'

        const img = arrImages[i].urls.regular
        item.style.background = `url(${img}) no-repeat center center fixed`
        item.dataset.index = i
        item.dataset.url = arrImages[i].urls.full
        objs.carousel.appendChild(item)
        item.addEventListener('click', evt => updateBackgroundImage(evt.target.dataset.url))
        item.addEventListener('mouseenter', evt => {
            let newUrl = evt.target.dataset.url
            // replace the background image temporaryly
            if (!objs.preUrl) {
                let str = objs.body.style.background
                let iStart = str.indexOf('"')
                let iEnd = str.indexOf('"', iStart + 1)
                str = str.slice(iStart + 1, iEnd)
                objs.preUrl = str
                updateBackgroundImage(newUrl)
            }

        })
        item.addEventListener('mouseleave', evt => {
            if (objs.preUrl) {
                updateBackgroundImage(objs.preUrl)
                objs.preUrl = null
            }
        })
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