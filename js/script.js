// constantes de elementos do DOM e variaveis usada para eventos
const color1 = document.getElementById('color1')
const color2 = document.getElementById('color2')
const background = document.getElementById('background')
const deg = document.getElementById('deg')
const code = document.getElementById('code')
const copy = document.getElementById('copy')
const add = document.getElementById('add')
const less = document.getElementById('less')
const box = document.getElementById('box')
let cor1 = 'rgb(255, 255, 255)'
let cor2 = 'rgb(0, 0, 0)'
let angle = 0

// eventos de elementos do DOM
color1.addEventListener('input', e => displayColor(e.target.value, color1, '1'))
color2.addEventListener('input', e => displayColor(e.target.value, color2, '2'))
deg.addEventListener('input', e => updateAngle(e.target.value))
copy.addEventListener('click', e => copyCode())
add.addEventListener('click', e => updateDeg(add, '+'))
less.addEventListener('click', e => updateDeg(less, '-'))

// copia o codigo disponivel para a área de transferencia
function copyCode () {
  code.select()
  document.execCommand('copy')
  box.style.display = 'flex'
  messageNone()
  console.log('copy')
  copy.removeEventListener('click', e => copyCode())
}

// aumenta ou diminui 15 graus no anglo de acordo com o botão
function updateDeg (btn, str) {
  angle = str === '+' ? +angle + 15 : +angle - 15
  updateBG()
  btn.removeEventListener('click', e => updateDeg(less, str))
}

// atualiza o valor do anglo quando alterado diretamente
function updateAngle (value) {
  angle = +value
  updateBG()
  deg.removeEventListener('input', e => updateAngle(e.target.value))
}

// atualiza a cor de acordo com a cor escolhida
function displayColor (hex, cor, n) {
  const rgb = toRGB(hex)
  n === '1' ? cor1 = rgb : cor2 = rgb
  updateBG()
  cor.removeEventListener('input', e => displayColor(e.target.value, cor))
}

// transforma o codigo da cor de hexadecimal para rgb
function toRGB (hex) {
  const R = parseInt(hex[1] + hex[2], 16)
  const G = parseInt(hex[3] + hex[4], 16)
  const B = parseInt(hex[5] + hex[6], 16)
  return `rgb(${R}, ${G}, ${B})`
}

// atualiza a cor e o anglo de fundo conforme a escolha do usuario
function updateBG () {
  deg.value = +angle
  code.value = `linear-gradient(${angle}deg, ${cor1}, ${cor2})`
  background.style.background = `linear-gradient(${angle}deg, ${cor1}, ${cor2})`
}

// retira a mensagem de codigo copiado após 1 segundo
function messageNone () {
  setTimeout(_ => {
    box.style.display = 'none'
  }, 1000)
}

updateBG()
