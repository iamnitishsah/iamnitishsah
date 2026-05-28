import { useEffect, useState } from "react";

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const documentElement = document.documentElement;
            const scrollRange = documentElement.scrollHeight - window.innerHeight;

            if (scrollRange <= 0) {
                setProgress(0);
                return;
            }

            setProgress(Math.min(1, window.scrollY / scrollRange));
        };

        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px"
        >
            <div
                className="h-full bg-[linear-gradient(90deg,var(--accent),var(--accent-strong))] transition-[width] duration-150 ease-[var(--ease-standard)]"
                style={{ width: `${progress * 100}%` }}
            />
        </div>
    );
}
