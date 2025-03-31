// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Sound effect (assuming click.mp3 is hosted in the repository)
    const clickSound = new Audio('click.mp3'); // Replace with actual URL if hosted elsewhere

    // Fade-in animation for family members
    const members = document.querySelectorAll('.member');
    members.forEach((member, index) => {
        setTimeout(() => {
            member.style.opacity = '1';
            member.style.transition = 'opacity 0.5s ease-in';
        }, index * 500); // 500ms delay between each member
    });

    // Modal functionality
    const modal = document.getElementById('familyModal');
    const modalPhoto = document.querySelector('.modal-photo');
    const modalName = document.querySelector('.modal-name');
    const modalBio = document.querySelector('.modal-bio');
    const closeBtn = document.querySelector('.close');

    members.forEach(member => {
        member.addEventListener('click', () => {
            clickSound.play(); // Play sound on click
            modalPhoto.src = member.dataset.photo;
            modalName.textContent = member.dataset.name;
            modalBio.textContent = member.dataset.bio;
            modal.style.display = 'flex';
        });
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Dynamic Connections with Canvas
    const canvas = document.getElementById('connectionCanvas');
    const ctx = canvas.getContext('2d');
    const treeContainer = document.querySelector('.tree-container');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = treeContainer.offsetWidth;
        canvas.height = treeContainer.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw connections
    function drawConnections() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous drawings

        const generations = document.querySelectorAll('.generation');
        generations.forEach((gen, genIndex) => {
            const members = gen.querySelectorAll('.member');
            members.forEach((member, memberIndex) => {
                const rect = member.getBoundingClientRect();
                const treeRect = treeContainer.getBoundingClientRect();
                const x = rect.left + rect.width / 2 - treeRect.left;
                const y = rect.top + rect.height / 2 - treeRect.top;

                // Connect to parent generation
                if (genIndex > 0) {
                    const parentGen = generations[genIndex - 1];
                    const parentMembers = parentGen.querySelectorAll('.member');
                    const parentIndex = Math.floor(memberIndex / 2); // Approximate parent
                    if (parentMembers[parentIndex]) {
                        const parentRect = parentMembers[parentIndex].getBoundingClientRect();
                        const parentX = parentRect.left + parentRect.width / 2 - treeRect.left;
                        const parentY = parentRect.top + parentRect.height / 2 - treeRect.top;

                        ctx.beginPath();
                        ctx.moveTo(x, y);
                        ctx.lineTo(parentX, parentY);
                        ctx.strokeStyle = '#00eaff'; // Cyan vertical lines
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                }

                // Connect to siblings
                if (memberIndex > 0) {
                    const prevMember = members[memberIndex - 1];
                    const prevRect = prevMember.getBoundingClientRect();
                    const prevX = prevRect.left + prevRect.width / 2 - treeRect.left;
                    const prevY = prevRect.top + prevRect.height / 2 - treeRect.top;

                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(prevX, prevY);
                    ctx.strokeStyle = '#ff00ff'; // Pink horizontal lines
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            });
        });
    }

    // Draw connections after fade-in animation completes
    setTimeout(drawConnections, members.length * 500);
    window.addEventListener('resize', drawConnections); // Redraw on resize
});
