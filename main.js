var navigate = (function(){
    'use strict';

    var routes = new Object;
    function setRoutes(arrObj){
        console.log('setRoute')
        routes.routes = arrObj;
    }
    function getRoutes(){
        console.log('getRoute')
        return routes;
    }
    function extractRoute(routeparam){
        console.log('extractRoute')
        return routeparam.slice(routeparam.indexOf('#')+1);
    }
    function getViews(){
        console.log('get View')
        var views = document.querySelectorAll('[data-route-view]');
        var arrayViews = [];
        for (var i = 0, len = views.length ; i < len ; i++){
            arrayViews.push(views[i])
        }
        return arrayViews;
    }
    function getActiveRoutes(){
        console.log('get active rouutes')
        var activeRoutes = document.querySelectorAll('[data-route]');
        var arrayActiveRoutes = [];
        for (var i = 0, len = activeRoutes.length ; i < len ; i++){
            arrayActiveRoutes.push(activeRoutes[i])
        }
        return arrayActiveRoutes;
    }
    function paraEvento(e){
        console.log('para evento')
        goTo(e.target.getAttribute('data-route'))
    }
    function bindEvent(){
        getActiveRoutes().forEach(function(e){
            e.removeEventListener('click', paraEvento, false);
            e.addEventListener('click', paraEvento, false);
            console.log('bindEvent')
        })
    }

    function goTo(toRoute, opt){
        console.log('goTo..')
        var opt = opt || new Object;
        opt.trace = typeof opt.trace === "undefined" ? true : opt.trace;
        var routeInfo = false;
        if(typeof getRoutes().routes !== "undefined"){
            routeInfo = getRoutes().routes.filter(function(e){
                return e.path === toRoute; 
            })[0]
        } 
        console.log(routeInfo)
        if(routeInfo){
            if(opt.trace) {history.pushState({}, '', '#'+routeInfo.path)}
            
            getViews().forEach(function(e){
                if (e.getAttribute('data-route-view') === routeInfo.name){
                    //accion si existe la ruta
                    // MostrarVista([e], arrayViews)
                    console.log("dentro Get View");
                }
            })
            
            console.log("dentro goTo IF")
        }
        console.log('goTo _toRoute', toRoute, opt.trace)
    }

    

    return {
        init: function(){
            console.log('init')
            bindEvent()
        },
        setRoutes: setRoutes,
        getRoutes: getRoutes,
        goTo: goTo,
        extractRoute: extractRoute,
        bindEvent: bindEvent,
        getActiveRoutes: getActiveRoutes,
        getViews: getViews
    }
})()




navigate.setRoutes([
    {
        path: '/',
        name: 'Root'
    },
    {
        path: '/contacts',
        name: 'Contacts'
    },
    {
        path: '/about',
        name: 'About'
    }
])

if (window.location.hash === '') window.location.hash='#/'


window.onload = function(){

   navigate.goTo(navigate.extractRoute(window.location.hash), {trace: false})

}

window.onhashchange = function(){

    navigate.goTo(navigate.extractRoute(window.location.hash), {trace: false})

}



