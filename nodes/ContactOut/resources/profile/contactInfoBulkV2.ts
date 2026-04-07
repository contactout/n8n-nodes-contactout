import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['profile'],
		operation: ['contactInfoBulkV2'],
	},
};

export const contactInfoBulkV2Fields: INodeProperties[] = [
	{
		displayName: 'LinkedIn Profile URLs',
		name: 'profiles',
		type: 'json',
		required: true,
		default: '[\n  "https://linkedin.com/in/janedoe",\n  "https://linkedin.com/in/johndoe"\n]',
		description: 'Array of LinkedIn profile URLs to enrich (max 1000)',
		displayOptions,
		routing: {
			send: {
				type: 'body',
				property: 'profiles',
				value: '={{JSON.parse($value)}}',
			},
		},
	},
	{
		displayName: 'Callback URL',
		name: 'callbackUrl',
		type: 'string',
		default: '',
		placeholder: 'https://your-website.com/callback-endpoint',
		description: 'Webhook URL to receive results when processing is complete',
		displayOptions,
		routing: {
			send: {
				type: 'body',
				property: 'callback_url',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Include Phone',
		name: 'includePhone',
		type: 'boolean',
		default: false,
		description:
			'Whether to include phone numbers in the results (uses 1 phone credit per phone found)',
		displayOptions,
		routing: {
			send: {
				type: 'body',
				property: 'include_phone',
				value: '={{$value}}',
			},
		},
	},
];
