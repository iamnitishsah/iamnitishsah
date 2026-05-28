import Hero from "../sections/Hero";
import { About } from "../sections/About";
import { Contact } from "../sections/Contact";
import { Experience } from "../sections/Experience";
import { Focus } from "../sections/Focus";
import { FeaturedProjects } from "../sections/Projects";
import { Skills } from "../sections/Skills";

export default function Home() {
    return (
        <main id="content" className="app-shell relative" tabIndex={-1}>
            <Hero />
            <Experience />
            <FeaturedProjects />
            <Focus />
            <Skills />
            <About />
            <Contact />
        </main>
    );
}
