# CMR DMS / DocAI — User Manual

---

## Table of Contents

1. [Quick Start](#1-quick-start)
2. [Introduction](#2-introduction)
3. [Getting Started](#3-getting-started)
4. [User & Access Management](#4-user--access-management)
5. [Document Library](#5-document-library)
6. [Creating & Managing Documents](#6-creating--managing-documents)
7. [Sharing & Collaboration](#7-sharing--collaboration)
8. [File Requests](#8-file-requests)
9. [Search](#9-search)
10. [Reminders & Notifications](#10-reminders--notifications)
11. [Workflows](#11-workflows)
12. [AI Features](#12-ai-features)
13. [Administration & Settings](#13-administration--settings)
14. [Auditing & Logs](#14-auditing--logs)
15. [Retention & Cleanup](#15-retention--cleanup)

---

## 1. Quick Start

New to the platform? Here's how to get up and running in five steps:

1. **Find your documents** in **All Documents** or **Assigned Documents**.
2. **Upload a document** using **Add Document** (or **Bulk Upload** for multiple files at once).
3. **Control access** via **Share Document** or generate a **Shareable Link**.
4. **Stay on track** with **Reminders** and **Notifications**.
5. **Automate processes** by running **Workflows** and reviewing progress in **Workflow Logs**.

---

## 2. Introduction

CMR DMS / DocAI is a **Document Management System** designed to help organizations securely upload, organize, share, review, and track documents across teams and departments. The platform supports the full document lifecycle — from creation and collaboration to archiving and automated deletion — all within a centralized, permission-controlled environment.

The **Homepage** gives you an at-a-glance view of your document library by showing how many documents exist in each category. This makes it easy to understand the distribution and volume across your organization the moment you log in.

---

## 3. Getting Started

*The first things an administrator should configure before onboarding users.*

### Homepage — Documents by Category

The homepage displays document statistics organized by category, showing you the total count per category so you can quickly identify which departments have the most or fewest files. Use this as your dashboard overview whenever you log in.

---

### Company Profile

Set up your organization's branding so users see your company identity on the login screen.

- **Company Name**: Appears in the browser tab title. Must be between 2 and 50 characters.
- **Logo**: Displayed in the header of the login page. Accepted formats: PNG, JPG, JPEG (max 2 MB; recommended: 200×100px). A preview is shown after upload.
- **Banner Logo**: Displayed prominently below the header on the login screen. Accepted formats: PNG, JPG, JPEG (max 3 MB; recommended: 1200×300px). A preview is shown after upload.

Click **Save Changes** to apply. A confirmation message will confirm the update.

---

### Your User Profile

Each user has a personal profile page for managing their account details.

| Field | Description |
|---|---|
| First Name | Your given name, used to address you in the app. |
| Last Name | Your family name, often required for official documents. |
| Mobile Number | Optional but recommended for account recovery and two-factor authentication. |
| Email Address | Your primary login and notification channel. Required for verification and password recovery. |
| Password | Must be at least 6 characters. |
| Confirm Password | Re-enter your password to ensure it matches. |
| Role | Assigned by an administrator. Determines your access level and permissions. |

Fields with errors are highlighted with inline messages. Click **Submit** once all required fields are filled in correctly.

---

### Language Settings

The platform supports multiple languages. Administrators can add new languages, update existing translations, or delete unused language options. Once configured, users can interact with the interface in their preferred language — making the system accessible to global or multilingual teams.

---

## 4. User & Access Management

*This section is intended for administrators.*

### Users

The **Users** page is the central hub for managing all registered accounts.

**To add a new user:**
1. Click **Add User**.
2. Fill in: first name, last name, mobile number, email address, password, and confirm password.
3. Click **Save**.

Each user in the list has an action menu (three vertical dots) with the following options:
- **Edit**: Modify the user's details.
- **Delete**: Remove the user (requires confirmation).
- **Permissions**: Set or adjust individual permissions for this user.
- **Reset Password**: Initiate a password reset for the selected user.

---

### Roles

Roles define what users can and cannot do. Instead of setting permissions individually per user, you create a role with a specific permission set and assign it to multiple users.

**To create a new role:**
1. Click **Add Roles**.
2. Enter a role name.
3. Select the appropriate permissions from the available list (e.g., view, edit, delete, or share documents; manage users; define categories).
4. Click **Save**.

Existing roles can be edited or deleted from the roles list.

---

### Assigning Roles to Users

The **Role Users** page lets administrators assign roles using a **drag-and-drop** interface.

1. Select the **Department** context if applicable (e.g., "Approvals").
2. Choose the desired role from the **Select Role** dropdown.
3. From the **All Users** list on the left, drag the user into the **Users with Role** list on the right.
4. The user now inherits the permissions associated with that role.

---

### Individual User Permissions

In addition to role-based access, administrators can grant specific page-level permissions to individual users outside their assigned role. This is useful when a user occasionally needs access to a feature not covered by their role. Click **Save** to apply the changes.

---

### Clients

The **Clients** section maintains a directory of your external clients alongside internal users.

**Each client record contains:** company or person name, contact person, email address, and mobile number.

**To add a new client:**
1. Click **Add Client**.
2. Fill in the company/person name, contact person, email, and mobile number.
3. Click **Save**. The new client appears in the Clients List.

**To edit an existing client:**
1. Find the client in the list and click **Edit** in the Action column.
2. The form opens pre-filled with existing details.
3. Update any fields (e.g., correct an email, change the contact person).
4. Click **Save**. Changes are reflected immediately in the list.

---

## 5. Document Library

*Where users browse, filter, and monitor the lifecycle of documents.*

### All Documents

The **All Documents** page provides a complete view of every file in the system. It is the primary place to search, manage, and interact with documents.

**Search and filter options:**
- By document name
- By meta tags
- By category (dropdown)
- By storage location (dropdown)
- By creation date

**Each document entry shows:** name, creation date, category, status, and storage location.

**Actions available per document** (via the action menu):

| Action | Description |
|---|---|
| Edit | Update name, description, or meta tags. |
| Share | Grant access to users or roles. |
| Get Shareable Link | Generate a public or password-protected link with an optional expiry. |
| AI Summary | Generate a document summary usung AI technology. |
| View | Open the document in the built-in viewer. |
| Upload a New Version | Add an updated version of the file. |
| Version History | View, restore, or download previous versions. |
| Comment | Add or read threaded comments. |
| Add Reminder | Set a date-based reminder tied to this document. |
| Send as Email | Send the document as an email attachment. |
| Add Watermark | Apply a text watermark to a PDF. |
| Document Signature | Digitally sign the document. |
| Delete | Permanently remove the document. |

You can also select one, multiple, or all documents and use the bulk **Share** option to distribute them to users or groups at once.

---

### Assigned Documents

The **Assigned Documents** page shows only the documents that have been explicitly allocated to you — your personal workspace within the system.

It includes the same search and filter options as All Documents, plus:
- **Status dropdown** — filter by document status.
- **My Reminders panel** — view, edit, or delete your personal reminders directly from this page.

Each document entry shows: name, status, category, creation date, **expiration date**, and created by.

Available actions per document: edit, share, view, upload a version, version history, comment, and add reminder.

---

### Archived Documents

Documents that are no longer actively used but must be retained for compliance or future reference can be moved to the Archive. Archiving removes files from the active workspace without deleting them, keeping your library clean while preserving records. Archived documents remain searchable and accessible at any time.

---

### Expired Documents

Documents can be assigned an expiration date. When a document passes that date, the system automatically marks it as **Expired**, sends **notifications** to relevant users, and makes it available for compliance **reporting**. This prevents outdated documents from being used in active processes.

---

## 6. Creating & Managing Documents

*Common actions performed on individual documents.*

### Adding a Document

When uploading a new document, fill in the following fields:

- **Upload Document**: Select the file from your device.
- **Category**: Choose where the document belongs.
- **Name**: The display name for the document.
- **Status**: Set the document's visibility or access level (e.g., Confidential or Public).
- **Description**: Optional notes or context.
- **Meta Tags**: Keywords that make the document easier to find via search.

> **Note on statuses:** The *Status* field on the upload form controls access visibility (e.g., Confidential / Public). Separately, documents also have a **lifecycle status** (Draft, Final, Archived) managed via Document Status settings, which tracks where the document is in its approval or review process.

---

### Bulk Document Upload

Upload multiple documents in a single operation:

1. **Select a Category** for all documents in the batch.
2. **Set a Document Status** (Draft, Final, or Archived).
3. **Choose Storage** — Local or a configured cloud storage option.
4. **Assign by Roles**: Select which roles will have access to the uploaded files.
5. **Assign by Users**: Select specific users who should have access.
6. **Select Files**: Choose multiple files. You can optionally rename files before uploading.
7. Click **Upload** — the system applies the selected roles and users to every file automatically.

---

### Version History

Every document maintains a full version history. Previous versions are never deleted — they are preserved and remain accessible.

**To upload a new version:**
1. Find the document in All Documents or Assigned Documents.
2. Click **Upload a New Version** from the action menu.
3. Select the updated file and click **Save**.

**To view or restore a previous version:**
- Click **Version History** from the action menu.
- Browse past versions — you can **preview** or **download** any of them.
- To restore: click **Restore** on the desired version. The current document is automatically moved to history, and the restored version becomes the active document.

---

### Comments

Users can add comments directly to a document to facilitate discussion and collaboration. Other users with access to the document can view and respond, creating a threaded conversation attached to each file.

---

## 7. Sharing & Collaboration

*Ways to share documents, collaborate, and finalize work.*

### Share Document

The **Share Document** feature lets you assign access permissions to individual users or entire roles.

**To share a document:**
1. Open the action menu on the document and select **Share**.
2. Click **Assign By Users** or **Assign By Roles**.
3. In the dialog that opens, select the people or roles to share with.
4. Optionally configure:
   - **Share Duration**: Set a start and end date for access.
   - **Allow Download**: Enable or disable the ability to download the file.
   - **Allow Email Notification**: Notify recipients by email. *(Requires SMTP to be configured — an error is shown if SMTP is missing.)*
5. Click **Save**.

The shared permissions list at the bottom of the page updates immediately, showing each user/role, their type, download permission, email, and start/end dates.

**To remove access:** Click the **Delete** button next to any user or role in the list and confirm the action.

---

### Shareable Link

Generate a link to share a document with people outside the system (no account needed).

Options when creating a link:
- **Start and Expiry Dates**: Control when the link becomes active and when it expires.
- **Password Protection**: Restrict access to recipients who know the password.
- **Download Permission**: Choose whether the recipient can download the file.

All options are optional — links can be as open or as restricted as needed.

---

### Sending a Document by Email

To send a document as an email attachment:
1. Open the action menu and click **Send as Email**.
2. Enter the recipient's email address.
3. Add a subject line and email body.
4. Attach the document file.
5. Click **Send**.

---

### Digital Signatures

The **Document Signature** feature allows users to electronically sign documents without printing or scanning.

**To sign a document:**
1. Click **Document Signature** from the document action menu.
2. A popup opens with two options:
   - **Draw**: Sign using your mouse or touchscreen.
   - **Type**: Enter your name and choose from font styles for a professional-looking signature.
3. Drag the signature to your preferred position on the document.
4. Save — the signed document is stored with full audit tracking.

Key features: direct PDF signing (no format conversion needed), optional company profile details in the signature, encrypted output for tamper-proof integrity, and flexibility to add annotations like dates or initials.

---

### Document Watermarks

Watermarking protects and brands your PDF documents by overlaying text across every page.

**To add a watermark:**
1. Open the action menu and click **Add Watermark**.
2. Enter the watermark text (e.g., *"Confidential"*, *"Draft"*, *"Approved by Jane Doe"*).
3. Confirm — the system applies the watermark diagonally across all pages and saves it as a **new version** of the document.

Every watermark action is recorded in the audit trail: who applied it, the text used, date and time, and which version was created. The original file is always preserved in version history.

---

## 8. File Requests

*Collect documents from users — internal or external — without requiring them to have an account.*

### Creating a File Request

1. Go to the **File Request** page and click **Create New Request**.
2. Configure the request:
   - **Subject**: The title or purpose of the request.
   - **Email**: The email address associated with the request.
   - **Allowed File Extensions**: Restrict the file types that can be submitted (e.g., PDF, DOCX, JPG).
   - **Maximum File Size**: The largest allowed file size per upload.
   - **Maximum Documents**: How many files one user can submit.
   - **Link Expiration**: The date after which the link becomes inactive.
3. Click **Generate Link** and share it with the intended recipient(s).

Each request in the list shows: subject, email, status, created by, created date, upload limits, and expiration date. You can **Edit**, **Delete**, or **Copy the Link** for any request.

---

### Reviewing Submitted Documents

Once documents are submitted through the link, review them in **File Request Uploaded Documents**:

- **Preview**: View the file before deciding (supports PDF, DOCX, JPG, PNG).
- **Approve**: Accept the document — its status changes to Approved and it is marked as finalized.
- **Reject**: Decline the document and provide a comment explaining what needs to be corrected (e.g., *"Please upload a PDF"*, *"Missing required signatures"*, *"File size too large — please compress and resubmit"*).

Each submission shows: file name, upload date, status (Pending / Approved / Rejected), and any rejection reason.

---

## 9. Search

### Standard Search

From **All Documents** and **Assigned Documents**, filter by name, meta tags, category, storage, or creation date.

---

### Deep Search

**Deep Search** goes beyond file names and metadata — it scans the actual content inside your documents.

**Supported file types:** PDF, Word (DOCX), Excel (XLSX), and plain text files.

**How it works:**
- Enter a keyword or phrase in the Deep Search bar.
- The system returns the **top 10 most relevant results**.
- Search is **not case-sensitive** — "Report" and "report" return the same results.
- Common stop words ("and," "the," "is") are automatically excluded.
- **Word stemming** is applied — searching "run" also returns "running" and "runs."

---

## 10. Reminders & Notifications

### Reminders

The **Reminders** page is your hub for creating and managing time-based alerts. Reminders can be tied to a specific document or to any task or activity.

**To create a reminder:**
1. Click **Add Reminder**.
2. Fill in:
   - **Subject**: The title of the reminder (e.g., *"Contract Review Due"*).
   - **Message**: Additional details or instructions.
   - **Reminder Date**: When the reminder should trigger.
   - **Repeat Reminder**: Set recurrence — Daily, Weekly, Monthly, or Semi-annually.
   - **Send Email**: Check to also send an email notification when triggered.
   - **Select Users**: Choose who receives the reminder (individuals or groups).
3. Click **Save**.

All reminders are listed in a table showing: start date, end date, subject, message, frequency, and associated document (if any).

---

### Notifications

The platform sends real-time notifications both **in-app** and **by email**:

- **Document Shared Notification**: When a document is shared with you, you're notified immediately with the document name, category, and who shared it. External users receive a secure access link.
- **Reminder Notifications**: Triggered at the configured date and time, delivered via both in-app and email channels. Users can configure reminder frequency and set document-specific reminders for deadlines and renewals.

---

## 11. Workflows

*Process automation for multi-step approvals and document reviews.*

### Managing Workflows

From **Manage Workflow**, administrators can build and maintain workflows.

**Creating a new workflow:**
1. Provide a unique **name** and **description**.
2. Add **workflow steps** that define each stage of the process.
3. Define **transitions** — the rules and conditions that move the workflow from one step to the next.

**Editing an existing workflow:**
- Rename the workflow itself.
- Rename individual steps.
- Update transition names and rules.

---

### All Workflows

The **All Workflows** page shows every workflow in the system, regardless of who initiated it. Workflows are categorized by status:

| Status | Meaning |
|---|---|
| Completed | Fully executed. |
| Initiated | Started but not yet progressed. |
| In Progress | Actively running. |
| Cancelled | Stopped before completion. |

Each workflow is displayed in two complementary ways:
- **Graphical view**: Shows the structure of steps and transitions, with completed and pending transitions clearly differentiated.
- **Information table**: Lists workflow name, status, initiated by, associated document, steps, step statuses, responsible users, and transition states.

Click on any step or transition to view its full history, timestamps, and actions taken.

---

### My Workflows (Current Workflows)

The **Current Workflows** page shows only the workflows you are personally authorized to manage or participate in. It uses the same graphical and tabular format as All Workflows but filtered to your context, giving you a focused view of your active responsibilities.

---

### Workflow Logs

The **Workflow Logs** page serves as a complete audit trail for all workflow activity across the entire system. It provides the same graphical and tabular detail as All Workflows and is particularly useful for managers and compliance officers reviewing process history and accountability.

---

## 12. AI Features

### AI Document Generator

Generate fully drafted documents from a simple text prompt. Content streams into the built-in rich text editor (CKEditor) in real time.

**How to use it:**
1. Navigate to the **AI Document Generator** and find the "Generate with AI" input field.
2. Enter a clear, specific prompt. Example: *"Write a GDPR privacy policy for a small e-commerce company."*
3. Click **Generate** — content begins streaming within 1–2 seconds.
4. Edit the generated content using the full formatting toolbar (headings, lists, links, etc.).
5. Save or export the document.

**Tips for better results:**
- Be specific about document type, audience, and tone.
- Example: *"Create an employee NDA agreement for a startup in plain language."*
- Always review AI-generated content before finalizing.

**Technical notes:**
- Requires an active, authenticated session (Bearer token).
- Generated content and the original prompt are stored securely in the system.
- OpenAI credentials are never exposed to the browser.
- Content is auto-saved along with the prompt that generated it.

**Common issues:**

| Issue | Cause | Solution |
|---|---|---|
| Nothing is generated | Blank prompt or network error | Enter a valid prompt and check your connection. |
| 419 Error | Missing CSRF token or unauthorized call | Ensure you're logged in with a valid session. |
| API Failed | OpenAI error or rate limit | Wait a few minutes and try again. |

---

### AI Prompt Templates

Prompt Templates speed up AI generation by providing pre-written prompts with customizable placeholders.

**How to use a template:**
1. Select a template from the list (e.g., *"Answer this email content: **description**"*).
2. The system prompts you to fill in each placeholder.
3. Once filled in, the final prompt is assembled automatically.
4. The AI generates the result based on your completed prompt.

---

### AI Document List

The **AI Documents** page keeps a history of every document generated through the AI. For each entry you can view:

- **Prompt** — the exact input used to generate the content.
- **Output** — the full AI-generated text.

Use this to track your generation history, refine your prompt-writing technique over time, or reuse previously generated content.

---

## 13. Administration & Settings

*Configuration, taxonomy, system settings, and helper content.*

### Document Categories

Categories represent the departments or subject areas that own and work with files. The system supports a **hierarchical structure** with main categories and subcategories.

**To add a new category:**
1. Click **Add New Document Category**.
2. Enter a name and description.
3. Click **Save**.

**To view subcategories:** Click the **>>** button next to any main category to expand its subcategories.

Categories can be edited or deleted at any time via the action menu next to each entry.

---

### Document Status

Document status tracks where a document is in its lifecycle. Available statuses:

- **Draft** — still being worked on.
- **Final** — approved and completed.
- **Archived** — no longer active but retained for reference.

This ensures only the right people have access to documents in the appropriate state.

---

### Storage Settings

Configure where documents are physically stored.

**Available storage types:**
- **Local**: The built-in default. Cannot be deleted, ensuring there is always a reliable fallback.
- **AWS S3**: Cloud storage. Required fields: Storage Type, Access Key, Secret Key, and Bucket Name.

**Options for any storage configuration:**
- **Enable Encryption**: Files are stored in encrypted form.
- **Set as Default**: Makes this storage the default selection when uploading documents.

When you save a new configuration, the system uploads a test file to verify the connection. If the test fails, you'll be prompted to correct the settings before saving.

To edit existing storage settings, click the **Edit** button on any row in the settings list. You can modify the name, "Is Default," and "Enable Encryption" fields inline.

> **New to AWS S3?** You can create a free account at [aws.amazon.com/free](https://aws.amazon.com/free/).

---

### Allowed File Extensions

Control which file types users are permitted to upload.

1. Choose from a predefined list of file types (images, documents, videos) or add custom types.
2. Specify the associated extensions (e.g., `.jpg`, `.pdf`, `.mp4`).
3. Apply the configuration — the system enforces these rules on all uploads.

Extensions can be added, modified, or removed at any time.

---

### Email (SMTP) Settings

To enable email notifications and document sharing by email, configure at least one SMTP server.

**To add a configuration:**
1. Go to **Email SMTP Settings** and click **Add Settings**.
2. Fill in:
   - **Username**: The SMTP authentication username.
   - **Host**: The SMTP server address.
   - **Port**: The port the server listens on.
   - **Is Default**: Check to make this the default outgoing mail configuration.
3. Click **Save**.

Multiple SMTP configurations can be stored; only the default one is used automatically. All configurations are displayed in a table with username, host, port, and default status.

---

### Page Helpers

Administrators can manage the in-app help text displayed across every page of the platform.

For each page, you can:
- **View**: Click the **View** button to open a modal dialog showing the page's current name, unique code, and help description. Close the modal with the X or Close button.
- **Edit**: Click the **Edit** button to modify the page name and rewrite the help description. The unique page code is non-editable. Changes are saved immediately and reflected across the application.

---

## 14. Auditing & Logs

*Accountability, traceability, and operational visibility.*

### Document Audit History

A complete record of every action taken on every document in the system.

**Search by:** document name, meta tag, or user.

**Each audit entry shows:** date, document name, category, operation performed, who performed it, which user or role it was directed at.

Click on any entry to view additional details or navigate directly to the associated document. The list can be sorted by any column (date, name, category, operation, performed by, directed to user, directed to role) for easy analysis.

---

### Login Audit Logs

A centralized record of every authentication attempt — both successful and failed logins.

**Each entry shows:** username, login date and time, IP address, and result (success or failure).

Use the search or filter function to locate specific entries. This gives administrators clear visibility into system access patterns and helps identify suspicious activity.

---

### Email Logs

Tracks every email sent through the system, providing a full history for transparency and troubleshooting.

**Each log entry includes:**

- **Email ID** — unique identifier for each email.
- **Timestamp** — date and time sent.
- **Sender and Recipient** email addresses.
- **Subject** and message body preview.
- **Attachments** — details of any files included.
- **Delivery Status**: Sent, Failed, Queued, Delivered, Opened, or Bounced.
- **Error Details**: If delivery failed, the reason is recorded (e.g., invalid recipient address, server timeout).

---

### Cron Job Logs

The **Cron Job Logs** page provides visibility into the automated background tasks the system runs on a schedule. These tasks handle reminders, notifications, and document lifecycle management automatically.

**Scheduled jobs:**

| Job | Description |
|---|---|
| Custom Date Reminder | Sends reminders based on user-defined custom dates — ideal for dates that don't follow standard frequencies. |
| Daily Notification Handler | Sends daily notifications about document activities and pending actions. |
| Weekly Reminder | Weekly emails about document actions, expiring records, or general reminders. |
| Monthly Reminder | Monthly reminders to prompt action on documents requiring periodic attention. |
| Quarterly Reminder | Triggers every three months for scheduled document tasks or reviews. |
| Half Yearly Reminder | Sends notifications every six months for periodic reviews or renewals. |
| Yearly Reminder | Annual notifications for yearly reviews, renewals, or compliance tasks. |
| Notification Scheduler | Central coordinator that ensures all scheduled notifications are sent at the right time. |
| Send Email | Processes queued emails generated by other jobs — ensures reliable delivery. |
| Delete Archive Document By Retention Date | Deletes archived documents that have exceeded their retention period. |
| Delete or Archive or Expire Document By Retention Date | Manages document lifecycle per retention configuration — automatically deletes, archives, or expires documents. |
| Delete Email, Audit & Cron Job Logs | Cleans up old system logs after a defined period to maintain performance and storage. |

**Monitoring tips:**
- Check execution status regularly — failed jobs may require admin attention.
- Use filters to find logs by job name, status, or date.
- Ensure retention rules are properly configured, as they directly influence deletion and archival jobs.
- This log also acts as a system automation audit trail — valuable during compliance reviews and troubleshooting.

---

## 15. Retention & Cleanup

*Automatic rules to keep storage organized and compliant.*

### Archive Document Retention Period

Configure the system to **automatically delete archived documents** after a set number of days.

**Available retention periods:** 30, 60, 90, 180, or 365 days.

Once this setting is enabled, the system monitors the age of each archived document and deletes it automatically when the retention period is reached. This keeps your workspace organized and ensures compliance with data retention policies without manual intervention.

---

*For additional support, contact your system administrator or reach out via the Help Center.*
