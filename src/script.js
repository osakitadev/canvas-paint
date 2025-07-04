'use strict'
const canvas = document.querySelector('canvas')
const clearCanvas = document.getElementById('clearCanvas')
const brushSize = document.getElementById('brushSize')
const colorPicker = document.getElementById('colorPicker')

if (!canvas.getContext) {
  throw new Error('Canvas not supported in your browser.')
}

let isDrawing = false
let mouseX = 0
let mouseY = 0
let prevMouseX = 0
let prevMouseY = 0

const ctx = canvas.getContext('2d')

function draw() {
  if (isDrawing) {
    ctx.lineCap = 'round'
    ctx.strokeStyle = colorPicker.value

    ctx.beginPath()
    ctx.moveTo(prevMouseX, prevMouseY)
    ctx.lineTo(mouseX, mouseY)
    ctx.stroke()
    ctx.closePath()
  }

  updateLastMouseCoordinates()
  requestAnimationFrame(draw)
}

function updateMouseCoordinates(event) {
  const boundingRect = canvas.getBoundingClientRect()
  mouseX = event.clientX - boundingRect.x
  mouseY = event.clientY - boundingRect.y
}

function updateLastMouseCoordinates() {
  prevMouseX = mouseX
  prevMouseY = mouseY
}

document.addEventListener('mousemove', event => updateMouseCoordinates(event))

clearCanvas.addEventListener('click', () =>
  ctx.clearRect(0, 0, canvas.width, canvas.height)
)

canvas.addEventListener('mousedown', event => {
  updateMouseCoordinates(event)
  updateLastMouseCoordinates()

  isDrawing = true
})

canvas.addEventListener('mouseup', () => (isDrawing = false))
canvas.addEventListener('mouseleave', () => (isDrawing = false))
brushSize.addEventListener('change', () => (ctx.lineWidth = brushSize.value))

requestAnimationFrame(draw)
