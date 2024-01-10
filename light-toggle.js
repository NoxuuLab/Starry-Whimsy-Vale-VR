AFRAME.registerComponent('light-toggle', {
    init: function () {
        // Do something when component first attached.
        let el = this.el;
        this.lightToggle = function () {
            el.setAttribute('color', 'red');
        };
        this.el.addEventListener('click', this.lightToggle);
    },

    remove: function () {
        // Do something the component or its entity is detached.
        this.el.removeEventListener('click', this.lightToggle);
    },
});
