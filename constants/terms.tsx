import Link from "next/link";

export const effectiveDate = "March 1, 2024";
export const lastUpdated = "March 1, 2024";

export const sections = [
  {
    title: "1. Company Information",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-medium text-[#C8EA80]">Legal Name:</span> Links Hub
          </li>
          <li>
            <span className="font-medium text-[#C8EA80]">Registration:</span> Links Hub is a registered entity.
          </li>
          <li>
            <span className="font-medium text-[#C8EA80]">Address:</span> No physical address available.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "2. Services Provided",
    content: (
      <div className="space-y-4">
        <p>
          Links Hub is an open-source link management platform designed to help users organize, share, and manage links efficiently. We offer both free and premium features.
        </p>

        <h4 className="text-lg font-semibold text-[#2EF2FF] mt-4">Premium Features</h4>
        <p>Users who subscribe to a paid plan gain access to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-medium text-[#C8EA80]">Email Marketing Tools</span> – Send newsletters and link updates.
          </li>
          <li>
            <span className="font-medium text-[#C8EA80]">Spotify Integration</span> – Embed and manage music links seamlessly.
          </li>
          <li>
            <span className="font-medium text-[#C8EA80]">Call-to-Action (CTA) Buttons</span> – Customizable buttons for better user engagement.
          </li>
          <li>
            <span className="font-medium text-[#C8EA80]">Accent Themes & Premium Designs</span> – Exclusive themes for premium users.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "3. User Requirements",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-medium text-[#C8EA80]">Minimum Age Requirement:</span> Users must be at least{" "}
            <span className="font-bold text-[#2EF2FF]">13 years old</span> to use Links Hub.
          </li>
          <li>
            <span className="font-medium text-[#C8EA80]">Account Restrictions:</span> No strict account restrictions; however, users must comply with our acceptable use policy.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "4. Legal Framework",
    content: (
      <div className="space-y-3">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <span className="font-medium text-[#C8EA80]">License:</span> Links Hub is open-source and licensed under the <span className="font-medium text-[#2EF2FF]">Apache License 2.0</span>.
          </li>
          <li>
            <span className="font-medium text-[#C8EA80]">Governing Law:</span> These Terms are governed by the applicable laws of the jurisdiction where Links Hub is registered.
          </li>
          <li>
            <span className="font-medium text-[#C8EA80]">Privacy Policy:</span>{" "}
            <Link href="/privacy" className="text-[#2EF2FF] hover:underline">
              View our Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "5. Contact Information",
    content: (
      <div className="space-y-3">
        <p>For legal inquiries or support, please contact us at:</p>
        <p className="font-medium text-[#2EF2FF]">
          Email:{" "}
          <a href="mailto:helpdesk@linkshub.space" className="hover:underline">
            helpdesk@linkshub.space
          </a>
        </p>
      </div>
    ),
  },
];
export const summaryItems = [
  {
    title: "Your Data & Privacy",
    description: "We collect and use your data in accordance with our Privacy Policy. You have control over your information."
  },
  {
    title: "Account Responsibilities",
    description: "You are responsible for maintaining the security of your account and complying with our terms."
  },
  {
    title: "Usage Restrictions",
    description: "You may not use our service for illegal activities or violate any applicable laws."
  },
  {
    title: "Content Ownership",
    description: "You retain ownership of your content, but grant us a license to use it for providing our services."
  },
  {
    title: "Changes to Terms",
    description: "We may update our terms from time to time, and we will notify you of significant changes."
  },
  {
    title: "Termination Rights",
    description: "We reserve the right to suspend or terminate accounts that violate our policies."
  }
]
