import type { INodeProperties } from 'n8n-workflow';

const displayOptions = {
  show: {
    resource: ['profile'],
    operation: ['peopleEnrich'],
  },
};

export const peopleEnrichFields: INodeProperties[] = [
  {
    displayName: 'Include Contact Info',
    name: 'includeContactInfo',
    type: 'multiOptions',
    default: [],
    description:
      'Specify which contact information to include in the response. Consumes 1 search credit if a profile was found, 1 email credit per email found, 1 phone credit per phone found. Leave empty for profile data only.',
    options: [
      { name: 'Work Email', value: 'work_email' },
      { name: 'Personal Email', value: 'personal_email' },
      { name: 'Phone', value: 'phone' },
    ],
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'include',
        value: '={{$value}}',
      },
    },
  },
  {
    displayName: 'LinkedIn URL',
    name: 'linkedinUrl',
    type: 'string',
    default: '',
    placeholder: 'https://linkedin.com/in/example-profile',
    description: 'LinkedIn profile URL (primary identifier)',
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'linkedin_url',
        value: '={{$value || undefined}}',
      },
    },
  },
  {
    displayName: 'Email',
    name: 'email',
    type: 'string',
    default: '',
    placeholder: 'person@example.com',
    description: 'Email address (primary identifier)',
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'email',
        value: '={{$value || undefined}}',
      },
    },
  },
  {
    displayName: 'Phone',
    name: 'phone',
    type: 'string',
    default: '',
    placeholder: '+14155552671',
    description: 'Phone number (primary identifier)',
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'phone',
        value: '={{$value || undefined}}',
      },
    },
  },
  {
    displayName: 'Full Name',
    name: 'fullName',
    type: 'string',
    default: '',
    placeholder: 'Example Person',
    description: 'Full name (requires company, domain, or education)',
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'full_name',
        value: '={{$value || undefined}}',
      },
    },
  },
  {
    displayName: 'Company',
    name: 'company',
    type: 'string',
    default: '',
    placeholder: 'ContactOut, Acme',
    description: 'Company name(s), comma-separated (max 10)',
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'company',
        value: '={{$value ? $value.split(",").map(c => c.trim()) : undefined}}',
      },
    },
  },
  {
    displayName: 'Company Domain',
    name: 'companyDomain',
    type: 'string',
    default: '',
    placeholder: 'contactout.com, acme.com',
    description: 'Company domain(s), comma-separated (max 10)',
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'company_domain',
        value: '={{$value ? $value.split(",").map(c => c.trim()) : undefined}}',
      },
    },
  },
  {
    displayName: 'Education',
    name: 'education',
    type: 'string',
    default: '',
    placeholder: 'Stanford University, MIT',
    description: 'Educational institution(s), comma-separated (max 10)',
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'education',
        value: '={{$value ? $value.split(",").map(c => c.trim()) : undefined}}',
      },
    },
  },
  {
    displayName: 'Job Title',
    name: 'jobTitle',
    type: 'string',
    default: '',
    placeholder: 'Product Manager',
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'job_title',
        value: '={{$value || undefined}}',
      },
    },
  },
  {
    displayName: 'Location',
    name: 'location',
    type: 'string',
    default: '',
    placeholder: 'San Francisco, CA',
    displayOptions,
    routing: {
      send: {
        type: 'body',
        property: 'location',
        value: '={{$value || undefined}}',
      },
    },
  },
];
