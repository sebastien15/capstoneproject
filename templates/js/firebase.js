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
  const auth = firebase.auth();

  // auth staus
  auth.onAuthStateChanged(user=>{
    let signinBtn = document.querySelectorAll('.signin');
    if(user){
      // location.reload()
      signinBtn.forEach(btn=>{
        btn.parentElement.style.display='none'
      })
      document.querySelector('.logout').parentElement.style.display= 'block'
    }else{
      // location.reload()     
      document.querySelector('.logout').parentElement.style.display= 'none'
      signinBtn.forEach(btn=>{
        btn.parentElement.style.display='block'
      })
    }
  })

  /* authenicate user starts*/
  
  const signupform = document.querySelector('#RegisterForm')
  const signinform = document.querySelector('#signInForm')
  
  if (signupform != null) {
    signupform.addEventListener('submit',(e)=>{
      e.preventDefault()

      //get user info
      const email = signupform['useremail'].value
      const password = signupform['userpass'].value
      //signup user

      auth.createUserWithEmailAndPassword(email,password).then(cred=>{
        console.log(cred.user)
        signupform.parentNode.parentNode.style.display='none'
        document.querySelector('.logout').style.display= 'block'
        window.location.href = "http://127.0.0.1:5500/pages/admin/dashboard.html";
      })  
    })

    //sign out user

    const logout = document.querySelector('.logout')
    logout.addEventListener('click',(e)=>{
      e.preventDefault();
      auth.signOut().then(()=>{
        document.querySelector('.logout').parentElement.style.display= 'none'
        window.location.href = "http://127.0.0.1:5500/index.html";
      })
    })      
    // login user

    signinform.addEventListener('submit',(e)=>{
      e.preventDefault()
      const  logemail = signinform['uname'].value
      const logpass = signinform['pass'].value

      auth.signInWithEmailAndPassword(logemail,logpass).then(cred=>{
        // console.log(cred)
        signinform.parentNode.parentNode.style.display='none'
        window.location.href = "http://127.0.0.1:5500/pages/admin/dashboard.html";
        document.querySelector('.logout').style.display= 'block'
      })
    })
  }  
  
  
  /* authenicate user ends*/

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


  // saving contact

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
  // saving article and edit article

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
    let blogTitle = document.createElement('a')
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
    blogTitle.setAttribute('data-id',doc.id)

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
    
    auth.onAuthStateChanged(user=>{
      if(user){
        blog.appendChild(actions)
        delB.addEventListener('click',(e)=>{
          e.stopPropagation
          let id = e.target.getAttribute('data-id')
          db.collection('articles').doc(id).delete().then(fireSuccess());
        })
    
        editB.addEventListener('click',(e)=>{
          e.stopPropagation
          let id = e.target.getAttribute('data-id')
          let tabPreset = 'editTab'
          window.location.href = "http://127.0.0.1:5500/pages/admin/dashboard.html?id="+id+"&tabPreset="+tabPreset;
        })
        pubB.addEventListener('click',(e)=>{
          e.stopPropagation
          let id = e.target.getAttribute('data-id')
          db.collection('articles').doc(id).update({
            published: false
          }).then(location.reload());
        })
      }else{
      }
    })

    
    blogs.appendChild(blog)
    
    blogTitle.addEventListener('click',(e)=>{
      e.stopPropagation
      let id = e.target.getAttribute('data-id')
      window.location.href = "http://127.0.0.1:5500/pages/blogSingle.html?id="+id;
    })
  }
if (blogs != null) {
  db.collection('articles').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        renderBlogs(doc)
    })
  })
}


//retrieve one blog


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let urlId = urlParams.get('id')
let tabP = urlParams.get('tabPreset')
if( urlId != null){
    db.collection('articles').doc(urlId).get().then((doc)=>{
      if (singleBlogSection != null) {
        renderBlog(doc)
      }
    })
    document.querySelector("#blogid").value= urlId
}
let singleBlogSection = document.querySelector('.blogsingle');

function renderBlog(doc) {
  let blogTitle = document.createElement('h2');
  let blogBody = document.createElement('div');

  blogTitle.textContent = doc.data().title
  blogBody.textContent = doc.data().body

  singleBlogSection.appendChild(blogTitle)
  singleBlogSection.appendChild(blogBody)
}


// edit a blog

if (urlId != null && tabP != null) {
  db.collection('articles').doc(urlId).get().then((doc)=>{
    editBlog(doc)
    console.log(doc)
  })
}

function editBlog(doc) {
  let editTitle = document.querySelector('#artTitleE')
  let editBody = document.querySelector('#artBodyE')
  
  editTitle.value = doc.data().title
  editBody.value = doc.data().body
  displayTab(tabP)
}


// update blog

// function updateBlog(title,blog) {
  
// }

let editForm = document.querySelector('#editForm');

if (editForm != null) {
  if (urlId != null) {
    editForm.addEventListener('submit',(e)=>{
      e.preventDefault();
      let Mytitle = document.querySelector('#artTitleE').value
      let Mybody = document.querySelector('#artBodyE').value
    
      if(Mytitle == "" || Mybody ==""){
          alert("all fields are needed");
      }else{
          editArticle(Mytitle,Mybody,urlId)
          fireSuccess()
      }
    })
  }
}
function editArticle(title,body,urlId){
  db.collection('articles').doc(urlId).update({
    title : title,
    body: body
  })
}




/* ----------------------------------------------- Retrieve detectors ----------------------------------------------------------------------- */
let visitors= document.querySelector('.visitorBox')
if (visitors != null) {
  db.collection('visitors').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        renderVisitors(doc)
    })
  })
}

function renderVisitors(doc) {
  let singleV = document.createElement('div')
  let longP = document.createElement('p')
  let latP = document.createElement('p')
  let body = document.createElement('div')
  let footer = document.createElement('div')
  let button = document.createElement('button')

  body.setAttribute('class','body')
  footer.setAttribute('class','footer')
  singleV.setAttribute('class','visSingle')
  button.setAttribute('data-long',doc.data().long)
  button.setAttribute('data-lat',doc.data().lat)

  longP.textContent = "Longitude: " + doc.data().long
  latP.textContent = "Latitude: " + doc.data().lat
  button.textContent= "locate"

  body.appendChild(longP)
  body.appendChild(latP)
  footer.appendChild(button)
  singleV.appendChild(body)
  singleV.appendChild(footer)

  visitors.appendChild(singleV)

  button.addEventListener('click',showMap(doc.data().long,doc.data().lat))
}



/* --------------------------- comment section ----------------------------------------------------------------- */

let commentForm = document.querySelector('#commentForm')
let commentSec = document.querySelector('.commentSection')

// retrieve all comments related to a post
if (commentForm != null) {
  var commentref = firebase.database().ref("comments");

  commentref.on("value", function(snapshot) {
    snapshot.forEach(doc=>{
      let name = document.createElement('h3')
      let comment = document.createElement('p')
      let singleComment = document.createElement('div')
      let hr = document.createElement('hr')
      let br = document.createElement('br')

      singleComment.setAttribute('class','singleComment')

      name.textContent = doc.val().name
      comment.textContent = doc.val().comment

      singleComment.appendChild(name)
      singleComment.appendChild(comment)
      singleComment.appendChild(hr)
      singleComment.appendChild(br)
      commentSec.appendChild(singleComment)
      // if(doc.val().blogid == urlId){
      //   console.log(doc.val().blogid)
      // }
    });
  }, function (error) {
    console.log("Error: " + error.code);
  });
  commentForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    let userName = document.querySelector('#commentName').value
    let blogId = document.querySelector('#blogid').value
    let comment = document.querySelector('#commentText').value
    if (userName =="" || comment == "") {
      console.log('please enter your name and comment')
    }else{
      commentref.push({
        name: userName,
        blogid:blogId,
        comment: comment
      })
    }
  })
}
