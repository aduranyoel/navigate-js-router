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
        allow: false,
        key: '321-321321',
        before: function(){
            container.innerHTML += 'BEFORE Contacts <br>';
        }
    },
    {
        path: '/about',
        view: 'About',
        before: function(data){
            container.innerHTML += 'BEFORE ABOUT <br>'
            console.log(data)
        }
    }
    
]);

navigate.init('/about?myparam=valueparam&otroparam=otrovalor');
