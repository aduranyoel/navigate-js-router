navigate.setRoutes([
    {
        path: '/',
        view: 'Root',
        show: true,
        before: function(){
            console.log("Before Action")
        },
        after: function(){
            console.log("After Action")
        }
    },
    {
        path: '/contacts',
        view: 'Contacts'
    },
    {
        path: '/about',
        view: 'About'
    }
]);

navigate.init();



navigate.goTo('/contacts')

navigate.goTo('/about', {
    show: false,
    after: function(){
        console.log("Whatever IS")
    }
})