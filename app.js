//objetos y variables creados
let jugadores;
let baraja = [];
const tipoCarta = ["C", "D", "P", "T"];
const tipoEspecial = ["A", "K", "Q", "J"];
const puntosJugadores = [
    puntosJ1 = 0, puntosJ2 = 0, puntosJ3 = 0, puntosJ4 = 0, puntosJ5 = 0, puntosJ6 = 0, puntosC = 0
];


//Referencias al html
const botonEnviar = document.querySelector("#enviarJug");
const formJugadores = document.getElementById("numJugadores");
const cuestionario = document.getElementById("cuestionario");
const main = document.getElementById("main");
const marcador = document.querySelectorAll("small");


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

//Pedir cartas
const pedirCarta = () =>{
    if(baraja.length === 0){throw "No quedan cartas";} 
    else{
        const carta = baraja.pop(); //Saca una carta del array baraja y lo muestra
        return carta;
    };
};

//calcular el valor de la carta
const valorCarta = (puntos, carta) =>{
    puntos = carta.substring(0, carta.length - 1);
    //Si no es un número, la A valdrá 11 puntos y el resto de especiales 10
    let valor = isNaN(puntos) ? (puntos === "A" ? 11 : 10) : puntos * 1;
    return valor;
};

//Funcion para añadir jugadores en html
const jugadorNuevo = (aux) =>{
    const jug = document.createElement("div");
    jug.classList.add("col", "marcador");
    jug.innerHTML = "<h1>Jugador "+aux+" - <small>0</small></h1> </n> <div id='jugador-cartas'></div>";
    document.getElementById("addJugador").appendChild(jug);
};   

const crearJugadores = (num) =>{
    for (let i = 1; i<= num; i++){
        jugadorNuevo(i);
    }
};

//-->EVENTOS<--//

//Preguntar cuantas jugadores habra por pantalla
function obtenerJugadores () {
    formJugadores;  //Entra en el formulario de jugadores
    formJugadores.options[formJugadores.selectedIndex].value; //Examina la opcion marcada
    return parseInt(formJugadores.options[formJugadores.selectedIndex].text, 10); //Pasa la opcion a número decimal
};

//Cuando se haga click en el boton enviar...
botonEnviar.addEventListener("click", () =>{
    jugadores = obtenerJugadores();//El valor guardado será el numero de jugadores
    console.log("Jugadores: ", obtenerJugadores());
    crearJugadores(jugadores);//Se crea los marcadores en el html
    botonEnviar.disabled = true;//Se deshabilita la opcion de enviar
    cuestionario.style.display = "none"; //Desaparece el cuestionario
    main.style.opacity = 100; //Aparecce la pantalla de juego
    main.style.zIndex = 1; //La pantalla de juego pasa a primer plano
    cuestionario.style.zIndex = 0;//La eleccion de jugadores pasa a segundo plano

    
    const carta1 = pedirCarta();
    console.log("carta1: ", carta1);
    const carta2 = pedirCarta();
    puntosJ1 += valorCarta(puntosJ1, carta1);
    puntosJ1 += valorCarta(puntosJ1, carta2);

    //Redefinimos la constante marcador, con los jugadores ya creados
    const marcador = document.querySelectorAll("small");
    marcador[0].innerText = puntosJ1; 
    console.log("puntos Jug1: ", puntosJ1);

    //Creamos las imagenes de las cartas
    const crearCarta = () =>{
        const divCartaJugador = document.querySelectorAll("#jugador-cartas");
        const nuevaCarta1 = document.createElement("img");
        nuevaCarta1.classList.add("carta");
        nuevaCarta1.src = "img/"+carta1+".png";
        divCartaJugador[0].append(nuevaCarta1);
        const nuevaCarta2 = document.createElement("img");
        nuevaCarta2.classList.add("carta");
        nuevaCarta2.src = "img/"+carta2+".png";
        divCartaJugador[0].append(nuevaCarta2);
    };
    
    crearCarta();
});



crearBaraja();
console.log("Baraja ordenada",baraja);
