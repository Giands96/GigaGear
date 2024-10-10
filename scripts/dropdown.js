document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('dropdownButton');
const dropdownItems = document.getElementById('dropdownItems');
const dropdownActive = document.getElementById('dropdown-active');
const dropdownSubItems = document.getElementById('dropdownSubItems');
const dropdownGpu = document.getElementById('dropdown-gpu');
const dropdownMonitor = document.getElementById('dropdown-active-monitors');
const dropdownSubItemMonitors = document.getElementById('dropdownSubItemsMonitors');
const dropdownLaptops = document.getElementById('dropdown-laptops');

// Mantener el dropDown
dropdownButton.addEventListener('click', () => {
    dropdownItems.classList.toggle('hidden');

});

// Mantener subdropdown
dropdownActive.addEventListener('mouseenter', () => {
    dropdownSubItems.classList.remove('hidden');
    dropdownSubItemMonitors.classList.add('hidden');
});


dropdownItems.addEventListener('mouseleave', () => {
    dropdownSubItems.classList.add('hidden');
    dropdownItems.classList.add('hidden');
});

dropdownSubItems.addEventListener('mouseleave', () =>{
  dropdownSubItems.classList.add('hidden')
});

//Dropdown para Monitores y Accesorios



dropdownMonitor.addEventListener('mouseenter', ()=> {
    dropdownSubItemMonitors.classList.remove('hidden');
    dropdownSubItems.classList.add('hidden');
});



dropdownSubItemMonitors.addEventListener('mouseleave',()=>{
    dropdownSubItems.classList.add('hidden')
})

dropdownLaptops.addEventListener('mouseenter',()=>{
    dropdownSubItems.classList.add('hidden');
    dropdownSubItemsMonitors.classList.add('hidden');
})



// Cerrar dropdown cuando se haga click fuera
document.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownItems.contains(event.target)) {
        dropdownItems.classList.add('hidden');
        dropdownSubItems.classList.add('hidden');
    }
});


  });

