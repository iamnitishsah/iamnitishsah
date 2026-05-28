import { useEffect } from "react";
import { siteMetadata } from "../utils/siteMetadata";

function upsertMeta(attribute, key, content) {
    if (!content) {
        return;
    }

    const selector = `meta[${attribute}="${key}"]`;
    let element = document.head.querySelector(selector);

    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }

    element.setAttribute("content", content);
}

function upsertLink(rel, href) {
    if (!href) {
        return;
    }

    let element = document.head.querySelector(`link[rel="${rel}"]`);

    if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
    }

    element.setAttribute("href", href);
}

export default function useSiteMetadata() {
    useEffect(() => {
        const baseUrl = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:5173";
        const canonicalUrl = `${baseUrl}${siteMetadata.canonicalPath}`;
        const previewImageUrl = `${baseUrl}${siteMetadata.previewImage}`;

        document.title = siteMetadata.title;
        document.documentElement.lang = "en";

        upsertMeta("name", "description", siteMetadata.description);
        upsertMeta("name", "keywords", siteMetadata.keywords.join(", "));
        upsertMeta("name", "theme-color", "#0A0A0B");
        upsertMeta("property", "og:type", "website");
        upsertMeta("property", "og:site_name", siteMetadata.siteName);
        upsertMeta("property", "og:title", siteMetadata.title);
        upsertMeta("property", "og:description", siteMetadata.description);
        upsertMeta("property", "og:url", canonicalUrl);
        upsertMeta("property", "og:image", previewImageUrl);
        upsertMeta("property", "og:image:alt", siteMetadata.previewImageAlt);
        upsertMeta("name", "twitter:card", siteMetadata.twitterCard);
        upsertMeta("name", "twitter:title", siteMetadata.title);
        upsertMeta("name", "twitter:description", siteMetadata.description);
        upsertMeta("name", "twitter:image", previewImageUrl);
        upsertLink("canonical", canonicalUrl);
        upsertLink("icon", siteMetadata.previewImage);
    }, []);
}
