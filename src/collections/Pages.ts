import { block } from "@/blocks/block";
import { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
    slug: "pages",
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