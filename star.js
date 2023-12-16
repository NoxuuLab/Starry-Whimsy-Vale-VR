AFRAME.registerComponent('shooting-stars', {
    init: function () {
        console.log('Shooting stars component initialized.');
        for (let i = 0; i < 10; i++) {
            // Random position within a range
            const posX = Math.random() * 20 - 10;
            const posY = Math.random() * 10 + 5;
            const posZ = Math.random() * 10 - 10;

            // Random rotation
            const rotY = Math.random() * 360;

            // Random scale
            const scale = Math.random() * 0.2 + 0.1;

            // Random duration
            const duration = Math.random() * 5000 + 2000; // Between 2 and 7 seconds

            // Create shooting star entity
            const shootingStar = document.createElement('a-entity');
            shootingStar.setAttribute('gltf-model', '#shootingStarModel');
            shootingStar.setAttribute('position', `${posX} ${posY} ${posZ}`);
            shootingStar.setAttribute('rotation', `0 ${rotY} 0`);
            shootingStar.setAttribute('scale', `${scale} ${scale} ${scale}`);
            shootingStar.setAttribute('class', 'shooting-star');

            // Animation
            const animation = document.createElement('a-animation');
            animation.setAttribute('attribute', 'position');
            animation.setAttribute('dur', duration.toString());
            animation.setAttribute('to', '0 -5 -10');
            animation.setAttribute('easing', 'linear');
            animation.setAttribute('repeat', 'indefinite');

            // Append animation to shooting star
            shootingStar.appendChild(animation);

            // Append shooting star to scene
            this.el.appendChild(shootingStar);
        }
    }
});
