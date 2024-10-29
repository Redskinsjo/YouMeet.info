declare module "@youmeet/i18n/index";

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "@youmeet/gql/schema";
declare module "@youmeet/competencies-api-schema";
declare module "@youmeet/competencies/resolvers";
