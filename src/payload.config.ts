import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { s3Storage } from '@payloadcms/storage-s3'
import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
import { Config } from './payload-types'
import { Tenants } from './collections/Tenants'
import { en } from "payload/i18n/en";
import { fr } from "payload/i18n/fr";
import { block } from './blocks/block'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const DEFAULT_ADMIN_EMAIL = process.env.DEFAULT_ADMIN_EMAIL || "admin@example.com"
const DEFAULT_ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || "password"

export default buildConfig({
	admin: {
		autoLogin: process.env.NODE_ENV === "development" && {
			email: DEFAULT_ADMIN_EMAIL,
			password: DEFAULT_ADMIN_PASSWORD,
			prefillOnly: true,
		},
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media, Pages, Tenants],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || '',
	typescript: {
		outputFile: path.resolve(dirname, 'payload-types.ts'),
	},
	upload: {
		abortOnLimit: true,
		limits: {
			fileSize: 1024 * 1024 * 10, // 10MB
		},
	},
	blocks: [
		block,
	],
	localization: {
		locales: [
			{
				code: "en",
				label: "English",
			},
			{
				code: "fr",
				label: "Français",
			},
		],
		defaultLocale: "en",
		fallback: false,
	},
		i18n: {
		supportedLanguages: { en, fr },
		fallbackLanguage: "fr",
	},
	db: sqliteAdapter({
		client: {
			url: process.env.DATABASE_URI || '',
		},
	}),
	async onInit(payload) {
		const { totalDocs } = await payload.count({
			collection: "users",
			depth: 0,
		});

		if (totalDocs === 0) {
			await payload.create({
				collection: "users",
				data: {
					email: DEFAULT_ADMIN_EMAIL,
					password: DEFAULT_ADMIN_PASSWORD,
				},
			});
		}
	},
	sharp,
	plugins: [
		s3Storage({
			collections: {
				media: true,
			},
			bucket: process.env.S3_BUCKET || "",
			clientUploads: true,
			config: {
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
				},
				region: process.env.S3_REGION || "",
				endpoint: process.env.S3_ENDPOINT || "",
			},
		}),
		multiTenantPlugin<Config>({
			collections: {
				pages: {},
			},
			userHasAccessToAllTenants: () => true,
		})
	],
})
