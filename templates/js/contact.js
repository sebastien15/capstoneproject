let myform = document.querySelector('#contactForm');
myform.addEventListener('submit',(e)=>{
    e.preventDefault()
    let firstName = document.querySelector('#firstName').value;
    let secondName = document.querySelector('#lastName').value;
    let email = document.querySelector('#email').value;
    let message = document.querySelector('#message').value;

    var atposition=email.indexOf("@");  
    var dotposition=email.lastIndexOf("."); 
    
    if (firstName == "" || secondName == "" || email == "" || message == "") {
        let allErr = document.querySelector('#AllErrorBox');
        let closer = document.querySelector('#AllErrorBox span');
        allErr.style.display = "flex";
        closer.addEventListener('click',()=>{
            closer.parentNode.style.display = "none";
        })
        if (true) {window.scrollTo(0,0)}
    }else if(atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){  
        let emErr = document.querySelector('#emailErrorBox');
        let closer = document.querySelector('#emailErrorBox span');
        emErr.style.display = "flex";
        closer.addEventListener('click',()=>{
            closer.parentNode.style.display = "none";
        })
        if (true) {window.scrollTo(0,0)}
    }else if(message.length<20){
        let mess = document.querySelector('#messErrorBox');
        let closer = document.querySelector('#messErrorBox span');
        mess.style.display = "flex";
        closer.addEventListener('click',()=>{
            closer.parentNode.style.display = "none";
        })
        if (true) {window.scrollTo(0,0)}
    }else{
        saveContact(firstName,secondName,email,message)
        document.querySelector('#firstName').value =""
        document.querySelector('#lastName').value =""
        document.querySelector('#email').value =""
        document.querySelector('#message').value =""
        document.querySelector('.successBox').style.display= 'flex'
    }    
})