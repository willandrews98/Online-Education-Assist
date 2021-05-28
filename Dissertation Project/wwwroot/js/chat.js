"use strict";


var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

//Receive the message
connection.on("ReceiveMessage", function (groupName, user, message) {

    if (groupName == document.getElementById("groupName").value)
    {
        var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        var encodedMsg = user + " says " + msg;
        var li = document.createElement("li");
        li.textContent = encodedMsg;
        document.getElementById("messagesList").appendChild(li);
    }
});

//Receive the task
connection.on("ReceiveTaskMessage", function (groupName, message) {

    if (groupName == document.getElementById("groupName").value)
    {
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
    }

})

//Receive the message
connection.on("ComplateTask", function (groupName, user, type) {

    if (groupName == document.getElementById("groupName").value)
    {
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
    }
})

// Load on start up
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;

  /*  var user = document.getElementById("userInput").value;
    var groupName = document.getElementById("groupName").value;
 
    connection.invoke("JoinGroup", user, groupName)
    e.preventDefault(); */

    var whatPage = document.getElementById("pages").value;

    if (whatPage == "Chat") {
        document.getElementById("circleGreenJS").style.backgroundColor = "#006400";
        document.getElementById("circleOrangeJS").style.backgroundColor = "#FF8000";
        document.getElementById("circleRedJS").style.backgroundColor = "#C40234";
    }


}).catch(function (err) {
    return console.error(err.toString());
});

//send button for message
document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    var groupName = document.getElementById("groupName").value;
    connection.invoke("SendMessage", groupName, user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

//send button for task
document.getElementById("sendTaskButton").addEventListener("click", function (event) {
    var message = document.getElementById("taskInput").value;
    var groupName = document.getElementById("groupName").value;

    connection.invoke("SendTask", groupName, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
})

//send button for green
document.getElementById("SendButtonGreen").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var groupName = document.getElementById("groupName").value;
    connection.invoke("CompTask", groupName, user, "Complate").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
})

//send button for orange
document.getElementById("SendButtonOrange").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var groupName = document.getElementById("groupName").value;
    connection.invoke("CompTask",groupName, user, "Pending").catch(function (err) {
        return console.error(err.toString());
    })
    event.preventDefault();

})

//send button for red
document.getElementById("SendButtonRed").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    connection.invoke("CompTask", groupName,user, "NeedHelp").catch(function (err) {
        return console.error(err.toString());
    })
    event.preventDefault();
})