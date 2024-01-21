document.addEventListener('DOMContentLoaded', function () {
    // Get A-Frame scene and particle system
    const scene = document.querySelector('a-scene');
    const particleSystem = document.getElementById('soundVisualization');

    // Set up Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    // Create an audio element and connect it to the analyser
    const audioElement = new Audio();
    const audioSource = audioContext.createMediaElementSource(audioElement);
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);

    // Set up the particle system
    const particles = [];
    const particleCount = 100;
    const particleContainer = document.createElement('a-entity');
    particleContainer.setAttribute('position', '0 0 -5');
    scene.appendChild(particleContainer);

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('a-sphere');
        particle.setAttribute('radius', '0.1');
        particle.setAttribute('color', '#00ff00');
        particleContainer.appendChild(particle);
        particles.push(particle);
    }

    // Add a button to start the audio and update particles on click
    const startButton = document.createElement('button');
    startButton.textContent = 'Start Audio';
    document.body.appendChild(startButton);

    startButton.addEventListener('click', () => {
        // Load and play the audio file after the button is clicked
        audioElement.src = 'assets/ghost_shell.mp3';
        audioElement.crossOrigin = 'anonymous';
        audioElement.play();

        // Update particle positions based on audio data
        function updateParticles() {
            analyser.getByteFrequencyData(dataArray);

            particles.forEach((particle, i) => {
                const scale = dataArray[i % bufferLength] / 100;
                particle.setAttribute('scale', `${scale} ${scale} ${scale}`);
            });

            requestAnimationFrame(updateParticles);
        }

        updateParticles();
    });
});
