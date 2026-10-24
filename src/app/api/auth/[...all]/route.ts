import { getAuth } from "@/server/auth/auth";

const handler = getAuth().handler;

export const GET = handler;
export const POST = handler;
