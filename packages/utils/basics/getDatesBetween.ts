import { ProfileView } from "@youmeet/gql/generated";

export const getDatesBetween = (startDate: Date, today: Date) => {
  let countingDate = startDate.getTime();

  let dates = [];
  while (today.getTime() > countingDate) {
    dates.push({ date: new Date(countingDate).toISOString() });
    countingDate += 1000 * 3600 * 24;
  }

  dates.push({ date: today.toISOString() });
  return dates;
};

export const isSameDay = (a: Date, b: Date) => {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

export const getMultiplyingRatio = (views: ProfileView[]) => {
  const max = Math.max(...views.map((view) => view.count as number));
  if (max >= 0) {
    const ratio = Math.floor((300 / max) * 0.67);
    return ratio;
  }
  return 1;
};

export const getStockFromViews = (
  dates: { date: string }[],
  profileViews: ProfileView[]
): { date: string; views: number }[] => {
  let stock: { date: string; views: number }[] = [];
  for (let i = 0; i < dates.length; i++) {
    const o = dates[i];
    const date = new Date(dates[i].date);

    if (profileViews.length > 0) {
      for (let j = 0; j < profileViews.length; j++) {
        const view = profileViews[j];
        const viewDate = new Date(view.createdAt);

        let payload: { date: string; views: number } = {
          date: o.date,
          views: 0,
        };
        if (view.createdAt) {
          if (isSameDay(date, viewDate)) {
            const exist = stock.find((item) => item.date === o.date);

            if (view.count) {
              payload = { date: o.date, views: view.count };
              if (exist) {
                payload = { date: o.date, views: view.count + exist.views };
              }
            }
          }
        }
        stock.push(payload);
      }
    }
  }

  return stock;
};
