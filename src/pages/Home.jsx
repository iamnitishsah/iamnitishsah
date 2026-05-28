import Hero from "../sections/Hero";
import {
    AboutPreview,
    ContactPreview,
    ExperiencePreview,
    FeaturedProjectsPreview,
    FocusPreview,
    SecondaryProjectsPreview,
    SkillsPreview,
} from "../sections/HomePreviewSections";

export default function Home() {
    return (
        <main id="content" className="app-shell relative" tabIndex={-1}>
            <Hero />
            <ExperiencePreview />
            <FeaturedProjectsPreview />
            <FocusPreview />
            <SkillsPreview />
            <SecondaryProjectsPreview />
            <AboutPreview />
            <ContactPreview />
        </main>
    );
}
