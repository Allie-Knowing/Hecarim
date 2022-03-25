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

const calcPxByPercent = (fontSize: number, percent: number): string => {
  return `${fontSize * 1.2 * (percent / 100)}px`;
};

const h1LineHeight = calcPxByPercent(32, 130);
const h2LineHeight = calcPxByPercent(28, 130);
const h3LineHeight = calcPxByPercent(24, 130);
const subtitleLineHeight = calcPxByPercent(20, 130);
const bodyLineHeight = calcPxByPercent(16, 130);
const d1LineHeight = calcPxByPercent(14, 130);
const d2LineHeight = calcPxByPercent(12, 130);

const fonts: Font = {
  h1: `normal normal 32px 'SpoqaHanSansNeo-Bold'; line-height: ${h1LineHeight}`,
  h2: `normal normal 28px 'SpoqaHanSansNeo-Bold'; line-height: ${h2LineHeight}`,
  h3: `normal normal 24px 'SpoqaHanSansNeo-Bold'; line-height: ${h3LineHeight}`,
  subtitle1: `normal normal bold 20px 'SpoqaHanSansNeo-Medium'; line-height: ${subtitleLineHeight}`,
  subtitle2: `normal normal 500 20px 'SpoqaHanSansNeo-Medium'; line-height: ${subtitleLineHeight}`,
  body1: `normal normal bold 16px 'SpoqaHanSansNeo-Bold'; line-height: ${bodyLineHeight}`,
  body2: `normal normal 500 16px 'SpoqaHanSansNeo-Medium'; line-height: ${bodyLineHeight}`,
  body3: `normal normal 400 16px 'SpoqaHanSansNeo-Regular'; line-height: ${bodyLineHeight}`,
  description1: `normal normal 400 14px 'SpoqaHanSansNeo-Regular'; line-height: ${d1LineHeight}`,
  description2: `normal normal 400 12px 'SpoqaHanSansNeo-Regular'; line-height: ${d2LineHeight}`,
};

export interface Theme {
  colors: Color;
  fonts: Font;
}

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

const theme: Theme = {
  colors,
  fonts,
};

export default theme;
