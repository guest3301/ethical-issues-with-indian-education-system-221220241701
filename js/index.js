const cube = document.querySelector('.cube');

// Function to handle device orientation
function handleOrientation(event) {
    const beta = event.beta; // X-axis rotation [-180,180]
    const gamma = event.gamma; // Y-axis rotation [-90,90]

    // Reduce sensitivity to 45%
    const xRotation = (beta || 0) * 0.45;
    const yRotation = (gamma || 0) * 0.45;

    cube.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
}

// Reset cube orientation on shake
let shakeTimeout;
window.addEventListener('devicemotion', (event) => {
    const acceleration = event.accelerationIncludingGravity;
    const totalAcceleration = Math.abs(acceleration.x) + Math.abs(acceleration.y) + Math.abs(acceleration.z);

    if (totalAcceleration > 30) { // Adjust threshold for shake sensitivity
        clearTimeout(shakeTimeout);
        cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
        shakeTimeout = setTimeout(() => {}, 1000);
    }
});

// Fallback for mouse movement on desktop
function handleMouseMove(event) {
    const xRotation = (event.clientY / window.innerHeight - 0.5) * 45; // Rotate up to 22.5 degrees
    const yRotation = (event.clientX / window.innerWidth - 0.5) * 45; // Rotate up to 22.5 degrees

    cube.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
}

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', handleOrientation);
} else {
    window.addEventListener('mousemove', handleMouseMove);
}
