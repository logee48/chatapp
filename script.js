const a = prompt("Enter your name: ");
    const username = a;



    const firebaseConfig = {
        apiKey: "AIzaSyCd-fxdY_uYnpZaCD6YGJH0SA67R9G5c5U",
        authDomain: "three-91e61.firebaseapp.com",
        databaseURL: "https://three-91e61-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "three-91e61",
        storageBucket: "three-91e61.appspot.com",
        messagingSenderId: "1057079527103",
        appId: "1:1057079527103:web:33fc32778464d7939f280a"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    // initialize database
    const db = firebase.database();

    // get user's data


    // submit form
    // listen for submit event on the form and call the postChat function
    document.getElementById("message-form").addEventListener("submit", sendMessage);

    // send message to db
    function sendMessage(e) {
      e.preventDefault();

      // get values to be submitted
      const timestamp = Date.now();
      var today = new Date();
      var time = today.getHours() + ":" + today.getMinutes() ;
      const messageInput = document.getElementById("message-input");
      const message = messageInput.value;

      // clear the input box
      messageInput.value = "";


/*      //auto scroll thing that i created works perfectly fine
      function scroll_to(div){
       if (div.scrollTop < div.scrollHeight - div.clientHeight)
            div.scrollTop += 10; // move down
      }
      scroll_to('message');  not working*/


  /*    // new scroll thing test version
      window.setInterval(function() {
        var elem = document.getElementById('messages');
        elem.scrollTop = elem.scrollHeight;
      }, 5000);      not working  */

      var objDiv = document.getElementById("body1");
      objDiv.scrollTop = objDiv.scrollHeight;


      // create db collection and send in the data
      // messages term can anything
      db.ref("messages/" + timestamp).set({
        username,
        message,
        time
      });
    }

    // display the messages
    // reference the collection created earlier
    const fetchChat = db.ref("messages/");

    // check for new messages using the onChildAdded event listener
  fetchChat.on("child_added", function (snapshot) {
      const messages = snapshot.val();
      var aaa = messages.time;

      // append the message on the page
      var messs = `<ul><div><span id="messagecolor">${messages.username} : ${messages.message}</span><span id="timething">${messages.time}</span></div></ul>`;
      document.getElementById("messages").innerHTML += messs;
      //var zeb = messages.message;
      //document.getElementById("test").innerHTML += zeb
      //document.getElementById("test").innerHTML += /\n/;
    });

  /*  fetchChat.on("child_added", function(snapshot){
      const messages = snapshot.val();
      const mmm = `<li class=${username === messages.username ? "sent" : "receive"}> <span>${messages.username}: </span> ${messages.message} ${messages.time}</li>`;
      document.getElementById("timeee").innerHTML += mmm;
    }                */
