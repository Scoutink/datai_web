window.FEATURES_FALLBACK_DATA = [
  {
    "id": "document-library",
    "title": "Document Library",
    "tagline": "Every file. Every version. Every team.",
    "manualRef": "Manual §5",
    "description": "A centralized repository organized by categories and subcategories that mirror your organization's structure. Search by name, meta tag, creation date, category, or storage type. Every document carries an expiration date, a lifecycle status (Draft, Final, Archived), and an access visibility level (Confidential or Public) — two independent controls that work together.",
    "details": [
      "Hierarchical categories and subcategories mirroring your org chart",
      "Filter by name, meta tags, creation date, storage type, and category",
      "Document expiration dates with automated status updates and user alerts",
      "Assigned Documents view: personal workspace showing only your allocated files",
      "Expiration date visible per document — prevents use of outdated materials",
      "Bulk share: select one, many, or all documents and distribute in a single action",
      "Full version history — restore any previous version as the current active document"
    ],
    "image": "feature-documents.png",
    "imageCaption": "Document library interface"
  },
  {
    "id": "sharing-access",
    "title": "Sharing & Access Control",
    "tagline": "Exactly the right people. Nothing more.",
    "manualRef": "Manual §7",
    "description": "Share documents with individual users or entire roles. Set time-bounded access with a start and end date. Enable or disable download per share. Send email notifications at share time. Generate password-protected public links with expiry dates for external stakeholders — no account needed.",
    "details": [
      "Assign access by individual user or by role",
      "Set start and end dates for any permission — access auto-expires",
      "Enable or disable download per individual share",
      "Email notification to recipients at share time (requires SMTP configuration)",
      "Password-protected shareable links for external users with expiry date",
      "Revoke access instantly by removing a user or role from the shared list",
      "Permissions list updates in real time after every change"
    ],
    "image": "feature-sharing.png",
    "imageCaption": "Document sharing and permissions"
  },
  {
    "id": "workflow-automation",
    "title": "Workflow Automation",
    "tagline": "Multi-step approvals. Zero chasing.",
    "manualRef": "Manual §11",
    "description": "Build approval and review workflows with named steps and transitions. Assign each step to a user or team. Track progress in a visual graph and a detailed table. Every workflow — completed, in progress, initiated, or cancelled — is logged for compliance.",
    "details": [
      "Create workflows with unlimited named steps and transition rules",
      "Assign each step to individual users or roles",
      "Visual graph view shows completed vs pending transitions at a glance",
      "All Workflows page: admin view of every workflow across the organization",
      "My Workflows page: personal view of only the workflows you're authorized to manage",
      "Workflow Logs: complete audit trail of all workflow activity — who did what, when",
      "Four statuses tracked: Completed, In Progress, Initiated, Cancelled"
    ],
    "image": "feature-workflow.png",
    "imageCaption": "Workflow automation diagram"
  },
  {
    "id": "ai-engine",
    "title": "AI Document Engine",
    "tagline": "Generate. Summarize. Search inside. Automate.",
    "manualRef": "Manual §12, §5",
    "description": "Use AI to generate complete documents from a plain-language prompt — privacy policies, NDAs, compliance reports — with real-time content streaming into a rich text editor. Summarize any existing document in seconds. Deep Search scans the content inside PDFs, Word documents, and spreadsheets. Prompt templates accelerate repeat document creation.",
    "details": [
      "AI document generation with real-time content streaming (starts in under 2 seconds)",
      "AI Summary: generate an instant summary of any existing document directly from the document menu",
      "Deep Search scans inside PDF, DOCX, XLSX, and TXT files — not just filenames",
      "Top 10 most relevant results returned per deep search query",
      "Case-insensitive search with word stemming (searching 'run' finds 'running', 'runs')",
      "Prompt templates with customizable placeholders for frequently generated document types",
      "Full AI generation history: view every past prompt and its generated output"
    ],
    "image": "feature-ai.png",
    "imageCaption": "AI document generation interface"
  },
  {
    "id": "signatures-watermarks",
    "title": "Digital Signatures & Watermarks",
    "tagline": "Finalize documents without leaving the platform.",
    "manualRef": "Manual §7",
    "description": "Sign PDFs by drawing or typing your signature, drag it to the right position, and save. Apply text watermarks across all PDF pages. Every signed or watermarked file is saved as a new version, preserving the original, with full audit logging of every action.",
    "details": [
      "Draw or type your signature with professional font style selection",
      "Place signatures anywhere on the PDF via drag — no position restrictions",
      "Include company profile details alongside the signature",
      "Text watermarks applied diagonally across all PDF pages automatically",
      "Every signature and watermark action creates a new document version",
      "Originals are always preserved in version history",
      "Audit trail captures who signed or watermarked, what text was used, and when"
    ],
    "image": "feature-signature.png",
    "imageCaption": "Digital signature interface"
  },
  {
    "id": "audit-compliance",
    "title": "Audit Trail & Compliance",
    "tagline": "Nothing moves without a record.",
    "manualRef": "Manual §14",
    "description": "Every action on every document is logged: uploads, edits, shares, downloads, signatures, watermarks, version restores, and deletions. Search and sort the audit trail by document, user, category, or operation type. Click any entry to navigate directly to the associated document.",
    "details": [
      "Complete log of every document action: uploads, edits, shares, deletes, signatures, restores",
      "Searchable by document name, meta tag, and user",
      "Sortable by date, operation, category, performed by, and directed to user or role",
      "Login Audit Logs: every authentication attempt recorded with username, IP, timestamp, and outcome",
      "Email Logs: full delivery tracking per email — status, bounce reasons, error codes",
      "Cron Job Logs: visibility into all 12 automated background tasks and their execution history",
      "Workflow Logs: complete audit trail for all workflow steps and transitions"
    ],
    "image": "feature-audit.png",
    "imageCaption": "Audit trail and compliance view"
  },
  {
    "id": "file-requests",
    "title": "File Requests",
    "tagline": "Collect documents without accounts or friction.",
    "manualRef": "Manual §8",
    "description": "Generate a unique link, set file type and size restrictions, and share it with anyone — no account required. Recipients upload files through the link. Review, approve, or reject submissions with written feedback. Track status per submission.",
    "details": [
      "Unique link per request — share with any external user, no login required",
      "Restrict by allowed file extensions, maximum file size, and upload count",
      "Set a link expiration date — the link becomes inactive after the deadline",
      "Preview PDF, DOCX, JPG, and PNG submissions before approving or rejecting",
      "Reject with a written comment (e.g., 'Please upload a PDF' or 'Missing signatures')",
      "Status per submission: Pending, Approved, or Rejected",
      "Edit, delete, or copy the link for any request at any time"
    ],
    "image": "feature-file-request.png",
    "imageCaption": "File request link creation"
  },
  {
    "id": "comments-collaboration",
    "title": "Comments & Collaboration",
    "tagline": "Discussion stays with the document.",
    "manualRef": "Manual §6",
    "description": "Add threaded comments directly to any document. Other users with access can view and reply, creating a conversation thread attached to the file — not buried in email. Discussion, feedback, and decisions stay in context, always alongside the document they relate to.",
    "details": [
      "Add comments to any document from the document action menu",
      "Threaded replies keep discussions organized and contextual",
      "Visible to all users with access to the document",
      "No separate tool or email chain needed — feedback lives with the file",
      "Works alongside sharing, versioning, and reminders for a complete collaboration loop"
    ],
    "image": "feature-comments.png",
    "imageCaption": "Threaded document comments"
  },
  {
    "id": "reminders-notifications",
    "title": "Reminders & Notifications",
    "tagline": "No deadline slips through.",
    "manualRef": "Manual §10",
    "description": "Set recurring reminders tied to documents or general events, delivered in-app and by email. Notifications fire in real time when documents are shared with you or when workflow transitions occur. Twelve automated background jobs run on schedule to ensure no reminder or notification is ever missed.",
    "details": [
      "Reminders tied to specific documents or general tasks and events",
      "Recurrence options: Daily, Weekly, Monthly, Semi-annual, and Custom date",
      "Delivered via both in-app notifications and email",
      "Real-time notification when a document is shared with you",
      "External users who receive shared documents get a secure access link by notification",
      "12 scheduled cron jobs handle daily, weekly, monthly, quarterly, semi-annual, and yearly reminders automatically",
      "My Reminders panel visible directly from the Assigned Documents page"
    ],
    "image": "feature-reminders.png",
    "imageCaption": "Reminders and notifications panel"
  },
  {
    "id": "user-access-management",
    "title": "User & Access Management",
    "tagline": "The right access. For the right people. Always.",
    "manualRef": "Manual §4",
    "description": "Create and manage user accounts, define role-based permission sets, and assign users to roles via drag-and-drop. Grant individual page-level permission overrides for edge cases beyond roles. Maintain a client directory of external contacts alongside internal users.",
    "details": [
      "Add, edit, delete users — and reset passwords — from a single admin page",
      "Define roles with granular permissions: view, edit, delete, share, sign, manage users, and more",
      "Assign users to roles via drag-and-drop: move from All Users to Users with Role",
      "Individual permission overrides: grant specific page access outside a user's role",
      "Client directory: maintain external company contacts, contact persons, email, and mobile numbers",
      "Permissions visible and editable per user from the user action menu",
      "All access changes are reflected immediately — no cache delay"
    ],
    "image": "feature-sharing.png",
    "imageCaption": "Role and user access management"
  },
  {
    "id": "branding-localization",
    "title": "White-Label Branding & Multi-Language",
    "tagline": "Your platform. Your identity. Any language.",
    "manualRef": "Manual §3",
    "description": "Replace the platform's identity with your own. Upload your company logo and banner for the login screen. Set your company name as the browser tab title. Support global teams by enabling multiple languages — administrators can add, update, or remove language options at any time.",
    "details": [
      "Upload company logo displayed in the login page header (PNG/JPG, max 2 MB)",
      "Upload banner logo displayed prominently on the login screen (PNG/JPG, max 3 MB)",
      "Company name appears dynamically as the browser tab title",
      "Live preview shown immediately after each logo upload",
      "Multi-language interface: administrators add, update, or delete supported languages",
      "Users interact with the full platform in their configured language",
      "Branding applied system-wide — every user sees your identity from the first login"
    ],
    "image": "feature-branding.png",
    "imageCaption": "White-label company profile setup"
  },
  {
    "id": "storage-admin",
    "title": "Storage, Extensions & Admin Controls",
    "tagline": "Infrastructure that fits your security policy.",
    "manualRef": "Manual §13",
    "description": "Configure where documents are stored — local server or AWS S3 with encryption. Control which file types users can upload by managing the allowed extensions list. Customize in-app help text on every page of the platform. Configure outgoing email through any SMTP server.",
    "details": [
      "Local storage built in as the default — cannot be deleted, always available",
      "AWS S3 cloud storage with Access Key, Secret Key, and Bucket Name configuration",
      "Enable encryption: files stored in encrypted form within the chosen storage",
      "Test connection on save — system uploads a dummy file to verify before applying settings",
      "Allowed File Extensions: restrict uploads to specific file types platform-wide",
      "SMTP email configuration: support multiple servers, set one as the default",
      "Page Helpers: administrators can edit in-app guidance text for every platform page",
      "Archive retention periods: 30, 60, 90, 180, or 365 days — auto-delete on schedule"
    ],
    "image": "security-diagram.png",
    "imageCaption": "Storage and admin configuration"
  }
];
