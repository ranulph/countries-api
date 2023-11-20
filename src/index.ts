import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { bearerAuth } from 'hono/bearer-auth';
import { token } from "./token";
import { countryCodeSchema, countrySchema } from "./schemas";
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';


type Bindings = {
	COUNTRIES: KVNamespace;
};

const app = new OpenAPIHono<{ Bindings: Bindings }>()

app.get('/ui', swaggerUI({ url: '/doc' }));
app.doc('/doc', {
	info: {
	  title: 'Countries API',
	  version: 'v1',
	  description: 'Request country data. Includes latest population data and SVG flag link. Requires Bearer Authentication.'
	},
	openapi: '3.1.0'
});

app.use('*', secureHeaders());
app.use('/*', cors());
app.use('/*', bearerAuth({ token }));


app.openapi(
	createRoute({
		method: 'get',
		path: '/country/{countryCode}',
		request: {
			params: countryCodeSchema,
		},
		responses: {
			200: {
				description: 'Request individual country data. Supply three-letter country code (ISO 3166-1 alpha-3). 3KB',
				content: {
					'application/json': {
						schema: countrySchema
					}
				}
			},
			401: {
				description: 'Unauthorized. Requires Bearer Auth.',
				content: {
					'application/json': {
						schema: z.string()
					}
				}
			},
			404: {
				description: 'Country not found.',
				content: {
					'application/json': {
						schema: z.object({
							error: z.string(),
							ok: z.boolean(),
						})
					}
				}
			}
		}
	}),
	async (c) => {
		const { countryCode } = c.req.valid('param')
		const kv = await c.env.COUNTRIES.get(countryCode);
		if (kv) {
			const country = JSON.parse(kv);
			return c.json(country)
		}
		const error = { error: 'Country not found', ok: false };
		return c.newResponse(JSON.stringify(error), 404)
	}
);

app.openapi(
	createRoute({
		method: 'get',
		path: '/countries',
		responses: {
			200: {
				description: 'Request all countries. 479KB',
				content: {
					'application/json': {
						schema: z.array(z.object({
							key: z.string(),
							value: countrySchema
						}))
					}
				}
			},
			401: {
				description: 'Unauthorized. Requires Bearer Auth.',
				content: {
					'application/json': {
						schema: z.string()
					}
				}
			},
			500: {
				description: 'Server Error. Unable to retrieve currencies list.',
				content: {
					'application/json': {
						schema: z.object({
							error: z.string(),
							ok: z.boolean(),
						})
					}
				}
			}
		}
	}),
	async (c) => {
		const kv = await c.env.COUNTRIES.get('countries');
		if (kv) {
			const countries = JSON.parse(kv);
			return c.json(countries)
		}
		const error = { error: 'Server Error. Unable to retrieve currencies list.', ok: false };
		return c.newResponse(JSON.stringify(error), 500)
	}
);


export default app;
