//objetos y variables creados
let jugadores;
let baraja = [];
const tipoCarta = ["C", "D", "P", "T"];
const tipoEspecial = ["A", "K", "Q", "J"];
let puntos = 0;



//Preguntar cuantas jugadores habra por pantalla
//jugadores = document.getElementById("#numJugadores");
jugadores = 14;
console.log("Jugadores: ", jugadores);

//Crear cartas
const crearBaraja = () => {
    for (let i = 2; i <= 10; i++){
        for (let tipo of tipoCarta){
            baraja.push(i+tipo);//creamos cartas del 2 al 10 de cada tipo
        }
    }

    for (let especial of tipoEspecial){
        for (let tipo of tipoCarta){
        baraja.push(especial+tipo);//creamos cartas especiales de cada tipo
        }
    }

    //Desordena la baraja con el metodo shuffle()
    baraja = _.shuffle(baraja);
    console.log("Baraja desordenada",baraja);
    return baraja;
};

//calcular el valor de la carta
const valorCarta = (carta) =>{
    let puntos = carta.substring(0, carta.length - 1);
    //Si no es un número, la A valdrá 11 puntos y el resto de especiales 10
    let valor = isNaN(puntos) ? (puntos === "A" ? 11 : 10) : puntos * 1;
    return valor;
};


//Jugadores
const crearJugadores = (num) =>{
for (let i = 2; i<=jugadores; i++){
    aux = document.getElementById("#addJugador");
    aux.innerHTML = '<h1>Jugador 1 - <small>0</small></h1>';
    }
};

crearBaraja();
console.log("Baraja ordenada",baraja);
console.log(valorCarta("AC"));
crearJugadores(jugadores);
