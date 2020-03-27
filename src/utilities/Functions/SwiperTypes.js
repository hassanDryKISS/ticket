export const Anime3DLoopAutoPLay = {
    effect: 'coverflow',
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    rtl: true
}



export const NavigationLoop = {
    grabCursor: true,
    loop: true,
    spaceBetween: 20,
    centeredSlides: true,
    slidesPerView: 'auto',
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    rtl: true
}

export const NormalFadeAutoPlay = {
    grabCursor: true,autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    loop: true,
    effect: 'fade',
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    rtl: true
}

export const Normal = {
    grabCursor: true,
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    rtl: true
}

export const MutipleSlidesPerView = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop : true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        4000: {
            slidesPerView: 6,
            spaceBetween: 250
        },
        3200: {
            slidesPerView: 6,
            spaceBetween: 200
        },
        2700: {
            slidesPerView: 5,
            spaceBetween: 170
        },
        2400: {
            slidesPerView: 5,
            spaceBetween: 150
        },
        2000: {
            slidesPerView: 5,
            spaceBetween: 90
        },
        1900: {
            slidesPerView: 4,
            spaceBetween: 80
        },
        1700: {
            slidesPerView: 4,
            spaceBetween: 70
        },
        1500: {
            slidesPerView: 4,
            spaceBetween: 50
        },
        1400: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 30
        }
    },
    rtl: true
}

export const AutoPlayNoPaginnation = {
    loop: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    autoplay: {
        delay: 2500,
        disableOnInteraction: false
    },
    rtl: true
}