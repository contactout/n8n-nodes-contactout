import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { profileDescription } from './resources/profile';

export class ContactOut implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ContactOut',
		name: 'contactOut',
		icon: {
			light: 'file:../../icons/contactout.svg',
			dark: 'file:../../icons/contactout.dark.svg',
		},
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Find emails and phone numbers using the ContactOut API',
		documentationUrl: 'https://api.contactout.io',
		defaults: {
			name: 'ContactOut',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'contactOutApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.contactout.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Profile',
						value: 'profile',
					},
				],
				default: 'profile',
			},
			...profileDescription,
		],
	};
}
