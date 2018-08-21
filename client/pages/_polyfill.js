if (typeof window !== 'undefined') {
    if (typeof window.Map === 'undefined') {
        require('core-js/es6/map');
    }
    if (typeof window.Set === 'undefined') {
        require('core-js/es6/set');
    }
}
