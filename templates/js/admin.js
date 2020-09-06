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