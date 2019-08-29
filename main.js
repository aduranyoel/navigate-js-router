
var Router = function(name, routes){
    return {
        name: name,
        routes: routes
    }
}

var myFirstRouter = new Router('myFirstRouter', [
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
function extractRoute(route){
    return route.slice(route.indexOf('#')+1)
}
//var currentPath = extractRoute(window.location.hash);

var views = document.querySelectorAll('[data-route-view]')
var activeRoutes = document.querySelectorAll('[data-route]')
var arrayViews = [];
for (var i = 0, len = views.length ; i < len ; i++){
    arrayViews.push(views[i])
}
function pararaEvento(e){
    navigate(e.target.getAttribute('data-route'))
}
function navigate(toRoute, opt){
    var opt = opt || {};
    opt.trace = typeof opt.trace === "undefined" ? true : opt.trace
    var route = toRoute;
    var routeInfo = myFirstRouter.routes.filter(function(e){
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
    console.log("route",route, routeInfo, opt.trace)

}

window.onload = function(){


 
    //events
    activeRoutes.forEach(function(e){
        e.addEventListener('click', pararaEvento, false);
    })

 


    navigate(extractRoute(window.location.hash), {trace: false})
    console.log("onLoad")
    

}

window.onhashchange = function(){
    navigate(extractRoute(window.location.hash), {trace: false})
}