export const up = (str: string) => str.toUpperCase();
export const low = (str: string) => str.toLowerCase();

export const join = (fullname: string) => {
  return fullname
    .split(" ")
    .map((name) => low(name))
    .join(".");
};

export const split = (fullname: string, delimitor: string) => {
  return fullname
    .split(delimitor)
    .map((name) => up(name[0]) + low(name.slice(1)))
    .join(" ");
};

export const fromNames = (firstname: string, lastname: string) => {
  return firstname && lastname
    ? up(firstname[0]) +
        low(firstname.slice(1)) +
        " " +
        up(lastname[0]) +
        low(lastname.slice(1))
    : "";
};

export const fromFullname = (fullname: string) => {
  return fullname.split(" ").reduce(
    (acc, curr, index) => {
      if (index === 0) {
        acc.firstname = curr;
        return acc;
      }
      if (index === 1) {
        acc.lastname = curr;
        return acc;
      }
      acc.lastname = acc.lastname + " " + curr;
      return acc;
    },
    {} as { firstname: string; lastname: string },
  );
};

export const setUpCase = (name: string) =>
  name.includes(" ") ? split(name, " ") : up(name[0]) + low(name.slice(1));

export const firstnameOf = (fullname: string) => fullname.split(" ")[0];
