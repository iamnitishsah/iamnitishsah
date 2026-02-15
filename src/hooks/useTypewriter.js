import { useEffect, useState, useRef } from "react";

export default function useTypewriter(words = [], speed = 80, pause = 1400) {
    const [text, setText] = useState("");
    const wordIndex = useRef(0);
    const charIndex = useRef(0);
    const typing = useRef(true);

    useEffect(() => {
        if (!words.length) return;

        const tick = () => {
            const current = words[wordIndex.current];

            if (typing.current) {
                charIndex.current++;
                setText(current.slice(0, charIndex.current));

                if (charIndex.current === current.length) {
                    typing.current = false;
                    setTimeout(tick, pause);
                    return;
                }
            } else {
                charIndex.current--;
                setText(current.slice(0, charIndex.current));

                if (charIndex.current === 0) {
                    typing.current = true;
                    wordIndex.current = (wordIndex.current + 1) % words.length;
                }
            }

            setTimeout(tick, typing.current ? speed : speed / 2);
        };

        const timer = setTimeout(tick, 300);
        return () => clearTimeout(timer);
    }, [words, speed, pause]);

    return text;
}
