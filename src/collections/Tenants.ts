import { CollectionConfig } from "payload"

export const Tenants: CollectionConfig = 
    {
      slug: 'tenants',
      admin: {
        useAsTitle: 'title',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
      ],
    }