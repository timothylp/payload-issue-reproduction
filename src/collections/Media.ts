import { getTenantFromCookie } from '@payloadcms/plugin-multi-tenant/utilities';
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if (!(req.file && req.data && (operation === "create" || operation === "update"))) return;
        const tenantId = req.data.tenant || getTenantFromCookie(req.headers, "number");
        if (tenantId) {
          req.data.prefix = tenantId.toString();
        }
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  upload: true,
}
