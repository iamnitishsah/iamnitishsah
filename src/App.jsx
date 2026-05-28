import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollProgress from "./components/layout/ScrollProgress";
import useSiteMetadata from "./hooks/useSiteMetadata";
import AppRoutes from "./routes";

export default function App() {
    useSiteMetadata();

    return (
        <>
            <a
                href="#content"
                className="sr-only focus:not-sr-only fixed left-4 top-4 z-[70] rounded-[var(--radius-md)] border border-[var(--accent-border)] bg-[var(--bg-raised)] px-4 py-2 text-sm font-medium text-[var(--text-primary)]"
            >
                Skip to content
            </a>
            <ScrollProgress />
            <Navbar />
            <AppRoutes />
            <Footer />
        </>
    );
}
