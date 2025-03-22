const regex = new RegExp(
  /[a-zA-Z0-9\._-]{3,}@gmail|aol|yahoo|outlook|hotmail|protonmail|mail|yandex|zoho|gmx\.[a-z]{2,}/gm
);

export const personalRegex = new RegExp(/jonathan.carnos@gmail.com/gim);

export const isProfessionalEmail = (email: string) => {
  return !regex.test(email) || personalRegex.test(email);
};
