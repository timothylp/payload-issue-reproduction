import type { Block } from "payload";

export const block: Block = {
	slug: "block",
	labels: {
		singular: "block",
		plural: "blocks"
	},
	fields: [
		{
			type: "tabs",
			tabs: [
				{
					label: "Content",
					fields: [
						{
							type: "row",
							fields: [
								{
									name: "title",
									type: "text",
								},
								{
									name: "subtitle",
									type: "text",
								},
							],
						},
						{
							name: "content",
							type: "richText",
							required: true,
						},
					],
				},
				{
					name: "options",
					fields: [
						{
							name: "backgroundColor",
							type: "select",
							defaultValue: "none",
							required: true,
							enumName: "enum_background_color",
							options: ["none", "light", "dark"],
						},
					],
				},
			],
		},
	],
};
