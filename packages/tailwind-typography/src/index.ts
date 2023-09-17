import plugin from 'tailwindcss/plugin'

function isPlainObject(x: unknown): x is Record<string, unknown> {
  return (
    typeof x === 'object' &&
    x?.constructor === Object &&
    Object.getPrototypeOf(x) === Object.prototype
  )
}

export const buildTypographyVariant = (
  fontFamily: string,
  fontWeight: number,
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
  other?: Record<string, unknown>,
) => ({
  fontFamily,
  fontWeight,
  fontSize,
  // Unit-less following http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
  lineHeight,
  letterSpacing: `${letterSpacing}em`,
  ...other,
})

export function fluidValue(
  minFontSize: number,
  maxFontSize: number,
  minViewport: number,
  maxViewport: number,
  unit = 'px',
  clampMin = false,
  clampMax = false,
) {
  // Set up the fluid formula.
  const deltaFontSize = maxFontSize - minFontSize
  const deltaViewport = maxViewport - minViewport
  const fluidFontSize = `calc(${minFontSize}${unit} + ${deltaFontSize} * ((100vw - ${minViewport}${unit}) / ${deltaViewport}))`

  // Clamp fontSize values if enabled.
  if (clampMin && clampMax) {
    return `clamp(${minFontSize}${unit}, ${fluidFontSize}, ${maxFontSize}${unit})`
  }
  if (clampMin) {
    return `max(${minFontSize}${unit}, ${fluidFontSize})`
  }
  if (clampMax) {
    return `min(${minFontSize}${unit}, ${fluidFontSize})`
  }
  return fluidFontSize
}

export interface TypographyOptionsVariant {
  fontSize: number
  [key: string]: string | number
}

export type TypographyOptionsVariantMap<TKeys extends readonly [string, ...string[]]> = {
  clamp?: boolean
  clampMax?: boolean
  clampMin?: boolean
  fluid?: boolean
} & {
  [key in TKeys[number]]?: TypographyOptionsVariant
} & {
  [key in TKeys[0]]-?: TypographyOptionsVariant
}

export type TypographyOptionsVariants<TKeys extends readonly [string, ...string[]]> = Record<
  string,
  TypographyOptionsVariant | TypographyOptionsVariantMap<TKeys>
>

export type TypographyReturnVariant = Record<string, string>
export type TypographyReturnVariantMap = Record<string, TypographyReturnVariant>
export type TypographyReturnVariants = Record<
  string,
  TypographyReturnVariant | TypographyReturnVariantMap
>

export interface TypographyOptions<
  TKeys extends readonly [string, ...string[]] = readonly ['xs', 'sm', 'md', 'lg', 'xl'],
> {
  breakpointKeys?: TKeys
  clamp?: boolean
  clampMax?: boolean
  clampMin?: boolean
  fluid?: boolean
  prefix?: string
  unit?: string
  variants: TypographyOptionsVariants<TKeys>
}

export const typography = plugin.withOptions((options: TypographyOptions) => {
  const {
    breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl'],
    clamp: globalClamp = false,
    clampMax: globalClampMax = globalClamp,
    clampMin: globalClampMin = globalClamp,
    fluid: globalFluid = false,
    prefix = '',
    unit = 'px',
    variants: variantsProp,
  } = options

  const isVariant = (x: unknown): x is TypographyOptionsVariant =>
    isPlainObject(x) && !(breakpointKeys[0] in x)

  return ({ addComponents, theme }) => {
    const variants = Object.entries(variantsProp).reduce<TypographyReturnVariants>(
      (acc, [variantNameProp, variantOrMap]) => {
        // Compose the combined variant name.
        const variantName = `.${prefix}${variantNameProp}`

        // Compose the non-responsive variant.
        if (isVariant(variantOrMap)) {
          const fontSize = `${variantOrMap.fontSize}${unit}`
          acc[variantName] = { ...variantOrMap, fontSize }

          return acc
        }

        const filteredBreakpointKeys = breakpointKeys.filter((key) => Boolean(variantOrMap[key]))

        const getNextBreakpointKey = (key: (typeof breakpointKeys)[number]) => {
          const index = filteredBreakpointKeys.indexOf(key)
          return index !== -1 ? filteredBreakpointKeys[index + 1] : undefined
        }

        const {
          clamp = globalClamp,
          clampMax = clamp ?? globalClampMax,
          clampMin = clamp ?? globalClampMin,
          fluid = globalFluid,
          ...variantMap
        } = variantOrMap
        const xsVariant = variantMap[breakpointKeys[0]]

        // Compose the responsive variant map.
        filteredBreakpointKeys.forEach((breakpoint, idx) => {
          const variant = variantMap[breakpoint]!
          const width: string = theme(`screens.${breakpoint}`)
          const media = `@media (min-width: ${width})`

          if (!fluid) {
            const fontSize = `${variant.fontSize}${unit}`

            if (idx === 0) {
              acc[variantName] = { ...variant, fontSize }
            } else {
              acc[variantName][media] = { ...variant, fontSize }
            }
          }

          const nextBreakpoint = getNextBreakpointKey(breakpoint)
          const nextVariant = nextBreakpoint ? variantMap[nextBreakpoint] : null
          if (fluid && nextVariant) {
            const nextWidth: string = theme(`screens.${nextBreakpoint}`)

            const minFontSize = variant.fontSize
            const maxFontSize = nextVariant.fontSize
            const minViewport = parseInt(width, 10)
            const maxViewport = parseInt(nextWidth, 10)

            const fontSize = fluidValue(
              minFontSize,
              maxFontSize,
              minViewport,
              maxViewport,
              unit,
              clampMin,
              clampMax,
            )

            if (idx === 0) {
              acc[variantName] = { ...variant, fontSize }
            } else {
              acc[variantName][media] = { ...variant, fontSize }
            }
          }

          // Compose the non-responsive breakpoint variants by merging with the "default" breakpoint.
          const fontSize = `${variant.fontSize}${unit}`
          acc[`${variantName}-${breakpoint}`] = {
            ...xsVariant,
            ...variant,
            fontSize,
          }
        })

        return acc
      },
      {},
    )

    addComponents(variants)
  }
})
