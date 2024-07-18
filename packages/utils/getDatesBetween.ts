import { ProfileView } from "@youmeet/gql/generated";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";

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

type TooltipData = AppleStock;

export const getStockFromViews = (
  dates: { date: string }[],
  profileViews: ProfileView[],
): TooltipData[] => {
  let stock = [];
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i].date;
    let result = { date } as { date: string; close: number };

    if (profileViews.length > 0) {
      for (let j = 0; j < profileViews.length; j++) {
        const view = profileViews[j];
        if (view.createdAt) {
          if (isSameDay(new Date(view.createdAt), new Date(date))) {
            result.close =
              (view.count as number) * getMultiplyingRatio(profileViews);
          }
        }
      }
    }

    if (!result.close) result.close = 0;

    stock.push(result);
  }

  return stock;
};
