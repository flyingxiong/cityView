objs = {
    eleDiv: document.querySelector('div'),
    eleBody: document.querySelector('body')
}
console.log(objs.eleDiv)

let t = setTimeout(() => {
    objs.eleDiv.classList.add('static')}, 2000)


objs.eleBody.addEventListener('mousemove', ()=>{
    if (t) { objs.eleDiv.classList.remove('static')
    clearTimeout(t)
    console.log('move')
    }
})