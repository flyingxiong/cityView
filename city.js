// 1. get all the relative dom elements to use for rendering
// 2. fetch pictures from backend
// 3. render them

let objs = {
    body: null,
    inputCity: null,
    btnSearch: null,
    carousel: null,
    preUrl : null,
    page: {
        cursor: 1,
        total: 1,
    },
    btnPrev: null,
    btnNext: null,
}

const unsplashKey = `umeDgXdnAgwbYZXM2kb1lloJOLMlUjcodGv-mTdjg8U`
const strClassSelected = 'selected'

objs.body = document.querySelector('body')
objs.inputCity = document.querySelector('.searchBar input')
objs.btnSearch = document.querySelector('.searchBar button')
objs.carousel = document.querySelector('.gallary')
objs.btnPrev = document.querySelector('.btnNav.prev')
objs.btnNext = document.querySelector('.btnNav.next')

const setKeyEvent = function (){
    objs.inputCity.addEventListener('keyup', function (evt){
        if (evt.key === 'Enter' && objs.inputCity.value.trim().length) {
            fetchData()
        }
    })

    // todo: add more key event here
    objs.body.addEventListener('keyup', evt => {
        if (evt.key === 'ArrowLeft') {
            console.log('evt')
            prevPage()
        }
        if (evt.key === 'ArrowRight') {
            nextPage()
        }
    })

    objs.btnPrev.addEventListener('click', prevPage)
    objs.btnNext.addEventListener('click', nextPage)

}

const prevPage = function () {
    if (objs.page.cursor > 1) {
        objs.page.cursor--
    }
    fetchData()
}

const nextPage = function () {
    if (objs.page.cursor < objs.page.total) {
        objs.page.cursor ++
    }
    fetchData()
}

const fetchData = function () {
    const newCity = objs.inputCity.value.trim().toLowerCase() || 'macbook'
    fetch(`https://api.unsplash.com/search/photos?client_id=${unsplashKey}&query=${newCity}&orientation=landscape&page=${objs.page.cursor}`)
        .then(response => response.json()) // equal to function (response) {return response.json()}
        .then(data => {
            //todo: render image carousel
            console.log('data raw', data)
            renderImages(data.results)
            objs.page.total = data.total_pages


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

const setImageSelected = function (eleImage) {

    let images = document.querySelectorAll('[data-index]')
    images.forEach(ele => {
        ele.className = ''
    })
    eleImage.className = strClassSelected
}

const createCarousel = function (arrImages) {
    objs.carousel.innerHTML = ''
    // to avoid hard code
    for (let i = 0; i < arrImages.length; i++) {
        let item = document.createElement('div')
        if (i === 0) {
            item.className = strClassSelected
        }
        // item.className = 'imgContainer'
        item.className = ''
        const img = arrImages[i].urls.regular
        item.style.background = `url(${img}) no-repeat center center fixed`
        item.dataset.index = i
        item.style.animation = 'fadeIn 0.25s forwards'
        item.style.animationDelay = `${0.1*i}s`

        item.dataset.url = arrImages[i].urls.full
        objs.carousel.appendChild(item)
        item.addEventListener('click', evt => {
            updateBackgroundImage(evt.target.dataset.url)
            setImageSelected(evt.target)
        })

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
setKeyEvent()
objs.btnSearch.addEventListener('click', fetchData) // if use fetchData(), the return value will be given to 'click'

// where to get the fetch API address
// background fixed meaning

// reasons for no ele show:
// 1. covered
// 2. opcity
// 3. display: none
// 4. axis out of show; visiblity: credit
// 5. div empty: width/height = 0