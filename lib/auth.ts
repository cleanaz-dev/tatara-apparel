import { betterAuth } from "better-auth";
import { dash } from "@better-auth/infra";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // 1. Allow incoming requests from your root domains and subdomains
  baseURL: {
    allowedHosts: [
      "localhost:3000",
      "lvh.me:3000",
      "*.lvh.me:3000",
      "tatara-apparel.vercel.app",
      "*.tatara-apparel.vercel.app",
    ],
  },

  // 2. Enable sharing session cookies between main domain and subdomains
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
  },

  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CONSUMER",
        input: false,
      },
    },
  },
  plugins: [
    dash(),
  ],
});