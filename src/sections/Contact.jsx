import { contact } from "../data/contact";
import {
    FaEnvelope,
    FaPhone,
    FaWhatsapp,
    FaLinkedin,
    FaGithub,
} from "react-icons/fa";

export default function Contact() {
    return (
        <section
            id="contact"
            className="py-28 px-6 bg-slate-950 text-white"
        >
            <div className="max-w-4xl mx-auto text-center">

                {/* TITLE */}
                <h2 className="text-3xl md:text-4xl font-bold">
                    Contact
                </h2>

                <p className="text-slate-400 mt-3">
                    Reach out for collaborations, internships, or engineering discussions.
                </p>

                {/* CONTACT GRID */}
                <div className="
          grid sm:grid-cols-2 md:grid-cols-3
          gap-6
          mt-16
        ">

                    {/* EMAIL */}
                    <a
                        href={`mailto:${contact.email}`}
                        className="contact-card"
                    >
                        <FaEnvelope size={22} />
                        <span>Email</span>
                    </a>

                    {/* PHONE */}
                    <a
                        href={`tel:${contact.phone}`}
                        className="contact-card"
                    >
                        <FaPhone size={22} />
                        <span>Call</span>
                    </a>

                    {/* WHATSAPP */}
                    <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        target="_blank"
                        className="contact-card"
                    >
                        <FaWhatsapp size={22} />
                        <span>WhatsApp</span>
                    </a>

                    {/* LINKEDIN */}
                    <a
                        href={contact.linkedin}
                        target="_blank"
                        className="contact-card"
                    >
                        <FaLinkedin size={22} />
                        <span>LinkedIn</span>
                    </a>

                    {/* GITHUB */}
                    <a
                        href={contact.github}
                        target="_blank"
                        className="contact-card"
                    >
                        <FaGithub size={22} />
                        <span>GitHub</span>
                    </a>

                </div>
            </div>
        </section>
    );
}
