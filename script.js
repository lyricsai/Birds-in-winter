function startup() {

    const container = document.querySelector(".game__container")
    const houseBig = document.querySelector('.game__house_big')
    const houseLittle = document.querySelector('.game__house_little')
    const totalNum = document.querySelector('#birds__number')
    const show = document.querySelector('#show')
    const label = document.querySelector('label')
    let birds = []
    let id = 1

    show.addEventListener('click', () => {

        if (document.querySelector('.element')) { document.querySelectorAll('.element').length = 0 }

        if (!totalNum.value) { return label.style.color = 'red' } else { label.style.color = 'black' }

        let total = +totalNum.value
        totalNum.value = ''

        birds.forEach(bird => {
            bird.remove()
        })
        birds.length = 0

        function createBird() {
            const bird = document.createElement('div')
            const img = document.createElement('img')
            img.id = id
            bird.classList.add('bird')
            bird.draggable = true
            bird.style.left = Math.floor(Math.random() * 500) + 250 + 'px'
            bird.style.top = Math.floor(Math.random() * 250) + 'px'
            img.src = './bird__1.png'
            bird.append(img)
            birds.push(bird)
            return bird
        }

        for (let i = 0; i < total; i++) {
            container.append(createBird())
            id++
        }

        function dragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.id)
            setTimeout(() => {
                this.classList.add('dropped')
            }, 0)
        }
        function dragEnd(e) {
            this.classList.remove('dropped')
            this.style.top = e.pageY - container.getBoundingClientRect().y - this.offsetHeight / 2 + 'px'
            this.style.left = e.pageX - container.getBoundingClientRect().x - this.offsetWidth / 2 + 'px'
        }

        function dragOver(e) {
            e.preventDefault()
        }
        function dragEnter() {
            this.classList.add('ondrop')
        }
        function dragLeave() {
            this.classList.remove('ondrop')
        }
        function dragDrop(e) {
            this.classList.remove('ondrop')
            let data = e.dataTransfer.getData("text")
            document.getElementById(data).parentElement.style.display = 'none'
        }

        birds.forEach(bird => {
            bird.addEventListener('dragstart', dragStart)
            bird.addEventListener('dragend', dragEnd)
        })

        houseBig.addEventListener('dragover', dragOver)
        houseBig.addEventListener('dragenter', dragEnter)
        houseBig.addEventListener('dragleave', dragLeave)
        houseBig.addEventListener('drop', dragDrop)

        houseLittle.addEventListener('dragover', dragOver)
        houseLittle.addEventListener('dragenter', dragEnter)
        houseLittle.addEventListener('dragleave', dragLeave)
        houseLittle.addEventListener('drop', dragDrop)

        container.addEventListener('dragover', dragOver)
    })
}
document.addEventListener("DOMContentLoaded", startup)