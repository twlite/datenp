import { DateUtils } from "./utils/DateUtils";

export type DateLike = Date | string | number;

export class DateNP {
    public readonly epoch = new Date("1919-04-13");
    public utils = new DateUtils();
    public current: Date;

    public constructor(current: DateLike = new Date()) {
        if (typeof current === "number" || current instanceof Date) {
            this.current = new Date(current);
        } else if (typeof current === "string") {
            const separator = this.utils.getSeparator(current);
            if (!separator) throw new TypeError("invalid date separator");

            const [year, month, day] = current.split(separator).map(Number);
            if ([year, month, day].some((x) => Number.isNaN(x))) throw new TypeError("invalid date");

            let diff = 0;

            for (const yearVal of this.utils) {
                if (yearVal.year === year - 1) {
                    diff += Object.values(yearVal.months)
                        .filter((_, i) => i < month - 1)
                        .reduce((a, c) => a + c, 0);
                    diff += day < 0 ? 0 : day - 1;
                    break;
                } else {
                    diff += Object.values(yearVal.months).reduce((a, c) => a + c, 0);
                }
            }

            const npd = new Date(this.epoch);
            npd.setDate(npd.getDate() + diff);

            this.current = npd;
        } else {
            throw new TypeError("unsupported date");
        }
    }

    public getTotalDays() {
        const bs = this.toBS();
        return Object.values(this.utils.getYear(bs.year).months).find((_, i) => i === bs.month - 1) || -1;
    }

    public getDay() {
        return this.current.getDay();
    }

    public getMonth() {
        return this.toBS().month - 1;
    }

    public getMonthName(nepali = false) {
        return (!nepali ? Object.keys : Object.values)(this.utils.months)[this.getMonth()];
    }

    public getMonthNameAD() {
        return this.utils.adMonths[this.current.getMonth()];
    }

    public getDayName(nepali = false) {
        return (!nepali ? Object.keys : Object.values)(this.utils.weekDays)[this.getDay()];
    }

    public getTime() {
        return this.current.getTime();
    }

    public static now() {
        return Date.now();
    }

    public isLeapYear(year?: number) {
        return this.utils.leapYears.includes(year || this.toBS().year);
    }

    public toString() {
        const bs = this.toBS();
        return `${bs.year}/${bs.month}/${bs.day} ${this.getDayName(true)}`;
    }

    public toLocaleString() {
        const bs = this.toBS();
        return `${`${bs.year}/${bs.month}/${bs.day}`
            .split("")
            .map((m) => this.utils.numbers.find((x) => x.english === m)?.nepali || m)
            .join("")} ${this.getDayName(false)}`;
    }

    public toJSON() {
        return this.toString();
    }

    public valueOf() {
        return this.getTime();
    }

    public elapsed(current = this.current) {
        return Math.floor((current.getTime() - this.epoch.getTime()) / 864e5);
    }

    public toAD() {
        return { year: this.current.getFullYear(), month: this.current.getMonth() + 1, day: this.current.getDate() };
    }

    public toBS() {
        const diff = this.elapsed();
        let totalDays = 0;
        for (const date of this.utils) {
            const months = Object.values(date.months);
            for (let i = 0; i < months.length; i++) {
                totalDays += months[i];

                if (diff - totalDays < 0) {
                    const currentDay = diff - totalDays + months[i] + 2;
                    const currentYear = date.year + 1;
                    const currentMonth = i + 1;

                    return { year: currentYear, month: currentMonth, day: currentDay };
                }
            }
        }
    }
}
