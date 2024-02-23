export const particleConfig = {
    autoPlay: true,
    fullScreen: {
        enable: true,
        zIndex: 0,
    },
    detectRetina: true,
    fpsLimit: 90,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push',
            },
            onHover: {
                enable: true,
                mode: 'grab',
                parallax: {
                    enable: true,
                    force: 60,
                    smooth: 10,
                },
            },
        },
        modes: {
            grab: {
                distance: 400,
                links: {
                    blink: false,
                    consent: false,
                    opacity: 0.5,
                },
            },
            push: {
                default: true,
                quantity: 2,
            },
        },
    },
    particles: {
        color: {
            value: '#c49d9d',
        },
        move: {
            angle: {
                offset: 0,
                value: 90,
            },
            center: {
                x: 50,
                y: 50,
                mode: 'percent',
                radius: 0,
            },
            direction: 'none',
            enable: true,
            outModes: {
                default: 'out',
                bottom: 'out',
                left: 'out',
                right: 'out',
                top: 'out',
            },
        },
        number: {
            density: {
                enable: true,
                width: 1920,
                height: 1080,
            },
            limit: {
                mode: 'delete',
                value: 0,
            },
            value: 100,
        },
        opacity: {
            value: {
                min: 0.1,
                max: 0.5,
            },
            animation: {
                count: 0,
                enable: true,
                speed: 3,
                mode: 'auto',
                startValue: 'random',
                destroy: 'none',
            },
        },
        reduceDuplicates: false,
        shape: {
            close: true,
            fill: true,
            type: 'circle',
        },
        size: {
            value: {
                min: 1,
                max: 10,
            },
            animation: {
                count: 0,
                enable: true,
                speed: 20,
                decay: 0,
                delay: 0,
                sync: false,
                mode: 'auto',
                startValue: 'random',
                destroy: 'none',
            },
        },
        zIndex: {
            value: 0,
            opacityRate: 1,
            sizeRate: 1,
            velocityRate: 1,
        },
        links: {
            blink: false,
            color: {
                value: '#c49d9d',
            },
            consent: false,
            distance: 300,
            enable: true,
            frequency: 1,
            opacity: 0.4,
            width: 1,
            warp: false,
        },
    },
};
