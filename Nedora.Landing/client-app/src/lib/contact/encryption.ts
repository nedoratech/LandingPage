import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

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

export function decrypt(encryptedJson: string, keyBase64: string): string {
  const payload = JSON.parse(encryptedJson) as EncryptedPayload;
  const key = Buffer.from(keyBase64, "base64");
  const iv = Buffer.from(payload.iv, "base64");
  const ciphertext = Buffer.from(payload.ciphertext, "base64");
  const tag = Buffer.from(payload.tag, "base64");
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString(
    "utf8",
  );
}
