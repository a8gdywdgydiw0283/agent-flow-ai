const RESPONSE_PRIORITY_KEYS = [
  "output",
  "message",
  "response",
  "text",
  "content",
  "reply",
  "answer",
] as const;

const RESPONSE_CONTAINER_KEYS = ["data", "result", "results", "body", "payload"] as const;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const extractReply = (value: unknown): string => {
  if (isNonEmptyString(value)) {
    return value.trim();
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const reply = extractReply(item);
      if (reply) return reply;
    }
    return "";
  }

  if (!value || typeof value !== "object") {
    return "";
  }

  const record = value as Record<string, unknown>;

  for (const key of RESPONSE_PRIORITY_KEYS) {
    const reply = extractReply(record[key]);
    if (reply) return reply;
  }

  for (const key of RESPONSE_CONTAINER_KEYS) {
    const reply = extractReply(record[key]);
    if (reply) return reply;
  }

  for (const nestedValue of Object.values(record)) {
    const reply = extractReply(nestedValue);
    if (reply) return reply;
  }

  return "";
};

export const parseWebhookReply = async (response: Response): Promise<string> => {
  const rawText = (await response.text()).trim();

  if (!response.ok) {
    throw new Error(`Webhook request failed with status ${response.status}`);
  }

  if (!rawText) {
    return "";
  }

  try {
    return extractReply(JSON.parse(rawText));
  } catch {
    return rawText;
  }
};