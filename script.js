const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const this_name = prompt('What is your name buddy?')

appendMesage('You Joined')
socket.emit('new-user', this_name)

socket.on('user-connected', data =>{
    appendMesage(`${data} connected`)
})

socket.on('chat-message', data =>{
    appendMesage(`${data.name}: ${data.message}`)
})

socket.on('user-dissconnected', data =>{
    appendMesage(`${data} dissconnected`)
})

messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMesage(`You: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMesage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)

}