import { createCipheriv, randomBytes } from "crypto";

export type EncryptedPayload = {
  iv: string;
  ciphertext: string;
  tag: string;
};

export function generateEncryptionKey(): string {
  return randomBytes(32).toString("base64");
}

export function encrypt(plaintext: string, keyBase64: string): string {
  const key = Buffer.from(keyBase64, "base64");
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintext, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  const payload: EncryptedPayload = {
    iv: iv.toString("base64"),
    ciphertext: encrypted.toString("base64"),
    tag: tag.toString("base64"),
  };

  return JSON.stringify(payload);
}
