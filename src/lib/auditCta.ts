import { START_AUDIT_EVENT } from "../data/audit";

export const startAudit = () => {
  window.dispatchEvent(new Event(START_AUDIT_EVENT));
};

export const startSocialMediaAudit = () => {
  window.dispatchEvent(
    new CustomEvent(START_AUDIT_EVENT, { detail: { target: "social" } }),
  );
};
