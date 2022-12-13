objs = {
    eleDiv: document.querySelector('div'),
    eleBody: document.querySelector('body'),
    elePage: document
}
console.log(objs.eleDiv)

let t = setTimeout(() => {
    objs.eleDiv.classList.add('static')}, 2000)

// objs.elePage.addEventListener('click', () => {console.log('move')})
objs.elePage.addEventListener('mousemove', ()=>{
    if (t) { objs.eleDiv.classList.remove('static')
    clearTimeout(t)
    }
    t = setTimeout(() => {
        objs.eleDiv.classList.add('static')}, 2000)
})