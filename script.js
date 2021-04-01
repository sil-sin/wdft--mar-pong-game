let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = "#302c2c"

// getting the paintbrush
let ctx = canvas.getContext('2d')

// The DOM of the start and the restart buttons
let startBtn = document.querySelector('#start')
let restartBtn = document.querySelector('#restart')



 //Everything begins here
window.addEventListener('load', () => {
   
    
    startBtn.addEventListener('click', () => {
        // do something when the user clicks the start button
    })

    restartBtn.addEventListener('click', () => {
        // do something when the user clicks the restart button
    })
})