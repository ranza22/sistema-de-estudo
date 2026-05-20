let xp = 0
let level = 1

let streak = 0

let metas = []

let segundos = 0
let minutos = 0
let horas = 0

let intervalo = null


let xpBar = document.querySelector(".xp-bar")
let xpTexto = document.querySelector(".xp-texto")
let levelTexto = document.getElementById("level")

let inputMeta = document.getElementById("inputMeta")
let btnAdicionar = document.getElementById("btnAdicionar")
let listaMetas = document.getElementById("listaMetas")

let streakTexto = document.getElementById("streakTexto")

let tempo = document.getElementById("tempo")

let btnIniciar = document.getElementById("btnIniciar")
let btnPausar = document.getElementById("btnPausar")
let btnResetar = document.getElementById("btnResetar")


function atualizarXP() {

  xpBar.style.width = xp + "%"

  xpTexto.innerText = xp + " / 100 XP"

  levelTexto.innerText = "Level " + level
}


function ganharXP(valor) {

  xp += valor

  if (xp >= 100) {

    xp = 0

    level++

    alert("🚀 Você subiu de nível!")
  }

  atualizarXP()

  salvarDados()
}


btnAdicionar.addEventListener("click", function() {

  let texto = inputMeta.value

  if (texto.trim() === "") {
    return
  }

  let meta = {
    nome: texto,
    concluida: false
  }

  metas.push(meta)

  mostrarMetas()

  salvarDados()

  inputMeta.value = ""
})


function mostrarMetas() {

  listaMetas.innerHTML = ""

  for (let i = 0; i < metas.length; i++) {

    let elemento = document.createElement("div")

    elemento.classList.add("meta")

    let texto = document.createElement("span")

    texto.innerText = metas[i].nome

    if (metas[i].concluida === true) {

      texto.style.textDecoration = "line-through"

      elemento.style.opacity = "0.5"
    }

    let botao = document.createElement("button")

    botao.innerText = "✅"

    botao.addEventListener("click", function() {

      if (metas[i].concluida === false) {

        metas[i].concluida = true

        texto.style.textDecoration = "line-through"

        elemento.style.opacity = "0.5"

        ganharXP(10)

        streak++

        streakTexto.innerText =
          streak + " dias seguidos estudando"

        salvarDados()
      }

    })

    elemento.appendChild(texto)

    elemento.appendChild(botao)

    listaMetas.appendChild(elemento)
  }
}


btnIniciar.addEventListener("click", function() {

  if (intervalo) {
    return
  }

  intervalo = setInterval(function() {

    segundos++

    if (segundos === 60) {

      segundos = 0

      minutos++
    }

    if (minutos === 60) {

      minutos = 0

      horas++
    }

    atualizarTempo()

  }, 1000)

})


btnPausar.addEventListener("click", function() {

  clearInterval(intervalo)

  intervalo = null
})


btnResetar.addEventListener("click", function() {

  clearInterval(intervalo)

  intervalo = null

  segundos = 0
  minutos = 0
  horas = 0

  atualizarTempo()
})


function atualizarTempo() {

  tempo.innerText =
    formatar(horas) + ":" +
    formatar(minutos) + ":" +
    formatar(segundos)
}


function formatar(valor) {

  if (valor < 10) {

    return "0" + valor
  }

  return valor
}


function salvarDados() {

  localStorage.setItem("xp", xp)

  localStorage.setItem("level", level)

  localStorage.setItem("streak", streak)

  localStorage.setItem(
    "metas",
    JSON.stringify(metas)
  )
}


function carregarDados() {

  let xpSalvo =
    localStorage.getItem("xp")

  let levelSalvo =
    localStorage.getItem("level")

  let streakSalvo =
    localStorage.getItem("streak")

  let metasSalvas =
    localStorage.getItem("metas")


  if (xpSalvo) {

    xp = Number(xpSalvo)
  }

  if (levelSalvo) {

    level = Number(levelSalvo)
  }

  if (streakSalvo) {

    streak = Number(streakSalvo)
  }

  if (metasSalvas) {

    metas = JSON.parse(metasSalvas)
  }

  streakTexto.innerText =
    streak + " dias seguidos estudando"

  atualizarXP()

  mostrarMetas()
}


carregarDados()

atualizarXP()

atualizarTempo()