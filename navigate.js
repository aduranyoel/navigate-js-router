var navigate = (function ($w) {
    'use strict';

    var routes = new Object;
    routes.routes = [];
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
        var arrayViews = [];
        for (var i = 0, len = views.length; i < len; i++) {
            arrayViews.push(views[i]);
        }
        return arrayViews;
    }
    function getActiveRoutes() {
        var activeRoutes = document.querySelectorAll('[data-route]');
        var arrayActiveRoutes = [];
        for (var i = 0, len = activeRoutes.length; i < len; i++) {
            arrayActiveRoutes.push(activeRoutes[i]);
        }
        return arrayActiveRoutes;
    }
    function goTo(url, opt){
        goToRoute(url, opt);
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
    function putNavigate(e) {
        goToRoute(extractRoute($w.location.hash), { trace: false });
    }
    function addOnLoad() {
        $w.removeEventListener('load', putNavigate, false);
        $w.addEventListener('load', putNavigate, false);
    }
    function addOnHashchange() {
        $w.removeEventListener('hashchange', putNavigate, false);
        $w.addEventListener('hashchange', putNavigate, false);
    }
    function begin() {
        if ($w.location.hash === '') $w.location.hash = '#/';
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
            mostrar.forEach(function (e) {
                e.style.display = 'block';
            });
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
    function goToRoute(toRoute, opt) {
        var routeInfo = false;
        if (getRoutes().routes.length > 0) {
            routeInfo = getRoutes().routes.filter(function (e) {
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
            if (settings.trace) { history.pushState({}, '', '#' + routeInfo.path);}
            if (settings.show) {
                getViews().forEach(function (e, i, all) {
                    if (e.getAttribute('data-route-view') === routeInfo.view) {
                        mostrarVista([e], all);
                    }
                });
            }
            settings.after();
        }
    }

    return {
        init: function () {
            addOnLoad();
            addOnHashchange();
            hideViews();
            begin();
            bindEvent();
        },
        goTo: goTo,
        begin: begin,
        getViews: getViews,
        setRoutes: setRoutes,
        getRoutes: getRoutes,
        bindEvent: bindEvent,
        hideViews: hideViews,
        addOnLoad: addOnLoad,
        extractRoute: extractRoute,
        addOnHashchange: addOnHashchange,
        getActiveRoutes: getActiveRoutes
    };
})(window)