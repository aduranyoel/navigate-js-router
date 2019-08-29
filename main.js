var navigate = (function(){

    function setRoutes(arrObj){
        this.routes = new Router(arrObj);
    }
    function getRoutes(){
        return this.routes;
    }
    var Router = function(paramRouter){
        return {
            routes: paramRouter
        }
    }
    function extractRoute(route){
        return route.slice(route.indexOf('#')+1);
    }
    function getViews(){
        var views = document.querySelectorAll('[data-route-view]');
        var arrayViews = [];
        for (var i = 0, len = views.length ; i < len ; i++){
            arrayViews.push(views[i])
        }
        return arrayViews;
    }
    function getActiveRoutes(){
        var activeRoutes = document.querySelectorAll('[data-route]');
        var arrayActiveRoutes = [];
        for (var i = 0, len = activeRoutes.length ; i < len ; i++){
            arrayActiveRoutes.push(views[i])
        }
        return arrayActiveRoutes;
    }
    function paraEvento(e){
        goTo(e.target.getAttribute('data-route'))
    }
    function goTo(toRoute, opt){
        var opt = opt || {};
        opt.routes = opt.routes || [];
        opt.trace = typeof opt.trace === "undefined" ? true : opt.trace
        var route = toRoute;
        var routeInfo = opt.routes.filter(function(e){
            return e.path === route;
        })[0]
        if(routeInfo){
    
            if(opt.trace) {history.pushState({}, '', '#'+routeInfo.path)}
            
            arrayViews.forEach(function(e){
                if (e.getAttribute('data-route-view') === routeInfo.name){
                    //accion si existe la ruta
                    MostrarVista([e], arrayViews)
                }
            })
             
        }
    }
    function bindEvent(){
        activeRoutes.forEach(function(e){
            e.addEventListener('click', paraEvento, false);
        })
    }
    






    return {
        init: "",
        Router: Router,
        setRoutes: setRoutes,
        getRoutes: getRoutes,
        goTo: goTo
    }
})()




var myFirstRouter = new navigate.Router([
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

   navigate.goTo(extractRoute(window.location.hash), {trace: false})

}

window.onhashchange = function(){

    navigate.goTo(extractRoute(window.location.hash), {trace: false})

}



