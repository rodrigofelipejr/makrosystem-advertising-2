let count = 0

const animateCSS = (element, animation, classRemove, classFixed) =>
  new Promise((resolve, reject) => {
    const node = document.querySelector(element)

    removeClass(element, 'hide')
    addClass(element, animation)

    function handleAnimationEnd() {
      if (!classRemove)
        removeClass(element, animation)

      if (classFixed)
        addClass(element, classFixed)

      node.removeEventListener('animationend', handleAnimationEnd)
      resolve('Animation ended')
    }
    node.addEventListener('animationend', handleAnimationEnd)
  })

const convertClassToArray = (list) => {
  return [`animate__animated`, ...list.split(' ')]
}

const removeClass = (element, list) => {
  const arr = convertClassToArray(list)
  const node = document.querySelector(element)
  node.classList.remove(`animate__animated`, ...arr)
}

const addClass = (element, list) => {
  const arr = convertClassToArray(list)
  const node = document.querySelector(element)
  node.classList.add(...arr)
}

window.addEventListener('load', () => {
  step1()
})

const step1 = () => {
  removeClass('.stage__a', 'hide')
  animateCSS('.container__color', 'animate__moveToUp', true).then(() => setTimeout(() => step2(), 2000))
  animateCSS('.stage__a .desc', 'animate__fadeInLeftBig')
  animateCSS('.stage__a .logo', 'animate__fadeIn animate__delay-1s')
}

const step2 = () => {
  animateCSS('.container__color', 'animate__moveToDown').then(() => removeClass('.container__color', 'animate__moveToUp'))
  animateCSS('.stage__a .desc', 'animate__faster animate__fadeOut', false, 'hide').then(() => addClass('.stage__a', 'hide'))
  animateCSS('.stage__a .logo', 'animate__faster animate__fadeOut', false, 'hide').then(() => step3())
}

const step3 = () => {
  removeClass('.stage__b', 'hide')
  animateCSS('.stage__b .desc', 'animate__fadeInLeft')
  animateCSS('.stage__b .cta', 'animate__fadeIn animate__slow')
  animateCSS('.stage__b .logo', 'animate__fadeIn animate__slow').then(() => step4())
}

const step4 = () => {
  animateCSS('.stage__b .cta', 'animate__bounce').then(() => setTimeout(() => step5(), 3000))
}

const step5 = () => {
  count++
  console.log(count)
  if (count <= 3) {
    addClass('.stage__b', 'hide')
    step1()
  }
}