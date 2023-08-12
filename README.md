# Zod Schemas for the Notion-API Data-Structures
Zod schemas for the Notion API data sctructure. This is an unofficial package made for personal use only.
If you have any suggestions on how to improve this make sure to add an issue or even better, a pull request.

Enjoy!

## Installation
```sh
npm install notion-api-zod-schemas
```

## Usage
```ts
import { z } from 'zod'
import {
	NotionMultiSelectSchema,
	NotionPageSchema,
	NotionTimeSchema,
	NotionTitleSchema,
	NotionUrlSchema,
} from 'notion-api-zod-schema'

const CustomSchema = NotionPageSchema.extend({
	properties: z.object({
		Created: NotionTimeSchema,
		URL: NotionUrlSchema,
		Tags: NotionMultiSelectSchema,
		Name: NotionTitleSchema,
	}),
})
type CustomType = z.infer<typeof CustomSchema>

CustomSchema.parse({
  ... // Your data here
})
```
