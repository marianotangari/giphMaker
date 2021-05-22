var apiKey = '5YPbnd7V7t23V7s7PkRV7lfvFcsBBd2j';
var respuesta;
var searchButton = document.getElementById('search'); 
const input = document.querySelector('input');
var lupacambio = document.getElementById('lupacambio');
var link = document.getElementById("temaclaro");
var tema = link.getAttribute('href');
var imageLupa = document.getElementById("imagelupa");
var count = 0;
var arrow2 = document.getElementById("arrow2");
var myStorage = window.localStorage;
var busquedaDin = document.getElementById('busquedadin');
var imageLogo = document.getElementById("imagelogo");
var busq1 = [...document.getElementsByClassName("buscuadro")];
var topic = [];
var cambio= document.getElementById('cambio');


input.addEventListener("keydown", () => {
    busquedasug.style.display = 'block';
    lupacambio.setAttribute('class', 'lupainput');
    if(link.getAttribute('href')=='./Styles/styledark.css'){
        imageLupa.setAttribute('src', 'assets/lupa_light.svg');
    }
    else
        imageLupa.setAttribute('src', 'assets/lupa.svg');
})

input.addEventListener("keypress", () => {
    console.log(topic);
    fetch('https://api.giphy.com/v1/gifs/search/tags?q=' + input.value +
    '&api_key=' + apiKey + '&limit=3')
    .then((response) => {
    return response.json()
    }).then(data => {
        respuesta = data;
        console.log(respuesta);
        for (i = 0; i < respuesta.data.length; i++){
            busq1[i].innerHTML = respuesta.data[i].name;
            topic[i] = respuesta.data[i].name;
        };
        return topic}).then(topic => {
            for(var i=0;i<busq1.length;i++) {
                console.log(topic[i]);
                var valor = topic[i];
                busq1.forEach(element => {element.addEventListener('click', function(i)
                {inputBusqueda.value = element.innerHTML;
                })})
            }
        })    
    })

input.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
          // Cancel the default action, if needed
        event.preventDefault();
          // Trigger the button element with a click
        document.getElementById("search").click();
    }
});


function getSearchResults(search) {
    lupacambio.setAttribute('class', 'lupa');
    imageLupa.setAttribute('src', 'assets/lupa_inactive.svg');
    inputBusqueda.value = '';
    busquedasug.style.display = 'none'; 
    cambio.innerHTML = search;
    var resultado = document.createElement('a');
    resultado.innerHTML = '#' + search;
    resultado.setAttribute('class', 'resultados');
    busquedaDin.appendChild(resultado);
    for(var element in myStorage) {
        if(myStorage.getItem(element) == search) 
            resultado.style.display = 'none';
    };
    myStorage.setItem(search, search);
    resultado.setAttribute("onclick", "getSearchResults('" + search + "')");
    resultado.setAttribute('href', '#trends')
    const found =
    fetch('https://api.giphy.com/v1/gifs/search?q=' + search +
    '&api_key=' + apiKey + '&limit=12')
    .then((response) => {
    return response.json()
    }).then(data => {
        respuesta = data;
        for (i = 0; i < respuesta.data.length; i++){
            var imageDiv = document.getElementById('div' + i);
            imageDiv.innerHTML = "";
            var div = document.createElement("div");
            var imagen = imageDiv.appendChild(div); 
            imagen.innerHTML = `<img class='gifs' alt='gato' src=${data.data[i].images.downsized_medium.url}>`
        }
    return data
    })
    .catch((error) => {
    return error
    })
    return found
    }         

searchButton.addEventListener('click', () => getSearchResults(input.value));

    
function getSuggestions(topic) {
    const found =
    fetch('https://api.giphy.com/v1/gifs/search?q=' + topic +
    '&api_key=' + apiKey + '&limit=1')
    .then((response) => {
        return response.json()
        }).then(data => {
            respuesta = data;
            console.log(data.data[0].images.preview_gif.url);
            let topicDiv = document.getElementById(topic)
            var div = document.createElement("div");
            var imagen = topicDiv.appendChild(div);
            topicDiv.innerHTML = `<img class='gifs' alt='gatos' src=${respuesta.data[0].images.downsized_medium.url}><button class="botonver";">Ver más… </button>`
        
        return data
        })
        .catch((error) => {
        return error
        })
        return found
}     

getSuggestions("Tarkovsky")
getSuggestions("Koala")
getSuggestions("piano")
getSuggestions("Mordor")

function switchTheme(tema) {
    menutemas.style.display = 'none';    
    if (tema == "themeday"){
        link.setAttribute('href','./Styles/styledark.css');
        console.log(tema);
        imageLogo.setAttribute('src', 'assets/gifOF_logo_dark.png');
        input.value='';
        lupacambio.setAttribute('class', 'lupa');
        imageLupa.setAttribute('src', 'assets/lupa_inactive.svg');  
        saveTheme();
    }
    else {
        if(tema == "themedark"){
            link.setAttribute('href','./Styles/style.css');
            console.log(tema);
            imageLogo.setAttribute('src', 'assets/gifOF_logo.png') 
            input.value='';
            arrow2.setAttribute('src', 'assets/dropdown.svg');
            lupacambio.setAttribute('class', 'lupa');
            imageLupa.setAttribute('src', 'assets/lupa_inactive.svg');  
            saveTheme();
        }
    }        
}

function displayThemes() {
    
    var arrow = document.getElementById("arrow");
    var temaclaro = document.getElementById("themeday")
    var temaoscuro = document.getElementById("themedark")
    var menutemas = document.getElementById("menutemas")
    if(menutemas.style.display == 'none'){
        menutemas.style.display = 'block';           
    }
    else {
        menutemas.style.display = 'none'      
    }
}

function displaySearch() {
    var busqueda = document.getElementById("busquedasug")
    var inputBusqueda = document.getElementById("inputbusqueda")
    
    if(inputBusqueda.value.length >= 0){
        busquedasug.style.display = 'block'; 
    }
}

var inputBusqueda = document.getElementById("inputbusqueda")


setInterval(function(){
    if(input.value == ''){
        busquedasug.style.display = 'none';
        lupacambio.setAttribute('class', 'lupa');
        imageLupa.setAttribute('src', 'assets/CombinedShape.svg');  
    }},700)

function getTrendingResults() {
    var apiKey = '5YPbnd7V7t23V7s7PkRV7lfvFcsBBd2j';
    const found =
    fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12`)
    .then((response) => {
    return response.json()
    }).then(data => {
        respuesta = data;
        console.log(data.data[0].images.preview_gif.url);
        for (i = 0; i < respuesta.data.length; i++){
            var tituloSplit = (data.data[i].title).split(" " , 3);
            var imageDiv = document.getElementById('div' + i);
            imageDiv.innerHTML = "";
            var div = document.createElement("div");
            var imagen = imageDiv.appendChild(div); 
            imagen.innerHTML = `<img class='gifs' alt='gato' src=${data.data[i].images.downsized_medium.url}>`;
            var divNombreGif = document.createElement("div");
            /*divNombreGif.style.position = "absolute";
            divNombreGif.style.width = "18.5%";
            divNombreGif.style.backgroundImage= "linear-gradient(270deg, #F7C9F3,#4180F6)";
            divNombreGif.style.fontFamily = 'Chakra Petch';
            divNombreGif.style.fontSize = '13px';
            divNombreGif.style.color = 'white';
            divNombreGif.style.zIndex = "9999";*/
            divNombreGif.innerText = '#' + tituloSplit;
            imageDiv.appendChild(divNombreGif);
        }
    return data
    })
    .catch((error) => {
    return error
    })
    return found
    }   
    
    getTrendingResults();

    var botonEnlace = document.getElementById("enlaceupload");

    botonEnlace.addEventListener('click', () => {
        window.location.href='upload.html'
    });

    for (i=0; i<myStorage.length; i++){
        if(myStorage.getItem(myStorage.key(i)).substr(0,13) !='{"data":{"id"' && myStorage.getItem(myStorage.key(i)).substr(0,22) !='./Styles/styledark.css'
        && myStorage.getItem(myStorage.key(i)).substr(0,18) !='./Styles/style.css'){
            var resultado = document.createElement('a');
            resultado.innerHTML = '#' + myStorage.getItem(myStorage.key(i));
            resultado.setAttribute('class', 'resultados');
            busquedaDin.appendChild(resultado);
            resultado.setAttribute("onclick", "getSearchResults('" + myStorage.getItem(myStorage.key(i)) + "')");
            resultado.setAttribute('href', '#trends')
        }
    }

    function saveTheme() {
        myStorage.setItem('temaThemeTema', link.getAttribute('href'));
    }
    //if(myStorage.length != 0)    
    if(myStorage.getItem('temaThemeTema') != null)
        link.setAttribute('href', myStorage.getItem('temaThemeTema'));
    if(myStorage.getItem('temaThemeTema') == './Styles/styledark.css'){
        imageLogo.setAttribute('src', 'assets/gifOF_logo_dark.png');
        input.value='';
    } else {
        imageLogo.setAttribute('src', 'assets/gifOF_logo.png') 
        input.value='';
        arrow2.setAttribute('src', 'assets/dropdown.svg');
    }
    


    