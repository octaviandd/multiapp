/** @format */

import { PrismaClient } from "@prisma/client";
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "database_url";

const client = new SecretsManagerClient({
  region: "eu-west-2",
});

let response : any = null;

(async () => {
  try {
    response = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );
  } catch (error) {
    throw error;
  }
})();

const secret = response?.SecretString;

const prisma = new PrismaClient({
  log: ["info", "warn", "error"],
  datasourceUrl: secret
});

export default prisma;
