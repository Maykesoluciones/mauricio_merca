
const btnLeerTexto = document.querySelector('.btn-leer')


btnLeerTexto.addEventListener('click', ()=>{

           
        var voz = new SpeechSynthesisUtterance('ok, gracias por tu tiempo, Encendida');
        voz.rate = 0.9; // velocidad de reproduccion valor menor mas lento
        window.speechSynthesis.speak(voz);
})