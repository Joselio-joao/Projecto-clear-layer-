import { describe, expect, it } from "vitest";
import { CLEARLAYER_DB_NAME, CLEARLAYER_DB_VERSION, CLEARLAYER_STORE_NAME } from "./clearLayerDb";

describe("ClearLayer local database", () => {
  it("uses a private versioned dossier store", () => {
    expect(CLEARLAYER_DB_NAME).toBe("clearlayer-local");
    expect(CLEARLAYER_DB_VERSION).toBe(1);
    expect(CLEARLAYER_STORE_NAME).toBe("dossier-state");
  });
});
