import { describe, expect, it } from "vitest";
import { demoPersonas } from "./roles";

describe("demoPersonas", () => {
  it("uses fictional example domains", () => {
    for (const persona of demoPersonas) {
      expect(persona.email).toMatch(/@(?:[\w.-]+\.)?example(?:\.com)?$/);
    }
  });
});
