import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['profile'],
		operation: ['contactInfoSingle'],
	},
};

export const contactInfoSingleFields: INodeProperties[] = [
	{
		displayName: 'Include Contact Info',
		name: 'includeContactInfo',
		type: 'multiOptions',
		default: [],
		description: 'Which email types to include. Uses 1 email credit per email found, 1 phone credit per phone found.',
		displayOptions,
		options: [
			{ name: 'Work Email', value: 'work_email' },
			{ name: 'Personal Email', value: 'personal_email' },
			{ name: 'Phone', value: 'phone' },
		],
	},
	{
		displayName: 'LinkedIn Profile URL',
		name: 'profileUrl',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'https://www.linkedin.com/in/example-profile',
		description: 'The LinkedIn profile URL. Must contain linkedin.com/in/ or linkedin.com/pub/.',
		displayOptions,
		routing: {
			request: {
				qs: {
					profile: '={{$value}}',
				},
			},
		},
	},
];
