## Navigate.JS
### Client Side Router

html
```html
    <button data-route="/">Root</button>
    <button data-route="/vista2">Vista 2</button>
    <button data-route="/contacts">Contacts</button>
    <button data-route="/about">About</button>

    <div data-route-view="Root" class="center">
        <img src="1.jpg" alt="" class="ancho">
    </div>
    <div data-route-view="Contacts" class="center">
        <img src="2.jpg" alt="" class="ancho">
    </div>
    <div data-route-view="About" class="center">
        <img src="3.jpg" alt="" class="ancho">
    </div>
    <div data-route-view="vista2" class="center"> 
        <img src="4.jpg" alt="" class="ancho">
    </div>


    <script src="navigate.js"></script>
    <script src="main.js"></script>
```

main.js
```js
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
```

examples
```js
navigate.goTo('/contacts')

navigate.goTo('/about', {
    show: false,
    after: function(){
        console.log("Whatever IS")
    }
})

navigate.goTo('/about', {
    before: function(){
        console.log("Whatever Other")
    }
})
```
