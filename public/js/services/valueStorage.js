;(function(services) {
    function setItem(name, value) {
        if (value) {
            localStorage.setItem(name, value);
        }
        else {
            localStorage.removeItem(name);
        }
    }

    function getItem(name) {
        return localStorage.getItem(name) || null;
    }

    services.valueStorage = {getItem, setItem};
}(window.services = window.services || {}));