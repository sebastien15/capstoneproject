 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBvjmjsX3MiTZHsfzGJgPL3qmc2CfH-RtQ",
    authDomain: "capstone-99276.firebaseapp.com",
    databaseURL: "https://capstone-99276.firebaseio.com",
    projectId: "capstone-99276",
    storageBucket: "capstone-99276.appspot.com",
    messagingSenderId: "760139438417",
    appId: "1:760139438417:web:3bb80198d614f00d399b70",
    measurementId: "G-70QGBZ5JY6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();

  const allcontacts = document.querySelector('.allContacts');

  //create element and render contacts

  function renderContacts(doc) {
      let coverDiv = document.createElement('div');
      let conth3    = document.createElement('h3');
      let messageP    = document.createElement('p');
      let messageF    = document.createElement('footer');
      let mailButton    = document.createElement('a');
      let readButton    = document.createElement('a');
      let delButton    = document.createElement('a');

      coverDiv.setAttribute('data-id', doc.id);
      coverDiv.setAttribute('class', 'oneArt');
      mailButton.setAttribute('href','mailto:'+ doc.data().email);
      mailButton.setAttribute('class','contEdit');
      mailButton.textContent = "Mail me";
      readButton.setAttribute('class','contRead');
      readButton.textContent = "Mark as Read";
      delButton.setAttribute('class','contDel');
      delButton.textContent = 'Delete';
      conth3.textContent = doc.data().firstName;
      messageP.textContent = doc.data().message;

      messageF.appendChild(mailButton);
      messageF.appendChild(readButton);
      messageF.appendChild(delButton);
      coverDiv.appendChild(conth3);
      coverDiv.appendChild(messageP);
      coverDiv.appendChild(messageF);

      allcontacts.appendChild(coverDiv);

      delButton.addEventListener('click',(e)=>{
        e.stopPropagation();
        let id = e.target.parentElement.parentElement.getAttribute('data-id')
        // db.collection('contacts').doc(id).delete()
        db.collection('contacts').doc(id).delete().then(fireSuccess());
      })

  }

  db.collection('contacts').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        renderContacts(doc)
    })
  })


  // saving contac

  function saveContact(firstName,secondName,email,message) {
    db.collection('contacts').add({
      firstName: firstName,
      secondName: secondName,
      email: email,
      message: message
    })
  }

  // success message

  function fireSuccess(){
    let successAlert = document.querySelector('.successAlert');
    successAlert.style.display = 'flex'
    successAlert.style.alignContent = 'space-between'
  }