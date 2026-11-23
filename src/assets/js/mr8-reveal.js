function initMr8Reveal() {
    const page = document.querySelector('.mr8-page, .medok-page, .premier-page, .west-nautical-page');

    if (!page || typeof window.IntersectionObserver !== 'function' || !window.matchMedia) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (motionPreference.matches) return;

    // Prepare only content below the viewport, before it can become visible.
    const pending = new Set(
        [...page.querySelectorAll('[data-mr8-reveal]')].filter(
            (element) => element.getBoundingClientRect().top >= window.innerHeight,
        ),
    );

    if (!pending.size) return;

    const stop = () => {
        observer.disconnect();
        pending.forEach((element) => element.removeAttribute('data-mr8-prepared'));
        pending.clear();

        if (motionPreference.removeEventListener) {
            motionPreference.removeEventListener('change', onMotionChange);
        }
    };

    const onMotionChange = (event) => {
        if (event.matches) stop();
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.setAttribute('data-mr8-revealed', '');
                observer.unobserve(entry.target);
                pending.delete(entry.target);
            });

            if (!pending.size) stop();
        },
        { threshold: 0, rootMargin: '0px 0px 96px 0px' },
    );

    pending.forEach((element) => {
        element.setAttribute('data-mr8-prepared', '');
        observer.observe(element);
    });

    if (motionPreference.addEventListener) {
        motionPreference.addEventListener('change', onMotionChange);
    }
}

initMr8Reveal();
