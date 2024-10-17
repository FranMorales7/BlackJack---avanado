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
const botonNuevo = document.querySelector("#btnNuevo");
const botonPasar = document.querySelector("#btnPasar");
const formJugadores = document.getElementById("numJugadores");
const cuestionario = document.getElementById("cuestionario");
const main = document.getElementById("main");
let resultado = document.querySelector("#Ganador");
const rotulo = document.querySelectorAll(".marcador");
const marcadorCrupier = document.querySelector("#crupier-marcador");
const divCartaCrupier = document.querySelector("#crupier-cartas");
const divCartaJugador = document.querySelectorAll(".jugador-cartas");


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
        const carta = baraja.pop(); //Saca una carta del array baraja y la muestra
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

//Preguntar cuantas jugadores habra por pantalla
function obtenerJugadores () {
    formJugadores;  //Entra en el formulario de jugadores
    formJugadores.options[formJugadores.selectedIndex].value; //Examina la opcion marcada
    return parseInt(formJugadores.options[formJugadores.selectedIndex].text, 10); //Pasa la opcion a número decimal
};

//Funcion para añadir jugadores en html
const jugadorNuevo = (aux) =>{
    const jug = document.createElement("div");
    //Se crea un div con las clases "col" y "marcador" en el HTML
    jug.classList.add("col", "marcador"); 
    //En el interior del div se encontrara el h1 que simula el marcador y el div en el que se almacenan las imagenes
    jug.innerHTML = "<h1>Jugador "+aux+" - <small>0</small></h1> </n> <div class='jugador-cartas'></div>";
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

    //Solo si numCartas es dos, carta2 y nuevaCarta2 tendran funcionalidad
    carta2 = (numCartas === 2) ? pedirCarta() : null;
    nuevaCarta2 = (numCartas === 2) ? document.createElement("img") : null;

    //Se crean las cartas y se suma su valor a los puntos del jugador
    carta1 = pedirCarta();
    puntosJugadores[jug] += valorCarta(carta1);
    
    //si esta creada se pide una segunda carta
    if(carta2){
        carta2 = pedirCarta();
        puntosJugadores[jug] += valorCarta(carta2);
    };

    //Seleccionamos el div cuya clase es "jugador-cartas"
    const divCartaJugador = document.querySelectorAll(".jugador-cartas");
    
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
    marcador[jug+1].innerText = puntosJugadores[jug]; //El primer marcador lo ocupa el crupier
    console.log("puntos Jug",jug+1,"=", puntosJugadores[jug]);

};

//Se crea las cartas iniciales al crupier
const cartasCrupier = () =>{
    //El crupier tendra dos cartas, pero solo mostrara una de ellas
    const carta = pedirCarta();
    puntosCrupier += valorCarta(carta);
    
    //Se añade sus puntos al marcador
    marcadorCrupier.innerText = puntosCrupier;
    console.log("Puntos crupier = ",puntosCrupier);
    
    //Se crea la imagen de la carta
    const cartaImgCrupier = document.createElement("img");
    cartaImgCrupier.classList.add("carta");
    cartaImgCrupier.src = "img/"+carta+".png";
    divCartaCrupier.append(cartaImgCrupier);

    //Se crea la carta con reverso
    let cartaReverso = document.createElement("img");
    cartaReverso.classList.add("carta");
    cartaReverso.src = "img/reverso-gris.png";
    divCartaCrupier.append(cartaReverso);
};

//Turno del crupier
const cartaCrupier = () =>{
    //Se elimina la carta del reves
    const cartaReverso = divCartaCrupier.querySelector('img[src="img/reverso-gris.png"]');
    divCartaCrupier.removeChild(cartaReverso);
    
    //El crupier pedira una carta hasta que supere a los jugadores, sin pasarse de 17 puntos
    do{
        //Pide una carta
        const carta = pedirCarta();
        puntosCrupier += valorCarta(carta);
        
        //Se añade sus puntos al marcador
        marcadorCrupier.innerText = puntosCrupier;
        console.log("Puntos crupier = ",puntosCrupier);
        
        //Se crea la imagen de la carta nueva
        const cartaImgCrupier = document.createElement("img");
        cartaImgCrupier.classList.add("carta");
        cartaImgCrupier.src = "img/"+carta+".png";
        divCartaCrupier.append(cartaImgCrupier);
        
        //Si se pasa de 21, salir del bucle
        if (puntosCrupier > 21){
        console.log("El crupier se ha pasado de 21");
        break;
        
    }
    } while(puntosCrupier < 17);
    
    comprobacion();
};

//Comprobar puntos de los jugadores con la banca
const comprobacion = () => {
    let puntosMax = 0;
    const jugGanador = [];

    //Si los puntos del jugador son menores o iguales a 21 y son más altos que la puntuacion maxima hasta el momento
    for (let i = 0; i < jugadores; i++) {
        if (puntosJugadores[i] <= 21 && puntosJugadores[i] > puntosMax) {
            //La puntuacion del jugador pasa a ser la mas alta
            puntosMax = puntosJugadores[i];
            //Se reinicia la lista de jugadores victoriosos
            jugGanador.length = 0;
            //Se añade la posicion del jugador a la lista
            jugGanador.push(i);
            //Si hay un empate entre puntos, se agrega el jugador igualmente
        } else if (puntosJugadores[i] === puntosMax) {
            jugGanador.push(i);
        }
    }

    //Se reinicia el resultado
    resultado.innertext = "";
    
    //Si el crupier se ha pasado de puntos o bien se ha quedado corto...
    if (puntosCrupier > 21 || puntosMax > puntosCrupier) {
        //Se muestra los jugadores que han ganado y con cuantos puntos 
        jugGanador.forEach((jug) => {
             resultado.innerText += `--- Jugador ${jug + 1} GANA con ${puntosMax} puntos ---\n`;
         });
    //Si el crupier ha obtenido los mismos puntos que el jugador con mayor puntuaje
    } else if (puntosCrupier === puntosMax) {
        //Se mostrara un mensaje de empate
        resultado.innerText = "--- Empate con el Crupier ---";
    } else {
        //Si el crupier es el ganador
        resultado.innerText = `--- Crupier GANA con ${puntosCrupier} puntos ---`;
    }
};



//-->EVENTOS<--//

//Cuando se haga click en el boton enviar...
botonEnviar.addEventListener("click", () =>{
    jugadores = obtenerJugadores();//El valor guardado será el numero de jugadores
    crearJugadores(jugadores);//Se crea los marcadores en el html
    botonEnviar.disabled = true;//Se deshabilita la opcion de enviar
    cuestionario.style.display = "none"; //Desaparece el cuestionario
    main.style.opacity = 100; //Aparece la pantalla de juego
    main.style.zIndex = 1; //La pantalla de juego pasa a primer plano
    cuestionario.style.zIndex = 0;//La eleccion de jugadores pasa a segundo plano

    //Destacamos al jugador 1
    const rotulo = document.querySelectorAll(".marcador");
    rotulo[0].classList.add("tamLetra");
    
    //Se crean las cartas del crupier
    cartasCrupier();

    //Se reparten dos cartas a cada jugador
    for(let i = 0; i<= jugadores; i++){
        crearCarta(2,i);
    };

});

// Cuando se haga click en el botón pedir...
botonPedir.addEventListener("click", () => {
    const rotulo = document.querySelectorAll(".marcador");

    // Verificamos si el jugador actual tiene 21 puntos o menos
    if (puntosJugadores[jugadorActual] < 21) {
        // Resalta al jugador actual y le añade una carta
        rotulo[jugadorActual].classList.add("tamLetra");  
        crearCarta(1, jugadorActual);  
        // Verificar si después de pedir carta si el jugador se ha pasado o ha llegado a 21 puntos
        if (puntosJugadores[jugadorActual] >= 21) {
            // Quitar resaltado del jugador actual y pasar al siguiente
            rotulo[jugadorActual].classList.remove("tamLetra");  
            avanzarTurno();  
        } 
    }
});

// Si se hace click en el botón Pasar
botonPasar.addEventListener("click", () => {
    avanzarTurno();  // Pasar al siguiente jugador
});

// Función para avanzar al siguiente turno
const avanzarTurno = () => {
    const rotulo = document.querySelectorAll(".marcador");

    // Quitar resaltado del jugador actual
    rotulo[jugadorActual].classList.remove("tamLetra");

    // Pasar al siguiente jugador
    jugadorActual++;

    // Si hay más jugadores...
    if (jugadorActual < jugadores) {
        //  y si el jugador tiene menos de 21 puntos
        if (puntosJugadores[jugadorActual] < 21) {
            // Habilitar botones Pedir y Pasar
            botonPedir.disabled = false;  
            botonPasar.disabled = false;  
            // Resaltar al siguiente jugador    
            rotulo[jugadorActual].classList.add("tamLetra");  

        // y si el jugador supera los 21 puntos, deshabilitar los botones
        } else if (puntosJugadores[jugadorActual] > 21) {
            botonPedir.disabled = true;
            botonPasar.disabled = true;
            jugadorActual++;
        }

        // Si no hay más jugadores ... 
    } else {
        //deshabilitar los botones 
        botonPedir.disabled = true;
        botonPasar.disabled = true;

        //Es el turno del crupier:
            //mostrar segunda carta del crupier y hacer comprobacion
        cartaCrupier();
        comprobacion();
        }
};

//Si se hace click en el boton nuevo
botonNuevo.addEventListener("click", () =>{
    // Reiniciar variables del juego
    jugadores = 0;
    jugadorActual = 0;
    baraja = [];
    puntosJugadores.fill(0);
    puntosCrupier = 0;

    // Limpiar las cartas en pantalla
    let limpiar = document.querySelectorAll(".jugador-cartas");

    limpiar.forEach(carta => {
        carta = "";
    });

    divCartaCrupier.innerHTML = '';

    // Ocultar el marcador del crupier
    marcadorCrupier.innerText = "0";

    // Reiniciar texto de resultados
    resultado.innerText = "";

    // Limpiar la pantalla de juego y mostrar el formulario de selección de jugadores
    main.style.opacity = 0;
    main.style.zIndex = 0; // La pantalla de juego pasa a segundo plano
    cuestionario.style.zIndex = 1; // La elección de jugadores pasa a primer plano
    cuestionario.style.display = "block"; // Vuelve a mostrar el cuestionario
    //reactivar los botones
    botonEnviar.disabled = false; 
    botonPedir.disabled = false;
    botonPasar.disabled = false;
    // Limpiar jugadores anteriores
    document.getElementById("addJugador").innerHTML = '';

    // Crear nueva baraja
    crearBaraja();
});

crearBaraja();
console.log("Baraja ordenada",baraja);
