//objetos y variables creados
let jugadores;
let baraja = [];
const tipoCarta = ["C", "D", "P", "T"];
const tipoEspecial = ["A", "K", "Q", "J"];
const puntosJugadores = [
    puntosJ1 = 0, puntosJ2 = 0, puntosJ3 = 0, puntosJ4 = 0, puntosJ5 = 0, puntosJ6 = 0
];
let puntosCrupier =0;
let carta1, carta2; //Variables a definir en linea 73
let nuevaCarta1, nuevaCarta2; //variables a definir en linea 75
let jugadorActual = 0; 

//Referencias al html
const botonEnviar = document.querySelector("#enviarJug");
const botonPedir = document.querySelector("#btnPedir");
const botonPasar = document.querySelector("#btnPasar");
const formJugadores = document.getElementById("numJugadores");
const cuestionario = document.getElementById("cuestionario");
const main = document.getElementById("main");
const resultado = document.querySelector("#Ganador");
const rotulo = document.querySelectorAll(".marcador");

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
const valorCarta = (carta) =>{
    puntos = carta.substring(0, carta.length - 1);
    //Si no es un número, la A valdrá 11 puntos y el resto de especiales 10
    let valor = isNaN(puntos) ? (puntos === "A" ? 11 : 10) : puntos * 1;
    return valor;
};

//Funcion para añadir jugadores en html
const jugadorNuevo = (aux) =>{
    const jug = document.createElement("div");
    //Se crea un div con las clases "col" y "marcador" en el HTML
    jug.classList.add("col", "marcador"); 
    //En el interior del div se encontrara el h1 que simula el marcador y el div en el que se almacenan las imagenes
    jug.innerHTML = "<h1>Jugador "+aux+" - <small>0</small></h1> </n> <div id='jugador-cartas'></div>";
    //Todo lo anterior se incorporará al div "addJugador"
    document.getElementById("addJugador").appendChild(jug);
};   

//Se crean tantos jugadores como indique "num"
const crearJugadores = (num) =>{
    for (let i = 1; i<= num; i++){
        jugadorNuevo(i);
    }
};

//Creamos las imagenes de las cartas al jugador seleccionado
const crearCarta = (numCartas, jug) =>{
    //Variables que se necesitan
    carta1 = pedirCarta();
    nuevaCarta1 = document.createElement("img");

    //Solo si se piden dos cartas carta2 y nuevaCarta2 tendra funcionalidad
    carta2 = (numCartas === 2) ? pedirCarta() : null;
    nuevaCarta2 = (numCartas === 2) ? document.createElement("img") : null;

    //Se crean las cartas y se suma su valor a los puntos del jugador
    carta1 = pedirCarta();
    puntosJugadores[jug] += valorCarta(carta1);
    
    //si esta creada se pide una segunda carta
    if(carta2){carta2 = pedirCarta();
    puntosJugadores[jug] += valorCarta(carta2);
    };

    //Seleccionamos el div cuyo id es "jugador-cartas"
    const divCartaJugador = document.querySelectorAll("#jugador-cartas");
    
    //Creamos la imagen de la carta
    nuevaCarta1 = document.createElement("img");
    nuevaCarta1.classList.add("carta");
    nuevaCarta1.src = "img/"+carta1+".png";
    //Añadimos la imagen al div correspondiente al jugador
    divCartaJugador[jug].append(nuevaCarta1);

    //Si esta creada, se pide una segunda carta
    if(nuevaCarta2){ 
    nuevaCarta2 = document.createElement("img");
    nuevaCarta2.classList.add("carta");
    nuevaCarta2.src = "img/"+carta2+".png";
    divCartaJugador[jug].append(nuevaCarta2);
    }

    //Definimos la constante marcador, con los jugadores ya creados
    const marcador = document.querySelectorAll("small");
    //Añadimos la puntuacion
    marcador[jug].innerText = puntosJugadores[jug]; 
    console.log("puntos Jug",jug+1,"=", puntosJugadores[jug]);
};


const controlarPuntos = () =>{
    //Controlar puntos del jugador
    let I = 0;
    do{
        if (puntosJugadores[I] > 21){
            resultado.innerText = "--- Jugador ",I++," PIERDE ---"
            
            //el boton Pedir y el boton Pasar no se podran usar, ademas sera el turno del siguiente
            btPedir.disabled = true;
            btPasar.disabled = true;
        } else if (puntosJugadores[I] === 21){
            resultado.innerText = "--- Jugador ",I++," GANA ---"
        
            //el boton Pedir y el boton Pasar no se podran usar, ademas sera el turno del siguiente
            btPedir.disabled = true;
            btPasar.disabled = true;
        }
        I++;
    } while (I <= jugadores);
}

//Preguntar cuantas jugadores habra por pantalla
function obtenerJugadores () {
    formJugadores;  //Entra en el formulario de jugadores
    formJugadores.options[formJugadores.selectedIndex].value; //Examina la opcion marcada
    return parseInt(formJugadores.options[formJugadores.selectedIndex].text, 10); //Pasa la opcion a número decimal
};

//-->EVENTOS<--//

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

    //En un inicio todos los jugadores empiezan con dos cartas
    for(let i = 0; i<= jugadores; i++){
        crearCarta(2,i);
    };
});

// Cuando se haga click sobre el botón pedir...
botonPedir.addEventListener("click", () => {
    const rotulo = document.querySelectorAll(".marcador");

    // Verificamos si el jugador actual tiene 21 puntos o menos
    if (puntosJugadores[jugadorActual] <= 21) {
        rotulo[jugadorActual].classList.add("tamLetra");  // Resaltar al jugador actual
        crearCarta(1, jugadorActual);  // Añadir una carta al jugador actual

        // Verificar si después de pedir carta el jugador se pasó de 21
        if (puntosJugadores[jugadorActual] > 21) {
            rotulo[jugadorActual].classList.remove("tamLetra");  // Quitar resaltado del jugador actual
            jugadorActual++;  // Pasar al siguiente jugador
            if (jugadorActual < jugadores) {  // Si quedan más jugadores
                rotulo[jugadorActual].classList.add("tamLetra");  // Resaltar al siguiente jugador
            } else {
                botonPedir.disabled = true;  // Si ya no quedan más jugadores, deshabilitar el botón
            }
        } else if (puntosJugadores[jugadorActual] === 21) {  // Si alcanza 21 puntos
            rotulo[jugadorActual].classList.remove("tamLetra");
            resultado.innerText = "--- Jugador "+(jugadorActual + 1)+"GANA ---";  // Mostrar ganador
            jugadorActual++;
            if (jugadorActual < jugadores) {
                rotulo[jugadorActual].classList.add("tamLetra");  // Resaltar al siguiente jugador
            } else {
                botonPedir.disabled = true;  // Si ya no quedan más jugadores, deshabilitar el botón
                console.log("Fin del juego.");
            }
        }
    }
   
}); 
//Si se hace click en el boton Pasar
botonPasar.addEventListener("click", () =>{
    botonPedir.disabled = true;
    botonPasar.disabled = true;
    rotulo[jugadorActual].classList.remove("tamLetra");
    jugadorActual++;
    if (jugadorActual < jugadores) {
        // Si hay más jugadores, habilitamos los botones para el nuevo jugador
        botonPedir.disabled = false;
        botonPasar.disabled = false;
        rotulo[jugadorActual].classList.add("tamLetra");
        //Si el jugador supera los 21 puntos
    } else if(puntosJugadores[jugadorActual] >= 21){
        botonPedir.disabled = true;
        botonPasar.disabled = true;
        rotulo[jugadorActual].classList.remove("tamLetra");
        jugadorActual++;
    }
});

crearBaraja();
console.log("Baraja ordenada",baraja);
