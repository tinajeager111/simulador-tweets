//crear selectores

const formulario = document.querySelector('#formulario');

const listadoTweets = document.querySelector('#lista-tweets');

const caracterValidacion = document.querySelector('#tweet');

const textVal = document.querySelector('#textoVal');

//evento

formulario.addEventListener('submit', agregarTweet);
caracterValidacion.addEventListener('input', mostrar);
document.addEventListener('DOMContentLoaded', ()=> {
    tweet = JSON.parse(localStorage.getItem('tweet')) || []
    crearListaTweets()

})

//formulario.leerCaracteres('input', leerCaracteres);
//donde guardar los tweets generados

function eventListener(){
    formulario.addEventListener('submit',agregarTweet);
}




let tweet = []; //inicializando como un arreglo vacio

function agregarTweet(e){

    e.preventDefault();

    //console.log('probando funcion');

    const infoTweet = document.querySelector('#tweet').value;
    //leerCaracteres(infoTweet)

    //console.log('hola');

    if (infoTweet === ''){
        console.log('el tweet no puede estar vacio');
        mostrarError('el tweet no puede estar vacio')
    }

    else{

        //crear objeto
        const objTweet = {
            tweet:infoTweet,
            id:Date.now()

            
        }

        tweet = [objTweet] //la manera mas acertada de hacerlo
        

         document.querySelector('#tweet').value = '';
        crearListaTweets();
      
     
    
    }

}

function sincronizarAlmacenamiento(){
    localStorage.setItem('tweets', JSON.stringify(tweet));
}

function crearListaTweets(){

    limpiarTodo()



             tweet.forEach(i=>{
            const li = document.createElement('li');
            li.innerText = i.tweet;
            listadoTweets.appendChild(li);

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            li.appendChild(btnEliminar);


            btnEliminar.addEventListener('click', eliminarTweet);
        })
        }
       

        function eliminarTweet(e){
            e.preventDefault();
        
            const tweetEliminar = e.target.parentElement; //seleccionar el tweet y su botón de eliminar
        
            tweetEliminar.remove(); //eliminar el tweet y su botón de eliminar del DOM
        
            const idTweet = tweetEliminar.id; //obtener el id del tweet
        
            tweet = tweet.filter(i => i.id !== parseInt(idTweet)); //eliminar el tweet del arreglo
            
            sincronizarAlmacenamiento()
            
        }

/* function limpiarHTML(){
    while(listadoTweets.firstChild){
        listadoTweets.removeChild(listadoTweets.firstChild)
    }
}*/

function mostrarError(mensaje){

    const menError = document.createElement('p');
    menError.innerText = mensaje 

    menError.classList.add('error')

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(menError);

    setTimeout(()=>{
        menError.remove()
    },3000)
}

function mostrar(){
   
    limpiarTodo()
    
    if (caracterValidacion.value.length <= 251){
        const mensaje = document.createElement('p');
        mensaje.innerHTML = `le faltan ${250 - caracterValidacion.value.length}`

        textVal.appendChild(mensaje); 
    }

    else{
        mensaje.innerHTML = 'Ha superado la cantdad de caracteres'

        textVal.appendChild(mensaje)
    }
}


    

function limpiarTodo(){
    textVal.innerHTML = ''
}
// 
//function leerCaracteres(caracter) {

    //let caracter = document.querySelector('#tweet').value;


    //if (caracter.length > 250) {
      //alert("demasiados caracteres");
    
    //}

    //else{
    //    alert("menos de 250 caracteres");
    //}
 // }


