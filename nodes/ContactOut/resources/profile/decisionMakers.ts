import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['profile'],
		operation: ['decisionMakers'],
	},
};

export const decisionMakersFields: INodeProperties[] = [
	{
		displayName: 'Company LinkedIn URL',
		name: 'companyLinkedinUrl',
		type: 'string',
		default: '',
		placeholder: 'https://linkedin.com/company/contactout',
		description: 'LinkedIn company URL (required if name and domain not provided)',
		displayOptions,
		routing: {
			request: {
				qs: {
					linkedin_url: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		placeholder: 'contactout.com',
		description: 'Company domain (required if linkedin_url and name not provided)',
		displayOptions,
		routing: {
			request: {
				qs: {
					domain: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Company Name',
		name: 'companyName',
		type: 'string',
		default: '',
		placeholder: 'ContactOut',
		description: 'Company name (required if linkedin_url and domain not provided)',
		displayOptions,
		routing: {
			request: {
				qs: {
					name: '={{$value || undefined}}',
				},
			},
		},
	},
	{
		displayName: 'Reveal Contact Info',
		name: 'revealInfo',
		type: 'boolean',
		default: false,
		description:
			'Whether to include contact information in results (consumes email or phone credits)',
		displayOptions,
		routing: {
			request: {
				qs: {
					reveal_info: '={{$value}}',
				},
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'Page number for pagination',
		typeOptions: {
			minValue: 1,
		},
		displayOptions,
		routing: {
			request: {
				qs: {
					page: '={{$value}}',
				},
			},
		},
	},
];
