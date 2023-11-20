import { z } from '@hono/zod-openapi';


export const countryCodeSchema = z.object({
	countryCode: z
		.string()
		.openapi({
			param: {
				name: 'countryCode',
				in: 'path',
			},
			example: 'FRA',
		})
});

export const countrySchema = z.object({
	key: z.string(),
	value: z.object({})
});
