import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
	show: {
		resource: ['profile'],
		operation: ['contactInfoSingle'],
	},
};

/**
 * Convert the multiOptions value for included email types into the format expected by the API.
 * e.g. ['personal_email', 'work_email'] => 'personal,work'
 */
const emailTypeFromInclude =
	'={{ ($value || []).includes("personal_email") && ($value || []).includes("work_email") ? "personal,work" : ($value || []).includes("personal_email") ? "personal" : ($value || []).includes("work_email") ? "work" : "none" }}';

export const contactInfoSingleFields: INodeProperties[] = [
	{
		displayName: 'Include Contact Info',
		name: 'includeContactInfo',
		type: 'multiOptions',
		default: ['personal_email', 'work_email'],
		description: 'What email types to include. Uses 1 email credit per email found.',
		displayOptions,
		options: [
			{ name: 'Work Email', value: 'work_email' },
			{ name: 'Personal Email', value: 'personal_email' },
		],
		routing: {
			request: {
				qs: {
					email_type: emailTypeFromInclude,
				},
			},
		},
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
