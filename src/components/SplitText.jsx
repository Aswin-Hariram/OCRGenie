import { useSprings, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';

const SplitText = ({
    text = '',
    className = '',
    delay = 100,
    animationFrom = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    animationTo = { opacity: 1, transform: 'translate3d(0,0,0)' },
    easing = 'easeOutCubic',
    threshold = 0.1,
    rootMargin = '-100px',
    onLetterAnimationComplete,
    styles = {}, // Accepting styles as an object for flexibility
}) => {
    const letters = text.split('');
    const [inView, setInView] = useState(false);
    const ref = useRef();
    const animatedCount = useRef(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold, rootMargin }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (observer) observer.disconnect();
        };
    }, [threshold, rootMargin]);

    const springs = useSprings(
        letters.length,
        letters.map((_, i) => ({
            from: animationFrom,
            to: inView
                ? async (next) => {
                    await next(animationTo);
                    animatedCount.current += 1;
                    if (
                        animatedCount.current === letters.length &&
                        onLetterAnimationComplete
                    ) {
                        onLetterAnimationComplete();
                    }
                }
                : animationFrom,
            delay: i * delay,
            config: { easing },
        }))
    );

    return (
        <p
            ref={ref}
            className={`split-parent ${className}`}
            style={{
                display: 'inline-block',
                overflow: 'hidden',
            }}
        >
            {springs.map((props, index) => (
                <animated.span
                    key={index}
                    style={{
                        ...props,
                        ...styles, // Merging provided styles with animation props
                        display: 'inline-block',
                        willChange: 'transform, opacity',
                        fontSize:'50px',
                        fontFamily:'arial',
                        fontWeight:'800'
                    }}
                >
                    {letters[index] === ' ' ? '\u00A0' : letters[index]}
                </animated.span>
            ))}
        </p>
    );
};

export default SplitText;
