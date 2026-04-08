# n8n-nodes-contactout

An n8n community node for [ContactOut](https://contactout.com). Find emails, phone numbers, and profile data for people and companies directly in your n8n workflows.

## Installation

**Via n8n UI (recommended):**
1. Go to **Settings > Community Nodes**
2. Search for `@contactout/n8n-nodes-contactout`
3. Click **Install**

**Via CLI:**
```bash
npm install @contactout/n8n-nodes-contactout
```

## Credentials

This node requires a ContactOut API key.

1. Get an API key from the [ContactOut dashboard](https://app.contactout.com) or contact [sales@contactout.com](mailto:sales@contactout.com)
2. In n8n, go to **Credentials > New > ContactOut API**
3. Paste your API key and save

## Features

- **Get Contact Info** — Look up a single person's email and/or phone number by LinkedIn profile URL.
- **Enrich Profile** — Enrich a person's profile via LinkedIn URL, email, phone, or name + secondary identifiers. Returns structured profile details and optionally contact info.
- **Batch Lookup** — Enrich up to 1,000 LinkedIn profiles asynchronously. Optionally posts results to a webhook callback URL when processing is complete.
- **Find Decision Makers** — Find key people at a company by domain, LinkedIn URL, or company name. Optionally reveal contact info.

## Example Usage

Here are some examples of how you can use the ContactOut nodes in your n8n workflows:

**Enrich a lead from a CRM:**
Use a CRM trigger node to pull new contacts, pass their LinkedIn URLs into the **Enrich Profile** operation to retrieve structured profile data, then update the CRM record with the enriched information.

**Build a prospect list:**
Use the **Find Decision Makers** operation with a company domain to find key people at target companies, then feed the results into a spreadsheet node to build a curated prospect list.

**Bulk enrich a LinkedIn export:**
Load a CSV of LinkedIn profile URLs into n8n, pass them to the **Batch Lookup** operation, and receive the enriched results via webhook when processing is complete.

**Qualify inbound leads:**
When a new lead fills out a form, use the **Get Contact Info** operation with their LinkedIn URL to instantly retrieve verified contact details and route high-value leads to your sales team.

## Resources

- [ContactOut API Docs](https://api.contactout.com)
- [n8n Community Nodes Docs](https://docs.n8n.io/integrations/community-nodes/)

## License

[MIT](LICENSE.md)
