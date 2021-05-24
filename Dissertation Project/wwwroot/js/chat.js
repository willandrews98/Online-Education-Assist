"use strict";

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
    var h2 = document.createElement("h2")
    h2.textContent = msg;
    document.getElementById("TaskMessage").appendChild(h2)

    var whatPage = document.getElementById("pages").value;

    if (whatPage == "Chat") {
        document.getElementById("circleGreenJS").style.backgroundColor = "#006400";
        document.getElementById("circleOrangeJS").style.backgroundColor = "#FFD300";
        document.getElementById("circleRedJS").style.backgroundColor = "#C40234";
    }

})

connection.on("ComplateTask", function (user, type) {

    var whatPage = document.getElementById("pages").value;
        var li = document.createElement("li");
        li.textContent = user;

    if (type == "Complate") {
        if (whatPage == "Chat") {
            document.getElementById("circleGreenJS").style.backgroundColor = "#00FF00";
            document.getElementById("circleOrangeJS").style.backgroundColor = "#FF8000";
            document.getElementById("circleRedJS").style.backgroundColor = "#C40234";
        } else {
            document.getElementById("complateList").appendChild(li);
        }

    } else if (type == "NeedHelp") {
        if (whatPage == "Chat") {
            document.getElementById("circleGreenJS").style.backgroundColor = "#006400";
            document.getElementById("circleOrangeJS").style.backgroundColor = "#FF8000";
            document.getElementById("circleRedJS").style.backgroundColor = "#FF0000";
        } else {
            document.getElementById("Pending").appendChild(li);
        }

    } else {
        if (whatPage == "Chat") {
            document.getElementById("circleGreenJS").style.backgroundColor = "#006400";
            document.getElementById("circleOrangeJS").style.backgroundColor = "#FFD300";
            document.getElementById("circleRedJS").style.backgroundColor = "#C40234";
        } else {
            document.getElementById("RequiresList").appendChild(li);
        }

    }
})

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;

    var whatPage = document.getElementById("pages").value;

    if (whatPage == "Chat") {
        document.getElementById("circleGreenJS").style.backgroundColor = "#006400";
        document.getElementById("circleOrangeJS").style.backgroundColor = "#FF8000";
        document.getElementById("circleRedJS").style.backgroundColor = "#C40234";
    }


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

document.getElementById("sendTaskButton").addEventListener("click", function (event) {
    var message = document.getElementById("taskInput").value;

    connection.invoke("SendTask", message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
})

document.getElementById("SendButtonGreen").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    connection.invoke("CompTask", user, "Complate").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
})

document.getElementById("SendButtonOrange").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    connection.invoke("CompTask", user, "Pending").catch(function (err) {
        return console.error(err.toString());
    })
    event.preventDefault();

})

document.getElementById("SendButtonRed").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    connection.invoke("CompTask", user, "NeedHelp").catch(function (err) {
        return console.error(err.toString());
    })
    event.preventDefault();
})