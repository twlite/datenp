import { DateNP } from "../src/DateNP";

describe("Nepali Date Conversion", () => {
    const now = new Date("2022/01/06");

    const fromAD = new DateNP(now);
    const fromBS = new DateNP("2078/09/22");

    test("2022/01/06 should be 2078/09/22", () => {
        expect(fromAD.toBS()).toStrictEqual({ year: 2078, month: 9, day: 22 });
    });

    test("2078/09/22 should be 2022/01/06", () => {
        expect(fromBS.toAD()).toStrictEqual({ year: 2022, month: 1, day: 6 });
    });
});