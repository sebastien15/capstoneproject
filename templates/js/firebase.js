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

  if (allcontacts != null) {
    db.collection('contacts').get().then((snapshot)=>{
      snapshot.docs.forEach(doc =>{
          renderContacts(doc)
      })
    })
  }


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

/* ------------------------------------------------------------------------ article scripts --------------------------------------------------------------- */
  // saving article

  let createF = document.querySelector('#createF');
  if (createF != null) {
    createF.addEventListener('submit',(e)=>{
        e.preventDefault();
        let Mytitle = document.querySelector('#artTitle').value
        let Mybody = document.querySelector('#artBody').value
  
        if(Mytitle == "" || Mybody ==""){
            alert("all fields are needed");
        }else{
            addArticle(Mytitle,Mybody)
            fireSuccess()
        }
    })
    function addArticle(title,body){
      db.collection('articles').add({
        title : title,
        body: body
      })
    }
  }

  // retrieve all articles at once


  let blogs = document.querySelector('.blogs');

  function renderBlogs(doc) {
    let blog = document.createElement('div')
    let blogImg = document.createElement('img')
    let blogTitle = document.createElement('h6')
    let blogDesc = document.createElement('div')
    let blogLink = document.createElement('div')
    let blogAuthorSpan = document.createElement('span')
    let blogDateSpan = document.createElement('span')
    let blogHoverSpan = document.createElement('span')
    let blogHoverA = document.createElement('a')
    let actions    = document.createElement('div')
    let editB = document.createElement('a')
    let pubB = document.createElement('a')
    let delB = document.createElement('a')

    editB.setAttribute('class','editB')
    pubB.setAttribute('class','pubB')
    delB.setAttribute('class','delB')
    actions.setAttribute('class','actionB')

    editB.textContent="Edit"
    pubB.textContent="Un publish"
    delB.textContent="Delete"

    blog.setAttribute('class','singleBlog')
    blogImg.setAttribute('src','../images/port/1.png')
    blogAuthorSpan.setAttribute('id','blogauthor')
    blogDateSpan.setAttribute('id','blogdatepublished')
    blogLink.setAttribute('class','hoverableLink')
    blogHoverA.setAttribute('href','blogSingle.html')
    blogDesc.setAttribute('class','blogDesc')
    editB.setAttribute('data-id',doc.id)
    pubB.setAttribute('data-id',doc.id)
    delB.setAttribute('data-id',doc.id)

    blogHoverA.textContent = "View More";
    blogHoverSpan.appendChild(blogHoverA)
    blogLink.appendChild(blogHoverSpan)

    actions.appendChild(editB)
    actions.appendChild(pubB)
    actions.appendChild(delB)

    blogAuthorSpan.textContent = "Author: " + doc.data().author
    blogDateSpan.textContent = doc.data().dateAdded;
    blogDesc.appendChild(blogAuthorSpan)
    blogDesc.appendChild(blogAuthorSpan)

    blogTitle.textContent = doc.data().title

    blog.appendChild(blogImg)
    blog.appendChild(blogTitle)
    blog.appendChild(blogDesc)
    blog.appendChild(blogLink)
    blog.appendChild(actions)
    blogs.appendChild(blog)

    delB.addEventListener('click',(e)=>{
      e.stopPropagation
      let id = e.target.getAttribute('data-id')
      db.collection('articles').doc(id).delete().then(fireSuccess());
    })
  }
if (blogs != null) {
  db.collection('articles').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        renderBlogs(doc)
    })
  })
}

