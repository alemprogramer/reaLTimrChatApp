const socket  = io()
let name ;
let messageArea = document.querySelector('.message__area');
let textarea = document.querySelector('#textarea')

do{
    name = prompt('Enter your name : ')
    
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg = {
        user:name,
        message:message.trim()
    }
    console.log(msg.name);
    appendMessage(msg,'outgoing')
    textarea.value = ''
        messageArea.scrollTop = messageArea.scrollHeight

    // send to server 
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className = type;
    mainDiv.classList.add(className,'message')

    let markup = `
       <h4>${msg.user}</h4>
       <p>${msg.message}</p>
       
    `

    mainDiv.innerHTML = markup;
    messageArea.append(mainDiv);
}

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    messageArea.scrollTop = messageArea.scrollHeight
})





