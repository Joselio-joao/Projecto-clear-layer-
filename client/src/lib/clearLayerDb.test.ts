import { describe, expect, it } from "vitest";
import { CLEARLAYER_DB_NAME, CLEARLAYER_DB_VERSION, CLEARLAYER_STORE_NAME, type DossierState } from "./clearLayerDb";

describe("ClearLayer local database", () => {
  it("uses a private versioned dossier store", () => {
    expect(CLEARLAYER_DB_NAME).toBe("clearlayer-local");
    expect(CLEARLAYER_DB_VERSION).toBe(2);
    expect(CLEARLAYER_STORE_NAME).toBe("dossier-state");
    const preference: DossierState = { lastProfile: "rimless", productVersion: "V1", viewMode: "technical", updatedAt: 0 };
    expect(preference.productVersion).toBe("V1");
    expect(preference.viewMode).toBe("technical");
  });
});
