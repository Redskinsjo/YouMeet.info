const monthMapping = {
  0: { en: "Jan.", fr: "Jan." },
  1: { en: "Feb.", fr: "Fév." },
  2: { en: "Mar.", fr: "Mar." },
  3: { en: "Apr.", fr: "Avr." },
  4: { en: "May.", fr: "Mai." },
  5: { en: "Jun.", fr: "Jui." },
  6: { en: "Jul.", fr: "Juil." },
  7: { en: "Aug.", fr: "Aoû." },
  8: { en: "Sep.", fr: "Sep." },
  9: { en: "Oct.", fr: "Oct." },
  10: { en: "Nov.", fr: "Nov." },
  11: { en: "Dec.", fr: "Déc." },
};

const weekDayMapping = {
  0: { en: "Mon.", fr: "Lun." },
  1: { en: "Tue.", fr: "Mar." },
  2: { en: "Wed.", fr: "Mer." },
  3: { en: "Thu.", fr: "Jeu." },
  4: { en: "Fri.", fr: "Ven." },
  5: { en: "Sat.", fr: "Sam." },
  6: { en: "Sun.", fr: "Dim." },
};

export const formatToSimpleDate = (dateStr: string, hour?: string) => {
  const time = hour?.split(":");
  if (time) {
    const hourSet = new Date(dateStr).setHours(
      time[0].length === 1 ? Number(`0${time[0]}`) : Number(time[0])
    );

    const minutesSet = new Date(hourSet).setMinutes(
      time[1].length === 1 ? Number(`0${time[1]}`) : Number(time[1])
    );

    return new Date(minutesSet);
  } else {
    const date = new Date(dateStr);
    return date;
  }
};

export const formatToDatetime = (
  dateStr: string | Date | undefined | null,
  noHour?: boolean,
  noWeekDay?: boolean,
  noDay?: boolean,
  locale: string = "fr"
) => {
  const date =
    typeof dateStr === "string"
      ? new Date(dateStr)
      : typeof dateStr === "object"
      ? dateStr
      : new Date();
  if (date) {
    const year = date.getFullYear();
    const month = (monthMapping as any)[date.getMonth()]
      ? (monthMapping as any)[date.getMonth()][locale]
      : "Dec.";
    const day = date.getDate();
    const weekDay = (weekDayMapping as any)[date.getDay() - 1]
      ? (weekDayMapping as any)[date.getDay() - 1][locale]
      : "Ven.";
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const min =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return `${noWeekDay ? "" : weekDay} ${noDay ? "" : day} ${month} ${year}${
      noHour ? `` : ` - ${hour}:${min}`
    }`;
  }
  return "";
};

export const giveTimeAgo = (dateStr: Date) => {
  const fix = (num: number, amount: number) => Number(num.toFixed(amount));
  const nowMs = new Date().getTime();
  const dateMs = new Date(dateStr).getTime();
  const diff = nowMs - dateMs;

  const calculatedS = fix(diff / 1000, 0);
  const calculatedMin = fix(diff / 1000 / 60, 0);
  const calculatedH = fix(diff / 1000 / 3600, 0);
  const calculatedD = fix(
    diff > 0
      ? Math.floor(diff / 1000 / 3600 / 24)
      : Math.ceil(diff / 1000 / 3600 / 24),
    0
  );
  const calculatedMon = fix(
    diff > 0
      ? Math.floor(diff / 1000 / 3600 / 24 / 30)
      : Math.ceil(diff / 1000 / 3600 / 24 / 30),
    0
  );
  const calculatedY = fix(
    diff > 0
      ? Math.floor(diff / 1000 / 3600 / 24 / 365)
      : Math.ceil(diff / 1000 / 3600 / 24 / 365),
    0
  );

  if (calculatedY >= 1) {
    return `il y a ${calculatedY} année(s) `;
  }
  if (calculatedY < 1) {
    if (calculatedMon > 0) {
      return `il y a ${calculatedMon} mois`;
    }
  }
  if (calculatedMon < 1) {
    if (calculatedD > 0) {
      return `il y a ${calculatedD} jour(s)`;
    }
  }
  if (calculatedD < 1) {
    if (calculatedH > 0) {
      return `il y a ${calculatedH} heure(s)`;
    }
  }
  if (calculatedH < 1) {
    if (calculatedMin > 0) {
      return `il y a ${calculatedMin} minute(s)`;
    }
  }
  if (calculatedMin < 1) {
    if (calculatedS > 0) {
      return `il y a ${calculatedS} seconde(s)`;
    }
  }

  if (calculatedY < -1) {
    return `dans ${Math.abs(calculatedY)} année(s) `;
  }
  if (calculatedY > -1) {
    if (calculatedMon > -12 && calculatedMon < 0) {
      return `dans ${Math.abs(calculatedMon)} mois`;
    }
  }
  if (calculatedMon > -1) {
    if (calculatedD > -31 && calculatedD < 0) {
      return `dans ${Math.abs(calculatedD)} jour(s)`;
    }
  }
  if (calculatedD > -1) {
    if (calculatedH > -24 && calculatedH < 0) {
      return `dans ${Math.abs(calculatedH)} heure(s)`;
    }
  }
  if (calculatedH > -1) {
    if (calculatedMin > 60 && calculatedMin < 0) {
      return `dans ${Math.abs(calculatedMin)} minute(s)`;
    }
  }
  if (calculatedMin > -1) {
    if (calculatedS > -60 && calculatedS < 0) {
      return `dans ${Math.abs(calculatedS)} seconde(s)`;
    }
  }

  return "";
};
