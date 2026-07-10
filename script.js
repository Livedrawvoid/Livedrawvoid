const ocBox = document.getElementById('oc-box');
const vidIntro = document.getElementById('vid-intro');
const vidLoop = document.getElementById('vid-loop');
const vidWave = document.getElementById('vid-wave');

if (ocBox && vidIntro && vidLoop && vidWave) {
    let hasPlayedIntro = false;
    let isHovering = false;
    let canWave = false;

    function switchVideo(targetVideo) {
        document.querySelectorAll('.oc-video').forEach(vid => vid.classList.remove('active'));
        targetVideo.classList.add('active');
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasPlayedIntro) {
                hasPlayedIntro = true;
                switchVideo(vidIntro);
                vidIntro.play();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(ocBox);

    vidIntro.onended = () => {
        switchVideo(vidLoop);
        vidLoop.currentTime = 0;
        vidLoop.play();
    };

    vidLoop.onended = () => {
        if (isHovering && canWave) {
            canWave = false;
            switchVideo(vidWave);
            vidWave.currentTime = 0;
            vidWave.play();
        } else {
            vidLoop.currentTime = 0;
            vidLoop.play();
        }
    };

    vidWave.onended = () => {
        switchVideo(vidLoop);
        vidLoop.currentTime = 0;
        vidLoop.play();
    };

    ocBox.addEventListener('mouseenter', () => {
        isHovering = true;
        canWave = true;
    });

    ocBox.addEventListener('mouseleave', () => {
        isHovering = false;
    });
}

const modal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const modalClose = document.querySelector('.modal-close');
const interactiveVideos = document.querySelectorAll('.card-sticker, .card-emoji, .gallery-item');

if (modal && modalVideo && interactiveVideos.length > 0) {
    interactiveVideos.forEach(video => {
        video.addEventListener('click', () => {
            const sourceElement = video.querySelector('source');
            if (sourceElement) {
                modalVideo.innerHTML = `<source src="${sourceElement.src}" type="video/webm">`;
                modalVideo.load();
                modal.classList.add('active');
                modalVideo.play();
            }
        });
    });

    const closeModal = () => {
        modal.classList.remove('active');
        setTimeout(() => {
            modalVideo.pause();
            modalVideo.innerHTML = '';
        }, 300); 
    };

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}