import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export async function validatePeopleEnrich(
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
			'Provide a primary identifier (LinkedIn URL, Email, or Phone), ' +
				'or a Full Name with at least one secondary parameter ' +
				'(Company, Company Domain, Education, Job Title, or Location).',
		);
	}
	return requestOptions;
}

export async function validateDecisionMakers(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const linkedinUrl = this.getNodeParameter('companyLinkedinUrl') as string;
	const domain = this.getNodeParameter('domain') as string;
	const name = this.getNodeParameter('companyName') as string;

	const hasPrimary = !!(linkedinUrl || domain);
	const hasNameWithSecondary = !!(name && (linkedinUrl || domain));

	if (!hasPrimary && !hasNameWithSecondary) {
		throw new NodeOperationError(
			this.getNode(),
			'Provide at least one of: Company LinkedIn URL or Domain. ' +
				'Company Name alone is not sufficient — it requires Domain or Company LinkedIn URL.',
		);
	}
	return requestOptions;
}
