// @ts-nocheck
import BsDate from "./data.ts";

export class DateUtils {
    private leapYearsCache: number[] = [];
    private yearsCache: number[] = [];

    public get leapYears() {
        if (this.leapYearsCache.length) return this.leapYearsCache;

        for (const [year, months] of Object.entries(BsDate)) {
            const totalDays = Object.values(months).reduce((a, c) => a + c, 0);
            if (totalDays === 366) this.leapYearsCache.push(parseInt(year));
        }

        return this.leapYearsCache;
    }

    public get numbers() {
        return Array.from({ length: 10 }, (_, i) => ({
            nepali: String.fromCharCode(i + 2406),
            english: `${i}`
        }));
    }

    public get weekDays() {
        return {
            Sunday: "आइतवार",
            Monday: "सोमवार",
            Tuesday: "मंगलवार",
            Wednesday: "बुधवार",
            Thursday: "बिहिवार",
            Friday: "शुक्रवार",
            Saturday: "शनिवार"
        };
    }

    public get months() {
        return {
            Baishakh: "बैशाख",
            Jestha: "जेठ",
            Ashadh: "असार",
            Shrawan: "श्रावण",
            Bhadra: "भदौ",
            Ashoj: "असोज",
            Kartik: "कार्तिक",
            Mangsir: "मंसिर",
            Poush: "पुष",
            Magh: "माघ",
            Falgun: "फाल्गुन",
            Chaitra: "चैत्र"
        };
    }

    public get adMonths() {
        return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    }

    public get raw() {
        return BsDate;
    }

    public validateYear(year: string | number) {
        const entries = this.yearsCache.length ? this.yearsCache : (this.yearsCache = Object.keys(BsDate).map(Number));
        if (!entries.some((x) => x == year)) {
            throw new RangeError(`Year range must be in between ${entries[0]}-${entries[entries.length - 1]}`);
        }
    }

    public getYear(year: string | number) {
        this.validateYear(year);
        const foundYear = BsDate[`${year}` as keyof typeof BsDate];

        return { year, months: foundYear };
    }

    public getSeparator(str: string) {
        if (str.indexOf("-") >= 0) return "-";
        if (str.indexOf("/") >= 0) return "/";
        if (str.indexOf(".") >= 0) return ".";
        return null;
    }

    public *[Symbol.iterator]() {
        yield* Object.entries(BsDate).map((m) => ({ year: parseInt(m[0]), months: m[1] }));
    }
}
