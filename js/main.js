let phoneNav = document.querySelector('.navlinksForPhone');
let navlinksForPhoneBox = document.querySelector('.navlinksForPhoneBox');

phoneNav.addEventListener('click',()=>{
    let nav1 = document.querySelector('.navS1');
    let nav2 = document.querySelector('.navS2');
    let nav3 = document.querySelector('.navS3');

    nav1.classList.toggle('disNone');
    nav2.classList.toggle('rotate45');
    nav3.classList.toggle('rotate-45');
    
    let navlinksForPhoneBox = document.querySelector('.navlinksForPhoneBox');
    navlinksForPhoneBox.classList.toggle('disFlex');
})
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
        alert("First name, second name, email or message can' be empty ")
    }else if(atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){  
        alert('enter a valid email please')
    }else{
        alert('successfully submited the form')
    }
    
    
})