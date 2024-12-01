document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("reptiline-canvas");
    const ctx = canvas.getContext("2d");

    // Resizing the canvas
    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Reptiline properties
    const chains = [];
    const chainCount = 10;  
    const segmentCount = 50; 
    const segmentLength = 10;

    // Generate multiple chains of segments
    for (let j = 0; j < chainCount; j++) {
        const segments = [];
        for (let i = 0; i < segmentCount; i++) {
            segments.push({ x: canvas.width / 2, y: canvas.height / 2 });
        }
        chains.push(segments);
    }

    // Draw a chain
    function drawReptiline(segments, color) {
        ctx.beginPath();
        ctx.moveTo(segments[0].x, segments[0].y);
        for (let i = 1; i < segments.length; i++) {
            const { x, y } = segments[i];
            ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw segments as circles at each turning points
        for (let i = 0; i < segments.length; i++) {
            ctx.beginPath();
            ctx.arc(segments[i].x, segments[i].y, 4, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }

    // Function to move chains by mouse position
    function followMouse(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Move each chain head to mouse position
        chains.forEach(chain => {
            const dx = mouseX - chain[0].x;
            const dy = mouseY - chain[0].y;
            const angle = Math.atan2(dy, dx);

            // Move head of chain
            chain[0].x += Math.cos(angle) * segmentLength;
            chain[0].y += Math.sin(angle) * segmentLength;

            // Move other parts of the chain
            for (let i = 1; i < chain.length; i++) {
                const prev = chain[i - 1];
                const curr = chain[i];

                const dx = prev.x - curr.x;
                const dy = prev.y - curr.y;
                const angle = Math.atan2(dy, dx);

                curr.x = prev.x - Math.cos(angle) * segmentLength;
                curr.y = prev.y - Math.sin(angle) * segmentLength;
            }
        });
    }

    // Animate all chains
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clearing canvas before drawing it
        chains.forEach((chain, index) => {
            const greenColor = 'hsl(120, 100%, 50%)';
            drawReptiline(chain, greenColor);
        });
        requestAnimationFrame(animate);
    }

    // Start animation
    canvas.addEventListener("mousemove", followMouse);
    animate();
});
