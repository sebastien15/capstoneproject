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


// log in modal

{
    let signButton = document.querySelectorAll('.signin');
    let loginModal = document.querySelector('.loginModal');
    let loginCloser = document.querySelector('#closeL');

    signButton.forEach(element => {
        
        element.addEventListener('click',()=>{
            loginModal.style.display="block";
        });
    });
    loginCloser.addEventListener('click',()=>{
        loginModal.style.display="none";
    })
}

// sign in form

{
    let signInForm = document.querySelector('#signInForm')
    let unameErrorBox = document.querySelector('#unameErrorBox')
    let passErrorBox = document.querySelector('#passErrorBox')
    
    signInForm.addEventListener('submit',(e)=>{
        let myuname = document.querySelector('#uname').value
        let mypass = document.querySelector('#pass').value
        let rem = document.querySelector('#rem').value
        e.preventDefault();
        if (myuname !="" || pass !="") {
            pushData(myuname,mypass)
        }else{
            unameErrorBox.classList.remove('disNone')
            passErrorBox.classList.remove('disNone');
        }
    })
}
function pushData(myuname, mypass){
    authorRef.push({
        uname: myuname,
        pass: mypass
    })
    window.location.href = "http://127.0.0.1:5500/pages/admin/dashboard.html";
}



// geolocation scripts
{
    let x = document.getElementById("demo");

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(userPosition);
        } else {
            x.innerText = "Geolocation is not supported by this browser.";
        }
    }

    function userPosition(position) {
        x.innerHTML = "Your Latitude is: " + position.coords.latitude +
        "<br> Your Longitude is: " + position.coords.longitude;
    }
    getLocation()
}