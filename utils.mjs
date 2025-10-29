import crypto from "node:crypto";

function generateSecureRandomString(length) {
  const bufferLength = Math.ceil(length / 2);
  return crypto.randomBytes(bufferLength).toString("hex").slice(0, length);
}

export { generateSecureRandomString };
