/**
 * Email Templates for Portfolio
 * Reusable email templates with proper formatting
 */

// Interview Request Email Template
export const interviewEmailTemplate = {
    subject: "Interview Opportunity",
    body: `Dear Nitish,

I came across your portfolio and was impressed by your work in backend engineering, particularly your experience with FastAPI, Django REST Framework, and AI/ML integration.

I would like to schedule an interview to discuss a potential opportunity at [Company Name].

Position: [Position Title]
Interview Type: [Virtual/In-person]

Could you please share your availability for the following time slots?

Option 1: [Date & Time]
Option 2: [Date & Time]
Option 3: [Date & Time]

Alternatively, feel free to suggest times that work best for you.

Looking forward to connecting!

Best regards,
[Your Name]
[Your Title]
[Company Name]
[Contact Information]`
};

// General Contact Email Template
export const contactEmailTemplate = {
    subject: "Portfolio Inquiry",
    body: `Hi Nitish,

I came across your portfolio and would like to connect with you regarding [reason for contact].

[Your message here]

Best regards,
[Your Name]
[Your Company/Organization]
[Contact Information]`
};

// Collaboration Request Email Template
export const collaborationEmailTemplate = {
    subject: "Collaboration Proposal",
    body: `Hi Nitish,

I'm reaching out to discuss a potential collaboration opportunity.

Project/Opportunity: [Brief description]
Timeline: [Expected timeline]
Tech Stack: [Technologies involved]

I believe your expertise in backend engineering and AI/ML integration would be a great fit for this project.

Would you be interested in discussing this further?

Best regards,
[Your Name]
[Contact Information]`
};

// Helper function to generate mailto link
export const generateMailtoLink = (email, template) => {
    const encodedSubject = encodeURIComponent(template.subject);
    const encodedBody = encodeURIComponent(template.body);
    return `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
};

// Helper function to generate interview mailto link with custom email
export const generateInterviewLink = (email) => {
    return generateMailtoLink(email, interviewEmailTemplate);
};

// Helper function to generate contact mailto link
export const generateContactLink = (email) => {
    return generateMailtoLink(email, contactEmailTemplate);
};

// Helper function to generate collaboration mailto link
export const generateCollaborationLink = (email) => {
    return generateMailtoLink(email, collaborationEmailTemplate);
};

export default {
    interviewEmailTemplate,
    contactEmailTemplate,
    collaborationEmailTemplate,
    generateMailtoLink,
    generateInterviewLink,
    generateContactLink,
    generateCollaborationLink,
};