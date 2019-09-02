window.$nav = window.navigate = navigate; // opcional
var container = document.getElementById('container');

navigate.setRoutes([
    {
        path: '/',
        view: 'Root',
        before: function(){
            container.innerHTML += 'BEFORE Root >><br>'
        },
        after: function(){
            container.innerHTML += 'AFTER Root >><br>';
        }
    },
    {
        path: '/contacts',
        view: ['Contacts', 'Root'],
        before: function(){
            container.innerHTML += 'BEFORE Contacts <br>';
        }
    },
    {
        path: '/about',
        view: 'About',
        before: function(){
            container.innerHTML += 'BEFORE ABOUT <br>'
        }
    }
    
]);

navigate.init('/about');