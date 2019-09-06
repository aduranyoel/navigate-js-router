(function ($w) {
    'use strict';
    var navigate = (function (){
        var routes = new Object;
        routes.routes = new Array;
        var lastRoute;
        function setRoutes(arrObj) {
            routes.routes = arrObj;
        }
        function getRoutes(path) {
            var result = [];
            routes.routes.forEach(function(e, i){
                var newObj = new Object;
                Object.keys(e).forEach(function(k){
                    if (k === 'key'){
                        newObj[k] = 'private';
                    }else{
                        newObj[k] = e[k]
                    }
                })
                result.push(newObj)
            })
            if (typeof path !== "undefined") {
                return {
                    routes: result.filter(function (e) {
                        return e.path === path;
                    })
                };
            }
            return {
                routes: result
            }
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
        function goto(path, options) {
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
        function putNavigateOnhashchange() {
            goToRoute(extractRoute($w.location.hash), { trace: false });
        }
        function addOnLoad() {
            $w.removeEventListener('load', putNavigateOnLoad, false);
            $w.addEventListener('load', putNavigateOnLoad, false);
        }
        function addOnhashchange() {
            $w.removeEventListener('hashchange', putNavigateOnhashchange, false);
            $w.addEventListener('hashchange', putNavigateOnhashchange, false);
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
            for (var i = 1, len = arguments.length; i < len; i++)
                for (var key in arguments[i])
                    if (arguments[i].hasOwnProperty(key))
                        arguments[0][key] = arguments[i][key];
            return arguments[0];
        }
        function updateRoute(path, newOpt) {
            var current = routes.routes.filter(function (e) {
                return e.path === path;
            });
            if (current.length > 0) {
                current[0] = extendObj(current[0], newOpt);
                routes.routes.splice(routes.routes.findIndex(function (e) {
                    return e.path === path;
                }), 1, current[0]);
            }
        }
        function addRoute(newPath, opt) {
            var newRoute = {
                path: newPath
            };
            newRoute = extendObj(newRoute, opt);
            routes.routes.push(newRoute);
        }
        function delRoute(path) {
            if (typeof path !== "undefined") {
                var indexDel = routes.routes.findIndex(function (e) {
                    return e.path === path;
                });
                if (indexDel !== -1) routes.routes.splice(indexDel, 1);
            }
        }
        function getParams(variable) {
            if (window.location.href.lastIndexOf('?') !== -1){
                var queryAll = window.location.href.split('?');
                var query = queryAll[queryAll.length-1]
                var vars = query.split("&");
                if (variable === undefined){
                    var obj = new Object;
                    vars.forEach(function(e,i){
                        var pair = vars[i].split("=");
                        obj[pair[0]]=pair[1]
                    })
                    return obj;
                }else{
                    for (var i=0, len=vars.length; i<len; i++) {
                        var pair = vars[i].split("=");
                        if (pair[0] == variable){return pair[1];}
                    }
                }
            }
            return(false);
        }
        function goToRoute(toRoute, opt) {
            toRoute = typeof toRoute === "string" ? toRoute : '';
            var siParams = toRoute.indexOf('?') !== -1;
            var params = false;
            siParams ? params = toRoute.split('?')[1] : params = false;
            siParams ? toRoute = toRoute.split('?')[0] : toRoute = toRoute;
            function putParams(){
                if (params){
                    return '?'+params;
                }
                return '';
            }
            var routeInfo = false;
            if (routes.routes.length > 0) {
                routeInfo = routes.routes.filter(function (e) {
                    return e.path === toRoute;
                })[0];
                if (typeof routeInfo === "undefined") routeInfo = false;
            }
            if (routeInfo) {
                var defaults = {
                    key: "",
                    show: true,
                    trace: true,
                    allow: true,
                    update: false,
                    before: new Function,
                    after: new Function
                };
                opt = opt || new Object;
                var settings = extendObj({}, defaults, routeInfo, opt);
                function goStart(){
                    if (typeof settings.before === "function") settings.before(getParams());
                    if (settings.trace === true) $w.history.pushState({ page: "navigatePage" }, '', '#' + routeInfo.path + putParams());
                    if (settings.show === true) {
                        var allViews = getViews();
                        if (typeof settings.view === "string") {
                            allViews.forEach(function (e, i, all) {
                                if (e.getAttribute('data-route-view') === settings.view) {
                                    mostrarVista([e], all);
                                }
                            });
                        }
                        if (Array.isArray(settings.view)) {
                            var viewTargets = [];
                            settings.view.forEach(function (e) {
                                viewTargets.push(allViews.filter(function (f) {
                                    return f.getAttribute('data-route-view') === e;
                                })[0]);
                            });
                            mostrarVista(viewTargets, allViews);
                        }
                    }
                    if (typeof settings.after === "function") settings.after(getParams());
                    if (settings.update === true) updateRoute(toRoute, opt);
                    lastRoute = toRoute;
                }
                if (lastRoute !== toRoute){
                    if (settings.allow === true){
                        goStart();
                    }else if (settings.allow === false){
                        routeInfo.key = routeInfo.key || null;
                        if(opt.key === routeInfo.key){
                            goStart();
                        }else{
                            $w.alert('The Route "' + toRoute + '" is not allowed.');
                        }
                    }
                }
            }
        }
    
        return {
            init: function (defaultPath) {
                function goDefault(path) {
                    if (typeof path !== "undefined") {
                        $w.location.hash = '#' + path;
                    }
                }
                hideViews();
                goDefault(defaultPath);
                addOnLoad();
                addOnhashchange();
                bindEvent();
            },
            goto: goto,
            addRoute: addRoute,
            getViews: getViews,
            delRoute: delRoute,
            setRoutes: setRoutes,
            getParams: getParams,
            getRoutes: getRoutes,
            bindEvent: bindEvent,
            hideViews: hideViews,
            addOnLoad: addOnLoad,
            updateRoute: updateRoute,
            addOnhashchange: addOnhashchange,
            getActiveRoutes: getActiveRoutes
        };
    })()

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = navigate;
        }
        exports.navigate = navigate;
    } else {
        $w.navigate = $w.$nav = navigate;
    }
})(this)