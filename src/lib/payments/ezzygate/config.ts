import { EzzygateConfig } from "./types";

export const ezzygateConfig: EzzygateConfig = {
  get merchantNumber(): string {
    return process.env.EZZYGATE_MERCHANT_NUMBER || "2203441";
  },
  get hashKey(): string {
    return process.env.EZZYGATE_HASH_KEY || "2RN9TLWP52";
  },
  get securityKey(): string {
    return process.env.EZZYGATE_SECURITY_KEY || process.env.EZZYGATE_HASH_KEY || "2RN9TLWP52";
  },
};
