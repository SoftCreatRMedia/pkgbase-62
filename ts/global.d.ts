declare module "*.css";

interface JQueryStatic {
  (...args: unknown[]): JQuery;
}

declare namespace google {
  namespace maps {
    class Geocoder {}

    class Map {}
  }
}
