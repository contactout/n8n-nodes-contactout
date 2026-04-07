import type { INodeProperties } from 'n8n-workflow';
import { contactInfoSingleFields } from './contactInfoSingle';
import { peopleEnrichFields } from './peopleEnrich';
import { contactInfoBulkV2Fields } from './contactInfoBulkV2';
import { decisionMakersFields } from './decisionMakers';

export const profileOperations: INodeProperties = {
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['profile'],
		},
	},
	options: [
		{
			name: 'Enrich Profile',
			value: 'peopleEnrich',
			action: 'Enrich a single profile',
			description:
				'Enrich a profile via LinkedIn URL, email, phone, company data, and other data points. Returns structured profile details and optionally emails or phone numbers. Consumes email/phone credits when requested.',
			routing: {
				request: {
					method: 'POST',
					url: '/v1/people/enrich',
				},
			},
		},
		{
			name: 'Get Contact Info',
			value: 'contactInfoSingle',
			action: 'Get contact details from a profile URL',
			description:
				'Get contact details (email/phone) from a LinkedIn profile URL. Consumes email/phone credits.',
			routing: {
				request: {
					method: 'GET',
					url: '/v1/people/linkedin',
				},
			},
		},
		{
			name: 'Batch Lookup',
			value: 'contactInfoBulkV2',
			action: 'Enrich multiple profiles',
			description:
				'Enrich multiple profiles with contact details (email/phone) asynchronously with an optional webhook callback URL. Consumes email/phone credits.',
			routing: {
				request: {
					method: 'POST',
					url: '/v2/people/linkedin/batch',
				},
			},
		},
		{
			name: 'Find Decision Makers',
			value: 'decisionMakers',
			action: 'Find company decision makers',
			description:
				'Find key people at a company by domain, name, or LinkedIn URL. Consumes search credits, may consume email/phone credits.',
			routing: {
				request: {
					method: 'GET',
					url: '/v1/people/decision-makers',
				},
			},
		},
	],
	default: 'contactInfoSingle',
};

export const profileDescription: INodeProperties[] = [
	profileOperations,
	...contactInfoSingleFields,
	...peopleEnrichFields,
	...contactInfoBulkV2Fields,
	...decisionMakersFields,
];
