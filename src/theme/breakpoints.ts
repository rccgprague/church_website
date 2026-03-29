export const BREAKPOINTS = {
    xs: 375,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1440,
  };
  
  export const mediaBreakpointUp = (min: number, content: any) => `
        @media (min-width: ${min}px) {
            ${content}
        }
    `;
  
  export const mediaBreakpointDown = (max: number, content: any) => `
        @media (max-width: ${max}px) {
            ${content}
        }
    `;
  
  export const mediaBreakpointBetween = (
    min: number,
    max: number,
    content: any
  ) => `
        @media (min-width: ${min}px) and (max-width: ${max}px) {
            ${content}
        }
    `;