interface Font {
  h1: string;
  h2: string;
  h3: string;
  subtitle1: string;
  subtitle2: string;
  body1: string;
  body2: string;
  body3: string;
  description1: string;
  description2: string;
}

const fonts: Font = {
  h1: `bold 2rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
  h2: `bold 1.75rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
  h3: `bold 1.5rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
  subtitle1: `bold 1.25rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
  subtitle2: `500 1.25rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
  body1: `bold 1rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
  body2: `500 1rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
  body3: `400 1rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
  description1: `400 0.875rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
  description2: `400 0.75rem/130% 'Spoqa Han Sans Neo', 'sans-serif'`,
};

export {};
