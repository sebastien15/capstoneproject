auth.onAuthStateChanged(user=>{
    if(!user){
        window.location.href = "http://127.0.0.1:5500/index.html";
    }
})
var tabPreset= 'mainTab';

function displayTab(currentTab){
    if (currentTab == undefined) currentTab = tabPreset;

    let tabs = document.querySelectorAll('.tab');
    for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        tab.classList.add('disNone')
        if(tab.classList.contains(currentTab)) tab.classList.remove('disNone')
    }
}
displayTab()

function showMap(long, lat) {
    // <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAOyqBpPNPu7yf7jtVXfiSYnY8zi_roJz4&callback=initMap"
    // type="text/javascript"></script>
    var latlon = lat + "," + long;

    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=AIzaSyAOyqBpPNPu7yf7jtVXfiSYnY8zi_roJz4";
  
    document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
}

