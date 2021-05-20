﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var group = "PrivateGroup";


//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("ReceiveTaskMessage", function (message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    h2.textContent = msg
    document.getElementById("TaskMessage").appendChild(h2)
})

connection.on("ReplyTask", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");


})

connection.on("ComplateTask", function (user) {


    document.getElementById(user +"Complate").style.color = 'blue'
})

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

document.getElementById("SendButtonNotes").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("NoteMessage").value;
    connection.invoke("SendNote", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
})
