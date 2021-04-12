// https://salaxer.github.io/

const orange = document.getElementById('orange')
const blue = document.getElementById('blue')
const green = document.getElementById('green')
const brown = document.getElementById('brown')
const yellow = document.getElementById('yellow')
const skyblue = document.getElementById('skyblue')
const purple = document.getElementById('purple')
const black = document.getElementById('black')
const pink = document.getElementById('pink')

const btnIniciar = document.getElementById('btnIniciar')

const ULTIMO_NIVEL = 2

class Juego{
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel(), 500) 
    }

    inicializar(){
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toogleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            orange,
            blue,
            green,
            brown,
            yellow,
            skyblue,
            purple,
            black,
            pink
        }
    }
    toogleBtnEmpezar(){
        if(btnIniciar.classList.contains('hide')){
            btnIniciar.classList.remove('hide')
        }else{
            btnIniciar.classList.add('hide')
        }
    }
    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n=> Math.floor(Math.random() * 9))
        console.log(this.secuencia)
    }

    siguienteNivel(){
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero){
        switch(numero){
            case 0:
                return 'orange'
            case 1:
                return 'blue'
            case 2:
                return 'green'
            case 3:
                return 'brown'
            case 4:
                return 'yellow'
            case 5:
                return 'skyblue'
            case 6:
                return 'purple'
            case 7:
                return 'black'
            case 8:
                return 'pink'
        }
    }
    transformarColorANumero(color){
        switch(color){
            case 'orange':
                return 0
            case 'blue':
                return 1
            case 'green':
                return 2
            case 'brown':
                return 3
            case 'yellow':
                return 4
            case 'skyblue':
                return 5
            case 'purple':
                return 6
            case 'black':
                return 7
            case 'pink':
                return 8
        }

        
    }
    iluminarSecuencia(){
        for(let i = 0; i<this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i])
            console.log(color)
            setTimeout(()=>{
                this.iluminarColor(color)
            }, 1000 * .1)
        }
    }
    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 700)
    }
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }
    agregarEventosClick(){
        this.colores.orange.addEventListener('click', this.elegirColor)
        this.colores.blue.addEventListener('click', this.elegirColor)
        this.colores.green.addEventListener('click', this.elegirColor)
        this.colores.brown.addEventListener('click', this.elegirColor)
        this.colores.yellow.addEventListener('click', this.elegirColor)
        this.colores.skyblue.addEventListener('click', this.elegirColor)
        this.colores.purple.addEventListener('click', this.elegirColor)
        this.colores.black.addEventListener('click', this.elegirColor)
        this.colores.pink.addEventListener('click', this.elegirColor)
    }
    eliminarEventosClick(){
        this.colores.orange.removeEventListener('click', this.elegirColor)
        this.colores.blue.removeEventListener('click', this.elegirColor)
        this.colores.green.removeEventListener('click', this.elegirColor)
        this.colores.brown.removeEventListener('click', this.elegirColor)
        this.colores.yellow.removeEventListener('click', this.elegirColor)
        this.colores.skyblue.removeEventListener('click', this.elegirColor)
        this.colores.purple.removeEventListener('click', this.elegirColor)
        this.colores.black.removeEventListener('click', this.elegirColor)
        this.colores.pink.removeEventListener('click', this.elegirColor)
    }
    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(numeroColor)
        if( numeroColor === this.secuencia[this.subnivel]){
            this.subnivel ++
            if( this.subnivel === this.nivel){
                this.nivel ++
                this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganoElJuego()
                }else{
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        }else{
            this.perdioElJuego()
        }
    }
    ganoElJuego(){
        swal("Ganaste!", "Buen tarbajo!", "felicitaciones")
        .then(this.inicializar)
    }
    perdioElJuego(){
        swal('Perdite!', 'Lo lamentamos, perdiste el juego :(', 'error')
        .then(()=>{
            this.eliminarEventosClick()
            this.inicializar()
        })
    }
}

function empezarJuego(){
    window.juego = new Juego()
}
