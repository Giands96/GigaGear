document.addEventListener('DOMContentLoaded', function() {
    const dropdownButton = document.getElementById('dropdownButton');
const dropdownItems = document.getElementById('dropdownItems');
const dropdownActive = document.getElementById('dropdown-active');
const dropdownSubItems = document.getElementById('dropdownSubItems');
 

// Mantener el dropDown
dropdownButton.addEventListener('click', () => {
    dropdownItems.classList.toggle('hidden');

});

// Mantener subdropdown
dropdownActive.addEventListener('mouseenter', () => {
    dropdownSubItems.classList.remove('hidden');
});

dropdownItems.addEventListener('mouseleave', () => {
    dropdownSubItems.classList.add('hidden');
    dropdownItems.classList.add('hidden');
});

dropdownSubItems.addEventListener('mouseleave', () =>{
  dropdownSubItems.classList.add('hidden')
})

// Cerrar dropdown cuando se haga click fuera
document.addEventListener('click', (event) => {
    if (!dropdownButton.contains(event.target) && !dropdownItems.contains(event.target)) {
        dropdownItems.classList.add('hidden');
        dropdownSubItems.classList.add('hidden');
    }
});
  });

