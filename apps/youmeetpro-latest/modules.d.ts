declare module "@youmeet/i18n/index";

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
