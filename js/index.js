const cube = document.getElementById('cube');
let rotateX = 0;
let rotateY = 0;

// Check for accelerometer availability
if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", (event) => {
        if (event.accelerationIncludingGravity) {
            const { x, y } = event.accelerationIncludingGravity;

            rotateX += y * 2; // Adjust rotation sensitivity
            rotateY += x * 2;

            cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });

    // Reset cube when shaken
    window.addEventListener("devicemotion", (event) => {
        const shakeThreshold = 15; // Sensitivity for shake detection
        if (Math.abs(event.acceleration.x) > shakeThreshold ||
            Math.abs(event.acceleration.y) > shakeThreshold ||
            Math.abs(event.acceleration.z) > shakeThreshold) {
            rotateX = 0;
            rotateY = 0;
            cube.style.transform = `rotateX(0deg) rotateY(0deg)`;
        }
    });
} else {
    // Fallback for PCs: mouse hover to rotate
    let isHovering = false;

    cube.addEventListener("mousemove", (event) => {
        if (!isHovering) {
            const rect = cube.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            rotateY = (x / rect.width) * 180; // Adjust rotation
            rotateX = -(y / rect.height) * 180;

            cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });

    cube.addEventListener("mouseenter", () => {
        isHovering = true;
    });

    cube.addEventListener("mouseleave", () => {
        isHovering = false;
        cube.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
}