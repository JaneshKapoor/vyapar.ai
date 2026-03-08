// S3 is optional — when not configured, files are stored as data URLs instead

let s3Available = false;
let s3Client: import("@aws-sdk/client-s3").S3Client | null = null;

async function getS3Client() {
    if (s3Client) return s3Client;
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
        return null;
    }
    try {
        const { S3Client } = await import("@aws-sdk/client-s3");
        s3Client = new S3Client({
            region: process.env.AWS_REGION || "ap-south-1",
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
        });
        s3Available = true;
        return s3Client;
    } catch {
        return null;
    }
}

const BUCKET = process.env.S3_BUCKET_NAME || "vyapar-ai-assets";

export async function uploadToS3(
    key: string,
    body: Buffer | string,
    contentType: string
): Promise<string> {
    const client = await getS3Client();
    if (!client) {
        // Fallback: return data URL when S3 is not configured
        const buffer = typeof body === "string" ? Buffer.from(body) : body;
        return `data:${contentType};base64,${buffer.toString("base64")}`;
    }

    try {
        const { PutObjectCommand } = await import("@aws-sdk/client-s3");
        await client.send(
            new PutObjectCommand({
                Bucket: BUCKET,
                Key: key,
                Body: typeof body === "string" ? Buffer.from(body) : body,
                ContentType: contentType,
            })
        );
        return `https://${BUCKET}.s3.${process.env.AWS_REGION || "ap-south-1"}.amazonaws.com/${key}`;
    } catch (error) {
        console.error("S3 upload error (falling back to data URL):", error);
        const buffer = typeof body === "string" ? Buffer.from(body) : body;
        return `data:${contentType};base64,${buffer.toString("base64")}`;
    }
}

export async function getFromS3(key: string): Promise<Buffer | null> {
    const client = await getS3Client();
    if (!client) return null;

    try {
        const { GetObjectCommand } = await import("@aws-sdk/client-s3");
        const response = await client.send(
            new GetObjectCommand({
                Bucket: BUCKET,
                Key: key,
            })
        );
        const stream = response.Body;
        if (!stream) return null;
        const chunks: Uint8Array[] = [];
        // @ts-expect-error - stream is a readable
        for await (const chunk of stream) {
            chunks.push(chunk);
        }
        return Buffer.concat(chunks);
    } catch (error) {
        console.error("S3 get error:", error);
        return null;
    }
}
