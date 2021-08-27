window.location.hash = 'tags=red,blue,purple'

const list = document.querySelector('.list')
const input = document.querySelector('.form-control')
const button = document.querySelector('.btn-primary')

let elements = []

const hashDisplayHandler = () => {
    const tags = window.location.hash
    const str = tags.split('=')[1]
    const colors = str.split(',')

    if (!!colors.length) {
        list.textContent = ''
        colors.map((c) => {
            if(!!c){
                const li = document.createElement('li')
                li.classList.add('color')
                li.id = c
                li.style.backgroundColor = c
                li.innerText = c
                list.appendChild(li)
            }
        })
    }
}

const onElementClickHandler = (e) => {
    const tags = window.location.hash
    const str = tags.split('=')[1]
    const colors = str.split(',')

    window.location.hash = `tags=${colors.filter(c => c !== e.target.id)}`
    colors.map((c) => {
        if(c === e.target.id){
            const li = document.querySelector(`#${c}`)
            list.removeChild(li)
        }
    })
}

const onButtonClickHandler = (e) => {
    const tags = window.location.hash
    const str = tags.split('=')[1]
    const colors = str.split(',')

    if((e.key === 'Enter' || e.type === 'click') && input.value.trim()) {
        window.location.hash = tags + (!colors[0] ? `${input.value}` : `,${input.value}`)
        input.value = ''
    }
}

const onPageLoad = () => {
    hashDisplayHandler()
    button.addEventListener('click', onButtonClickHandler)
    input.addEventListener('keypress', onButtonClickHandler)
    elements = Array.from(document.querySelectorAll('li'))
    for(let el of elements){
        el.addEventListener('click', onElementClickHandler)
    }
}

onPageLoad()

window.onhashchange = () => {
    onPageLoad()
}
