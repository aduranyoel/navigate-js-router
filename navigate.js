var navigate = (function ($w) {
    'use strict';

    var routes = new Object;
    routes.routes = new Array;
    function setRoutes(arrObj) {
        routes.routes = arrObj;
    }
    function getRoutes() {
        return routes;
    }
    function extractRoute(routeparam) {
        return routeparam.slice(routeparam.indexOf('#') + 1);
    }
    function getViews() {
        var views = document.querySelectorAll('[data-route-view]');
        var arrayViews = new Array;
        for (var i = 0, len = views.length; i < len; i++) {
            arrayViews.push(views[i]);
        }
        return arrayViews;
    }
    function getActiveRoutes() {
        var activeRoutes = document.querySelectorAll('[data-route]');
        var arrayActiveRoutes = new Array;
        for (var i = 0, len = activeRoutes.length; i < len; i++) {
            arrayActiveRoutes.push(activeRoutes[i]);
        }
        return arrayActiveRoutes;
    }
    function goTo(path, options){
        goToRoute(path, options);
    }
    function paraEvento(e) {
        goToRoute(e.target.getAttribute('data-route'));
    }
    function bindEvent() {
        getActiveRoutes().forEach(function (e) {
            e.removeEventListener('click', paraEvento, false);
            e.addEventListener('click', paraEvento, false);
        });
    }
    function putNavigateOnLoad() {
        goToRoute(extractRoute($w.location.hash));
    }
    function putNavigateOnPopState(e) {
        if(JSON.stringify(e.state) === '{"page":"navigatePage"}'){
            goToRoute(extractRoute($w.location.hash), { trace: false });
        }
    }
    function addOnLoad() {
        $w.removeEventListener('load', putNavigateOnLoad, false);
        $w.addEventListener('load', putNavigateOnLoad, false);
    }
    function addOnPopState() {
        $w.removeEventListener('popstate', putNavigateOnPopState, false);
        $w.addEventListener('popstate', putNavigateOnPopState, false);
    }
    function hideViews() {
        getViews().forEach(function (e) {
            e.style.display = 'none';
        });
    }
    function mostrarVista(mostrar, ocultar) {
        function hide(fn) {
            ocultar.forEach(function (e) {
                e.style.display = 'none';
            });
            fn();
        }
        function show() {
            mostrar.style.display = 'block';
        }
        hide(show);
    }
    function extendObj() {
        for (var i = 1; i < arguments.length; i++)
            for (var key in arguments[i])
                if (arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }
    function updateRoute(pathRoute, newsOpt){
        var current = routes.routes.filter(function(e){
            return e.path === pathRoute;
        });
        if(current.length > 0){
            current[0] = extendObj(current[0], newsOpt);
            routes.routes.splice(routes.routes.findIndex(function(e){
                return e.path === pathRoute;
            }),1)
            routes.routes.push(current[0]);
        }
    }
    function addRoute(newPath, opt){
        var newRoute = {
            path: newPath
        }
        newRoute = extendObj(newRoute, opt);
        routes.routes.push(newRoute);
    }
    function goToRoute(toRoute, opt) {
        var routeInfo = false;
        if (routes.routes.length > 0) {
            routeInfo = routes.routes.filter(function (e) {
                return e.path === toRoute;
            })[0];
            if (typeof routeInfo === "undefined") routeInfo = false;
        }
        var defaults = {
            trace: true,
            show: true,
            before: new Function,
            after: new Function
        };
        opt = opt || new Object;
        var settings = extendObj({}, defaults, routeInfo, opt);
        if (routeInfo) {
            settings.before();
            if (settings.trace) { history.pushState({page: "navigatePage"}, '', '#' + routeInfo.path);}
            if (settings.show) {
                getViews().forEach(function (e, i, all) {
                    if (e.getAttribute('data-route-view') === routeInfo.view) {
                        mostrarVista(e, all);
                    }
                });
            }
            settings.after();
        }
    }

    return {
        init: function (defaultPath) {
            function goDefault(path){
                if(typeof path !== "undefined"){
                    $w.location.hash = '#' + path;
                }
            }
            hideViews();
            goDefault(defaultPath);
            addOnLoad();
            addOnPopState();
            bindEvent();
        },
        goTo: goTo,
        addRoute: addRoute,
        getViews: getViews,
        setRoutes: setRoutes,
        getRoutes: getRoutes,
        bindEvent: bindEvent,
        hideViews: hideViews,
        addOnLoad: addOnLoad,
        updateRoute: updateRoute,
        extractRoute: extractRoute,
        addOnPopState: addOnPopState,
        getActiveRoutes: getActiveRoutes
    };
})(window)