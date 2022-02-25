

const btnLeerTexto = document.querySelector('.btn-leer')

btnLeerTexto.addEventListener('click', ()=>{
    const locutor = new SpeechSynthesisUtterance()
    const voz = window.speechSynthesis
    locutor.text = "hola mi amor"
    voz.speak(locutor)
})