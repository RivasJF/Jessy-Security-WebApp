import { describe, expect, it } from "vitest";
import { generateSalt, hashPassword } from "../../Shared/Encoder/hash";

describe("Hash", () => {
  it("should generate a salt", () => {
    const salt = generateSalt();
    expect(salt).toBeInstanceOf(Uint8Array);
    expect(salt.length).toBe(32);
  });

  it("should hash a string correctly", async () => {
    const password = "mySecurePassword";
    const salt = generateSalt();
    await hashPassword(password, salt).then((hash) => {
      expect(hash).toBeDefined();
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
      expect(hash).not.toEqual(password);
    });
  });
})