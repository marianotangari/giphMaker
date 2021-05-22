var media;
var blob;
var form = new FormData();
var gifs = document.getElementById('gifs');
var botonCapturar = document.getElementById('botoncapturar');
var imagenCapturar = document.getElementById('imagencapturar');
var botonCapt2 = document.getElementById('botoncapt2');
var marcoCheck = document.getElementById('marcocheck');
var url;
var apiKey = '5YPbnd7V7t23V7s7PkRV7lfvFcsBBd2j';
var myStorage = window.localStorage;
var myGif; 
var video = document.getElementsByClassName('video');
var videoCont = document.getElementById('preview');
var divCapturar = document.getElementById('divcapturar');
var paso1 = document.getElementById('paso1');
var paso2 = document.getElementById('paso2');
var paso3 = document.getElementById('paso3');
var paso4 = document.getElementById('paso4');
var paso5 = document.getElementById('paso5');
var paso6 = document.getElementById('paso6');
var descargarGif = document.getElementById('descargargif');
var copiarGif = document.getElementById('copiargif');
var botonListo = document.getElementById('botonlisto');
var preview2 = document.getElementById('preview2');
var galeria = document.getElementById('galeria');
var link = document.getElementById('tema');
var urldescargargif;


// Paso 2: función para que empiece a transmitir la cámara
function getStreamAndRecord () {
    paso1.style.display= 'none';
    paso2.style.display= 'block';
    paso3.style.display= 'none';
    paso4.style.display= 'none';
    paso5.style.display= 'none';
    paso6.style.display= 'none';
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
    height:  400, 
    width:  720
    }
    })
    .then(function(stream) {
    var recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function() {
        },
        });
    console.log(recorder.getState())
    if(recorder.getState() == 'inactive') {    
        video[0].srcObject = stream;
        video[0].play();
        video[1].srcObject = stream;
        video[1].play();
        media = recorder;    
    }
    })}
//Paso 4: Función que detiene la grabación y muestra la vista previa
function stopRecord () {
    paso1.style.display= 'none';
    paso2.style.display= 'none';
    paso3.style.display= 'none';
    paso4.style.display= 'block';
    paso5.style.display= 'none';
    paso6.style.display= 'none';
    media.stopRecording(function(){
        blob = media.getBlob()
        form.append('file', blob, 'myGif.gif');
        url = URL.createObjectURL(blob);
        uploadGif()
        console.log(media.getBlob())
        console.log(url)
        console.log(form.get('file'))
        videoCont.innerHTML = `<img class='previewdiv' alt='gatos' src=${url}>`;
    })
}
// Paso 3: función para empezar a grabar
function startRecord () {
    media.startRecording()
    console.log(media.getState())
    paso1.style.display= 'none';
    paso2.style.display= 'none';
    paso3.style.display= 'block';
    paso4.style.display= 'none';
    paso5.style.display= 'none';
    paso6.style.display= 'none';
}


function uploadGif() {

    fetch('https://upload.giphy.com/v1/gifs' + '?api_key=' + apiKey, {
        method: 'POST',
        //mode: 'no-cors',
        body: form
        }).then(data => {
        return data.json()
        }).then(data => {myStorage.setItem('gif' + data.data.id, JSON.stringify(data))
        myGif = data;
        urldescargargif = 'https://media.giphy.com/media/' + data.data.id + '/giphy.gif';
        console.log(urldescargargif);
        console.log(myGif)})
        .catch((error) => {
            return error})
};    
   


//Paso 5: función que muestra la pantalla de carga del guifo
function transicion() {
    paso1.style.display= 'none';
    paso2.style.display= 'none';
    paso3.style.display= 'none';
    paso4.style.display= 'none';
    paso5.style.display= 'block';
    paso6.style.display= 'none'; 
    setTimeout(() => {
        paso1.style.display= 'none';
        paso2.style.display= 'none';
        paso3.style.display= 'none';
        paso4.style.display= 'none';
        paso5.style.display= 'none';
        paso6.style.display= 'block';
        var div = document.createElement('div');
        div.innerHTML = `<img alt='gato' class='cuadrogaleria'src=${url}>`
        galeria.appendChild(div)
        preview2.innerHTML = `<img class='previewdiv2' alt='gatos' src=${url}>`;
    }, 3000)
}

descargarGif.addEventListener('click', () => {
    descargarGif.href = url;
    descargarGif.download = 'myGif.gif';
})

copiarGif.addEventListener('click', () => {
    navigator.clipboard.writeText(urldescargargif);
})

botonListo.addEventListener('click', () => {
    paso1.style.display= 'block';
    paso2.style.display= 'none';
    paso3.style.display= 'none';
    paso4.style.display= 'none';
    paso5.style.display= 'none';
    paso6.style.display= 'none';
})

function getMyGif(id) {
    fetch('https://media.giphy.com/media/' + id  + '/giphy.gif')
    .then((response) => {return response.json()})
    .then(data => { console.log(data);
    return data.data.url})
    
}

function getGifs () {
    for(i=0; i<myStorage.length; i++){
        if(myStorage.getItem(myStorage.key(i)).substr(0,13) == '{"data":{"id"'){
            console.log(JSON.parse(myStorage.getItem(myStorage.key(i))).data);
            var div = document.createElement('div');
            var object = JSON.parse(myStorage.getItem(myStorage.key(i)));
            console.log(object.data.id);
            var src = 'https://media.giphy.com/media/' + object.data.id + '/giphy.gif';
            div.innerHTML = `<img class='cuadrogaleria'src=${src}>`;
            galeria.appendChild(div)     
        }    
    }
}

paso2.style.display= 'none';
paso3.style.display= 'none';
paso4.style.display= 'none';
paso5.style.display= 'none';
paso6.style.display= 'none';

//document.addEventListener('DOMContentLoaded', function() {
    getGifs()//});

if(myStorage.getItem('temaThemeTema') == './Styles/styledark.css'){
    link.setAttribute('href', "./Styles/styledarkupload.css");
    imagenCapturar.setAttribute('src', 'assets/camera_light.svg');
} 

