import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class ContactOutApi implements ICredentialType {
	name = 'contactOutApi';
	displayName = 'ContactOut API';
	documentationUrl = 'https://api.contactout.io/#authentication';
	icon: Icon = {
		light: 'file:../icons/contactout.svg',
		dark: 'file:../icons/contactout.dark.svg',
	};
	properties: INodeProperties[] = [
		{
			displayName: 'ContactOut API Token',
			name: 'apiToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				token: '={{$credentials.apiToken}}',
				'X-Co-N8n-Invoked': '1',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.contactout.com',
			url: '/v1/stats',
		},
	};
}
