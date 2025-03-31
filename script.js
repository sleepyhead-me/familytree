document.addEventListener('DOMContentLoaded', function () {
    const members = document.querySelectorAll('.member');
    const modal = document.getElementById('modal');
    const modalPhoto = modal.querySelector('.modal-photo');
    const modalName = modal.querySelector('.modal-name');
    const modalBio = modal.querySelector('.modal-bio');
    const closeModal = modal.querySelector('.close');

    // Reveal Animation
    members.forEach((member, index) => {
        setTimeout(() => {
            member.style.opacity = 1;
        }, index * 500);
    });

    // Interactivity
    members.forEach(member => {
        member.addEventListener('click', function () {
            const name = this.getAttribute('data-name');
            const bio = this.getAttribute('data-bio');
            const photo = this.getAttribute('data-photo');

            modalPhoto.src = photo;
            modalName.textContent = name;
            modalBio.textContent = bio;

            modal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});