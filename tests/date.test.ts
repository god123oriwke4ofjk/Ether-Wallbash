import { TESTING } from "../src/Date";

describe("getDate", () => {
  it("spits out the date in the correct format", () => {
    const result = TESTING.getDate();
    console.log(result); // Keep the log if needed for debugging
    expect(result).toHaveProperty("day");
    expect(result).toHaveProperty("formattedDate");
    expect(typeof result.day).toBe("string");
    expect(typeof result.formattedDate).toBe("string");
    expect(result.day.length).toBe(3); // e.g., "Mon"
  });
});