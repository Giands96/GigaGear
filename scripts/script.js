import { Input, initTWE } from "tw-elements";
initTWE({ Input }, { allowReinits: true });

/* SCRIPTS */

        const dropdownButton = document.getElementById('dropdownButton');
        const dropdownItems = document.getElementById('dropdownItems');
        const dropdownActive = document.getElementById('dropdown-active');
        const dropdownSubItems = document.getElementById('dropdownSubItems');
        const nav = document.getElementById('Dropdown');

        // Toggle main dropdown
        dropdownButton.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownItems.classList.toggle('hidden');
        });

        // Toggle subdropdown
        dropdownActive.addEventListener('mouseenter', () => {
            dropdownSubItems.classList.remove('hidden');
        });

        dropdownItems.addEventListener('mouseleave', () => {
            dropdownSubItems.classList.add('hidden');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (event) => {
            if (!dropdownButton.contains(event.target) && !dropdownItems.contains(event.target)) {
                dropdownItems.classList.add('hidden');
                dropdownSubItems.classList.add('hidden');
            }
        });

       

let shopItems = 0;
