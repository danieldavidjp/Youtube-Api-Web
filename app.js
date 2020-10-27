 // 2. This code loads the IFrame Player API code asynchronously.
 var tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 var firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var j=0;
 // 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 var isPlaying = false;
 function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        //margin: 'auto',
        videoId: 'qA2egYS58Nc',
   });
}


function pauseVideo() {
   player.pauseVideo();
   isPlaying = false;
   document.getElementById("pregunta").style.display="block";
   document.getElementById("resultado").style.display= "none";
}


function iniciarQuiz(){
    function playVideo(){
        player.playVideo();
        isPlaying = true;
    }
    playVideo();
    document.getElementById("button1").style.display ="none";
    document.getElementById("p1").style.display ="none";
    if (isPlaying == true){
        setTimeout(pauseVideo, arregloPreguntas[j][3]);
        document.getElementById("preguntas").innerHTML= arregloPreguntas[j][4]; 
        document.querySelector('label[for="res1"]').textContent = arregloPreguntas[j][0];
        document.querySelector('label[for="res2"]').textContent = arregloPreguntas[j][1];
        document.querySelector('label[for="res3"]').textContent = arregloPreguntas[j][2];
    }
    document.getElementById("submitbutton").onclick = function submitAnswer() {
        var radios = document.getElementsByName("respuestas");
        var i = 0, len = radios.length;
        var checked = false;
        var userAnswer;
        isPlaying = false;
        
        for( ; i < len; i++ ) {
           if(radios[i].checked) {
             checked = true;
             userAnswer = radios[i].value;
           }
        } 
        // if user click submit button without selecting any option, alert box should be say "please select choice answer".
        if(!checked) {
          alert("please select choice answer");
          return;
        }
        // Correct answer
        if(userAnswer == respuestaCorrecta[j]) {
           document.getElementById("resultado").innerHTML = "Es correcto!";
           document.getElementById("resultado").style.display= "block";
           playVideo();
           document.getElementById("pregunta").style.display="none";
           isPlaying = true;
           j++;
           if (isPlaying == true){
            setTimeout(pauseVideo, arregloPreguntas[j][3]);
            document.getElementById("preguntas").innerHTML= arregloPreguntas[j][4]; 
            document.querySelector('label[for="res1"]').textContent = arregloPreguntas[j][0];
            document.querySelector('label[for="res2"]').textContent = arregloPreguntas[j][1];
            document.querySelector('label[for="res3"]').textContent = arregloPreguntas[j][2];
        }
        }
        // incorrect answer
        else {
           alert("Respuesta Incorrecta, Vuelve a intentarlo!");
        }
        return false;
        
    }
}

var arregloPreguntas = [
    ['Central processing unit','Processing Central Unit','Unit Central Processing',26000,"¿Cómo se le conoce a la unidad central de procesamiento en inglés?"],
    ['Compuertas lógicas','Cobre','Transistores',23000, "Qué elementos componen una Unidad de Procesamiento Central?"],
    ['John Witherspoon','John Von Neumann','Nikolas Tesla',43000, "Quién creó la arquitectura más usada en los procesadores actuales?"]
];
var respuestaCorrecta = ["res1","res3", "res2"];

   
