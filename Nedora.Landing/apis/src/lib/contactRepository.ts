import { TableClient } from "@azure/data-tables";
import type { ContactPayload } from "./validation";
import { buildTableKeys, type TableKeys } from "./tableKeys";

export type ContactSubmissionEntity = ContactPayload &
  TableKeys & {
    status: "new";
    emailDomain: string;
  };

function getTableClient(): TableClient {
  const connectionString = process.env.TABLE_STORAGE_CONNECTION_STRING;
  const tableName = process.env.CONTACT_TABLE_NAME ?? "ContactSubmissions";

  if (!connectionString) {
    throw new Error("TABLE_STORAGE_CONNECTION_STRING is not configured.");
  }

  return TableClient.fromConnectionString(connectionString, tableName);
}

function emailDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase() ?? "unknown";
}

export async function saveContactSubmission(
  payload: ContactPayload,
): Promise<ContactSubmissionEntity> {
  const keys = buildTableKeys();
  const entity: ContactSubmissionEntity = {
    partitionKey: keys.partitionKey,
    rowKey: keys.rowKey,
    submissionId: keys.submissionId,
    createdAt: keys.createdAt,
    status: "new",
    emailDomain: emailDomain(payload.email),
    ...payload,
  };

  const client = getTableClient();
  await client.createEntity({
    partitionKey: entity.partitionKey,
    rowKey: entity.rowKey,
    submissionId: entity.submissionId,
    createdAt: entity.createdAt,
    status: entity.status,
    name: entity.name,
    email: entity.email,
    emailDomain: entity.emailDomain,
    company: entity.company,
    projectType: entity.projectType,
    engagement: entity.engagement,
    message: entity.message,
    timeline: entity.timeline ?? null,
    locale: entity.locale ?? null,
  });

  return entity;
}
