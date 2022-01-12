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

interface Color {
  background: string;
  primary: {
    default: string;
    click: string;
    opacity38: string;
    opacity28: string;
    opacity17: string;
    opacity7: string;
  };
  red: {
    default: string;
    click: string;
  };
  grayscale: {
    scale10: string;
    scale20: string;
    scale30: string;
    scale40: string;
    scale50: string;
    scale60: string;
    scale70: string;
    scale80: string;
    scale90: string;
    scale100: string;
  };
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

const colors: Color = {
  background: "#F3F2F7",
  primary: {
    default: "#7366EF",
    click: "#5B50BD",
    opacity38: "#9D94EF",
    opacity28: "#B3ACEF",
    opacity17: "#CAC6EF",
    opacity7: "#E0DEEF",
  },
  red: {
    default: "#F85555",
    click: "#C44343",
  },
  grayscale: {
    scale10: "#FFFFFF",
    scale20: "#EEEDF2",
    scale30: "#C9C8CF",
    scale40: "#B0B0B5",
    scale50: "#97979C",
    scale60: "#7F7E82",
    scale70: "#666569",
    scale80: "#4D4D4F",
    scale90: "#313036",
    scale100: "#17171C",
  },
};

export {};
