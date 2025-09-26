import { block } from "@/blocks/block";
import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
    slug: "pages",
    labels: {
        singular: {
            fr: "page",
            en: "page",
        },
        plural: {
            fr: "pages",
            en: "pages",
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
            blocks: [
                block,
            ],
        },
    ],
};