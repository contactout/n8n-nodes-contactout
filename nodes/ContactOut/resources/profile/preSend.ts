import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function contactInfoSinglePreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const selected = this.getNodeParameter('includeContactInfo') as string[];

	const hasWork = selected.includes('work_email');
	const hasPersonal = selected.includes('personal_email');

	let emailType: string | undefined;
	if (hasWork && hasPersonal) emailType = 'personal,work';
	else if (hasPersonal) emailType = 'personal';
	else if (hasWork) emailType = 'work';

	if (emailType) {
		(requestOptions.qs as Record<string, unknown>) ??= {};
		(requestOptions.qs as Record<string, unknown>).email_type = emailType;
	}

	return requestOptions;
}

export async function peopleEnrichPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const linkedinUrl = this.getNodeParameter('linkedinUrl') as string;
	const email = this.getNodeParameter('email') as string;
	const phone = this.getNodeParameter('phone') as string;
	const fullName = this.getNodeParameter('fullName') as string;
	const company = this.getNodeParameter('company') as string;
	const companyDomain = this.getNodeParameter('companyDomain') as string;
	const education = this.getNodeParameter('education') as string;
	const jobTitle = this.getNodeParameter('jobTitle') as string;
	const location = this.getNodeParameter('location') as string;

	const hasPrimary = !!(linkedinUrl || email || phone);
	const hasSecondary = !!(company || companyDomain || education || jobTitle || location);

	if (!hasPrimary && !(fullName && hasSecondary)) {
		throw new NodeOperationError(
			this.getNode(),
			'Provide a primary identifier (LinkedIn URL, email, or phone), ' +
				'or a full name with at least one secondary parameter ' +
				'(company, company domain, education, job title, or location).',
		);
	}
	return requestOptions;
}

export async function contactInfoBulkV2PreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const raw = this.getNodeParameter('profiles') as string | string[];

	let profiles: unknown;
	if (Array.isArray(raw)) {
		profiles = raw;
	} else {
		try {
			profiles = JSON.parse(raw);
		} catch {
			throw new NodeOperationError(
				this.getNode(),
        'LinkedIn Profile URLs must be a valid JSON array, e.g. ["https://linkedin.com/in/example-profile", "https://linkedin.com/in/example-profile-2"]',
			);
		}
	}

	if (!Array.isArray(profiles)) {
		throw new NodeOperationError(
			this.getNode(),
        'LinkedIn Profile URLs must be an array, e.g. ["https://linkedin.com/in/example-profile", "https://linkedin.com/in/example-profile-2"]',
		);
	}

	if (profiles.length === 0) {
		throw new NodeOperationError(this.getNode(), 'LinkedIn Profile URLs array must not be empty.');
	}

	if (profiles.length > 1000) {
		throw new NodeOperationError(
			this.getNode(),
			`LinkedIn Profile URLs array exceeds the maximum of 1000 (got ${profiles.length}).`,
		);
	}

	requestOptions.body = { ...(requestOptions.body as object), profiles };
	return requestOptions;
}

export async function decisionMakersPreSend(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const linkedinUrl = this.getNodeParameter('companyLinkedinUrl') as string;
	const domain = this.getNodeParameter('domain') as string;
	const name = this.getNodeParameter('companyName') as string;

	if (!linkedinUrl && !domain && !name) {
		throw new NodeOperationError(
			this.getNode(),
			'Provide at least one of: company LinkedIn URL, company domain, or company name'
		);
	}
	return requestOptions;
}
