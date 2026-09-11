import * as React from "react";

interface EmailTemplateProps {
  fullName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  message,
}) => (
  <div
    style={{
      fontFamily: "Arial, Helvetica, sans-serif",
      maxWidth: "600px",
      color: "#111827",
    }}
  >
    <h2 style={{ margin: "0 0 8px" }}>New portfolio inquiry</h2>
    <p style={{ margin: "0 0 16px", color: "#4b5563" }}>
      <strong>{fullName}</strong> ({email}) sent you a message from
      adewunmilab.podsystem.ng. Reply directly to this email to respond.
    </p>
    <div
      style={{
        backgroundColor: "#f3f4f6",
        borderLeft: "4px solid #2563eb",
        padding: "12px 16px",
        whiteSpace: "pre-line",
      }}
    >
      {message}
    </div>
  </div>
);
