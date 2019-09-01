navigate.setRoutes([
    {
        path: '/',
        view: 'Root',
        show: true,
        before: function(){
            console.log("BEFORE /")
        }

    },
    {
        path: '/contacts',
        view: 'Contacts',
        before: function(){
            console.log("BEFORE CONTACTS")
        }
    },
    {
        path: '/about',
        view: 'About',
        before: function(){
            console.log("BEFORE ABOUT")
        }
    }
]);

navigate.init('/about');

