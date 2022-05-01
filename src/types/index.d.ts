declare module "*.jpg";
declare module "*.svg";
declare module "*.png" {
  const value: any;
  export default value;
}
