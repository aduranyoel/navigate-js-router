## navigate-js-router.js
### Client Side Router

html
```html
    <div style="float: left;">
        <button data-route="/">Root</button>
        <button data-route="/vista2">Empty</button>
        <button data-route="/contacts">Contacts</button>
        <button data-route="/about">About</button>

        <div id="container" style="margin-top: 15px;"></div>
    </div>
    <div style="float: left;">
        <div data-route-view="Root">
            <img src="1.jpg" alt="" style="width: 300px">
        </div>
        <div data-route-view="Contacts">
            <img src="2.jpg" alt="" style="width: 300px">
        </div>
        <div data-route-view="About">
            <img src="3.jpg" alt="" style="width: 300px">
        </div>
        <div data-route-view="vista2"> 
            <img src="4.jpg" alt="" style="width: 300px">
        </div>
    </div>


    <script src="../navigate-js-router.js"></script>
    <script src="main.js"></script>

```

main.js
```js
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


```


### Ejemplos de uso
```js

// establece las rutas
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
        view: ['Contacts', 'Root'], // se pueden pasar varias vistas
        allow: false, // vista no permitida
        key: '321-321321', // proporsionar este "key" en las opciones para acceder a esta vista
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

// agrega una nueva ruta
navigate.addRoute('/newPath', {
    view: "myView",
    show: true
})

// actualiza las opciones de la ruta
navigate.updateRoute('/about', {
    view: "otherView"
})

navigate.delRoute('/about') // elimina la ruta

navigate.getRoutes() // optiene todas las rutas

navigate.getRoutes('/about') // optiene la ruta especificada

navigate.getParams() // obtiene todos los parametros de la url

navigate.getParams('myparam') // obtiene el parametro especificado de la url

navigate.init() // inicia el modulo ( oculta las vistas y agrega los "Listener" )

navigate.init('/about') // inicia el modulo y va a esta ruta por defecto

navigate.goto('/contacts') // ir con las opciones establecidas en "getRoutes"

// ir con opciones personalizadas, pero sin cambiar las opciones en "getRoutes"
navigate.goto('/about', {
    show: false,
    after: function(){
        console.log("Whatever after")
    }
})

navigate.goto('/about', {
    before: function(){
        console.log("Whatever before")
    },
    view: "otherView",
    update: true // ir con las opciones personalizadas y cambiarlas en "getRoutes"
})

navigate.getViews() // optiene todas las vistas ( '[data-route-view]' )

navigate.getActiveRoutes() // optiene todas las rutas activas ( '[data-route]' )

navigate.bindEvent() // agrega los "Listener" a las rutas activas ( '[data-route]' )

navigate.hideViews() // aculta todas las vistas

navigate.addOnLoad() // agrega el modulo al evento "load"

navigate.addOnhashchange() // agrega el modulo al evento "hashchange"

```
