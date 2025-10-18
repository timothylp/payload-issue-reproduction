import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
    slug: "pages",
    labels: {
        singular: {
            fr: "Page",
            en: "Page",
        },
        plural: {
            fr: "Pages",
            en: "Pages",
        },
    },
    versions: {
        drafts: {
            autosave: true,
            schedulePublish: true,
        },
        maxPerDoc: 10
    },
    fields: [
        {
            name: "title",
            type: "text",
            required: true,
            localized: true,
        },
        {
            name: "layout",
            label: {
                fr: "Sections",
                en: "Sections",
            },
            labels: {
                singular: {
                    fr: "une section",
                    en: "section",
                },
                plural: {
                    fr: "des sections",
                    en: "sections",
                },
            },
            type: "blocks",
            blocks: [],
            blockReferences: ["block"]
        },
    ],
};