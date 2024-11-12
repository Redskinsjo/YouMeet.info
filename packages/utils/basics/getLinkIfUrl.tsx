import Link from "next/link";

const getLinkIfUrl = (input: any) => {
  const regex = /^(http|https):\/\/[^ "]+$/;
  const urlUntilSlash = /^(http|https):\/\/[^\/]+/;
  if (typeof input === "string") {
    const isUrl = regex.test(input);
    if (isUrl) {
      const matched = input.match(regex);

      if (matched) {
        const href = matched[0];

        const matched2 = href.match(urlUntilSlash);
        if (matched2) {
          const label = matched2[0];
          return (
            <Link target="_blank" href={href}>
              {label}
            </Link>
          );
        }
      }
      return undefined;
    }
  }
  return input;
};

export default getLinkIfUrl;
