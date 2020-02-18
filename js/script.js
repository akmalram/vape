const ready = (callback) => {
    window.addEventListener('DOMContentLoaded', (e) => {
        callback(e);
    })
}

const S = (selector) => {
    return document.querySelectorAll(selector);
}

const on = (event, elements, callback) => {
    if(typeof elements === 'string') {
        document.querySelectorAll(elements).forEach(one => {
            one.addEventListener(event, callback);
        })
    } else if(typeof elements == "object") {
        elements.forEach(one => {
            one.addEventListener(event, callback);
        });
    }
}

const addClass = (elements, myclass = '') => {
    if(typeof elements === 'string') {
        document.querySelectorAll(elements).forEach(one => one.classList.add(myclass));
    } else if(typeof elements == "object") {
        elements.forEach(one => one.classList.add(myclass));
    }
}


const removeClass = (elements, myclass = '') => {
    if(typeof elements === 'string') {
        document.querySelectorAll(elements).forEach(one => one.classList.remove(myclass));
    } else if(typeof elements == "object") {
        elements.forEach(one => one.classList.remove(myclass));
    }
}

const toggleClass = (elements, myclass = '') => {
    if(typeof elements === 'string') {
        document.querySelectorAll(elements).forEach(one => one.classList.toggle(myclass));
    } else if(typeof elements == "object") {
        elements.forEach(one => one.classList.toggle(myclass));
    }
}

const PTSansObserver = new FontFaceObserver('PT Sans');

Promise.all([
    PTSansObserver.load()
]).then(() => {
    document.querySelector('html').classList.add('fonts-loaded');
});

ready(() => {
    const MenuClassToggler = () => {
        const btn = document.querySelector('.navbar .toggle-btn');
        const menu = document.querySelector('.navbar .menu');

        btn.addEventListener('click', () => {
            menu.classList.toggle('active');
            btn.classList.toggle('active');
            document.querySelector('body').classList.toggle('overhidden');
        });
    }

    MenuClassToggler();
});

ready(() => {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if(scrollY > 50) navbar.classList.add('scrolled');
        else if (scrollY < 50) navbar.classList.remove('scrolled');
    });

    if(scrollY > 50) navbar.classList.add('scrolled');
    else if (scrollY < 50) navbar.classList.remove('scrolled');
});

// Init Header Swiper
ready(() => {
    let mySwiper = new Swiper('.swiper-container.header', {
        autoplay: {
            delay: 5000
        },
        loop: true,
        speed: 1000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    let partners = new Swiper('.swiper-container.partners-slider', {
        autoplay: {
            delay: 2000
        },
        loop: true,
        slidesPerView: 3,
        breakpoints: {
            768: {
              slidesPerView: 2,
            },
            520: {
              slidesPerView: 1,
            }
          }
    });
});

ready(() => {
    let offset = 1;
    setInterval(() => {
        offset--;
        document.querySelector('#swiper-slider-style').innerHTML = `header .swiper-wrapper::before {
            background-position-x: ${offset}px;
        }`
    } ,30);
});

ready(() => {
    const parallaxDown = (el) => {
        const element = document.querySelector(el);
        let top = element.getBoundingClientRect().top + pageYOffset;

        window.addEventListener('scroll', () => {
            if(scrollY + window.innerHeight > top) {
                if(scrollY / 6 < 200) {
                    element.style.cssText = `transform: translateY(${scrollY / 6}px);`;
                }
            }
        });
    }

    parallaxDown('.page-title');
    parallaxDown('.page-desc');
});

ready(() => {
    const parallax = (el, reverse = false) => {
        let lFollowX = 0,
            lFollowY = 0,
            x = 0,
            y = 0,
            friction = 1 / 15;

        function moveBackground() {
            if(reverse) {
                x -= (lFollowX + x) * friction;
                y -= (lFollowY + y) * friction;
            } else {
                x += (lFollowX - x) * friction;
                y += (lFollowY - y) * friction;
            }

            translate = 'translate(' + x.toFixed(3) + 'px, ' + y.toFixed(3) + 'px)';


            $(el).css({
                '-webit-transform': translate,
                '-moz-transform': translate,
                'transform': translate
            });

            window.requestAnimationFrame(moveBackground);
        }

        $(window).on('mousemove click', function (e) {

            let lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
            let lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
            lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY = (10 * lMouseY) / 100;

        });

        moveBackground();
    }

    parallax('.about .block .photo img');
});


ready(() => {
    const modalToggler = (modalClass) => {
        let modal = S(modalClass),
            yesBtn = S(`${modalClass} .yes-btn`),
            noBtn = S(`${modalClass} .no-btn`);

        if(localStorage.getItem('olderThan18') === "false" || localStorage.getItem('olderThan18') == null || localStorage.getItem('olderThan18') == false) {
            addClass(modalClass, 'active');
        } else if("true") {
            removeClass(modalClass, 'active');
        }

        on('click', yesBtn, () => {
            localStorage.setItem('olderThan18', true);
            removeClass(modalClass, 'active');
        });

        on('click', noBtn, () => {
            localStorage.setItem('olderThan18', false);
            location.replace('https://google.com/');
        });
    }

    modalToggler('.modal.ageCheck');
});