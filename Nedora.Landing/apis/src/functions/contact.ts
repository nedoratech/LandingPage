import {
  app,
  type HttpRequest,
  type HttpResponseInit,
  type InvocationContext,
} from "@azure/functions";
import { saveContactSubmission } from "../lib/contactRepository";
import { contactPayloadSchema } from "../lib/validation";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

async function contactHandler(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  if (request.method === "OPTIONS") {
    return { status: 204, headers: corsHeaders };
  }

  try {
    const body = (await request.json()) as unknown;
    const parsed = contactPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return {
        status: 400,
        headers: corsHeaders,
        jsonBody: {
          error: "validation_failed",
          details: parsed.error.flatten(),
        },
      };
    }

    if (parsed.data.website) {
      return {
        status: 400,
        headers: corsHeaders,
        jsonBody: { error: "invalid_request" },
      };
    }

    const entity = await saveContactSubmission(parsed.data);
    context.log(
      `Contact submission stored: ${entity.partitionKey}/${entity.rowKey}`,
    );

    return {
      status: 201,
      headers: corsHeaders,
      jsonBody: {
        id: entity.submissionId,
        createdAt: entity.createdAt,
      },
    };
  } catch (error) {
    context.error("Contact submission failed", error);
    return {
      status: 500,
      headers: corsHeaders,
      jsonBody: { error: "internal_error" },
    };
  }
}

app.http("contact", {
  methods: ["POST", "OPTIONS"],
  authLevel: "anonymous",
  route: "contact",
  handler: contactHandler,
});
