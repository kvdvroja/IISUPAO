import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';
import { definePreset } from '@primeng/themes';

export const IISUPAOTheme: any = definePreset(Material, {
  primitive: {
    borderRadius: {
      none: '0',
      xs: '2px',
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
    },
    emerald: {
      50: '#E8F6F1',
      100: '#C5EBE1',
      200: '#9EDFCF',
      300: '#76D3BD',
      400: '#58C9AF',
      500: '#3BBFA1',
      600: '#35AF94',
      700: '#2D9B83',
      800: '#268873',
      900: '#1A6657',
      950: '#0d3329',
    },
    green: {
      50: '#E8F5E9',
      100: '#C8E6C9',
      200: '#A5D6A7',
      300: '#81C784',
      400: '#66BB6A',
      500: '#4CAF50',
      600: '#43A047',
      700: '#388E3C',
      800: '#2E7D32',
      900: '#1B5E20',
      950: '#0e2f10',
    },
    lime: {
      50: '#F9FBE7',
      100: '#F0F4C3',
      200: '#E6EE9C',
      300: '#DCE775',
      400: '#D4E157',
      500: '#CDDC39',
      600: '#C0CA33',
      700: '#AFB42B',
      800: '#9E9D24',
      900: '#827717',
      950: '#413c0c',
    },
    red: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      200: '#EF9A9A',
      300: '#E57373',
      400: '#EF5350',
      500: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
      800: '#C62828',
      900: '#B71C1C',
      950: '#5c0e0e',
    },
    orange: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#FF9800',
      600: '#FB8C00',
      700: '#F57C00',
      800: '#EF6C00',
      900: '#E65100',
      950: '#732900',
    },
    amber: {
      50: '#FFF8E1',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFC107',
      600: '#FFB300',
      700: '#FFA000',
      800: '#FF8F00',
      900: '#FF6F00',
      950: '#803800',
    },
    yellow: {
      50: '#FFFDE7',
      100: '#FFF9C4',
      200: '#FFF59D',
      300: '#FFF176',
      400: '#FFEE58',
      500: '#FFEB3B',
      600: '#FDD835',
      700: '#FBC02D',
      800: '#F9A825',
      900: '#F57F17',
      950: '#7b400c',
    },
    teal: {
      50: '#E0F2F1',
      100: '#B2DFDB',
      200: '#80CBC4',
      300: '#4DB6AC',
      400: '#26A69A',
      500: '#009688',
      600: '#00897B',
      700: '#00796B',
      800: '#00695C',
      900: '#004D40',
      950: '#002720',
    },
    cyan: {
      50: '#E0F7FA',
      100: '#B2EBF2',
      200: '#80DEEA',
      300: '#4DD0E1',
      400: '#26C6DA',
      500: '#00BCD4',
      600: '#00ACC1',
      700: '#0097A7',
      800: '#00838F',
      900: '#006064',
      950: '#003032',
    },
    sky: {
      50: '#E1F5FE',
      100: '#B3E5FC',
      200: '#81D4FA',
      300: '#4FC3F7',
      400: '#29B6F6',
      500: '#03A9F4',
      600: '#039BE5',
      700: '#0288D1',
      800: '#0277BD',
      900: '#01579B',
      950: '#012c4e',
    },
    blue: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
      950: '#072451',
    },
    indigo: {
      50: '#E8EAF6',
      100: '#C5CAE9',
      200: '#9FA8DA',
      300: '#7986CB',
      400: '#5C6BC0',
      500: '#3F51B5',
      600: '#3949AB',
      700: '#303F9F',
      800: '#283593',
      900: '#1A237E',
      950: '#0d123f',
    },
    violet: {
      50: '#EDE7F6',
      100: '#D1C4E9',
      200: '#B39DDB',
      300: '#9575CD',
      400: '#7E57C2',
      500: '#673AB7',
      600: '#5E35B1',
      700: '#512DA8',
      800: '#4527A0',
      900: '#311B92',
      950: '#190e49',
    },
    purple: {
      50: '#F3E5F5',
      100: '#E1BEE7',
      200: '#CE93D8',
      300: '#BA68C8',
      400: '#AB47BC',
      500: '#9C27B0',
      600: '#8E24AA',
      700: '#7B1FA2',
      800: '#6A1B9A',
      900: '#4A148C',
      950: '#250a46',
    },
    fuchsia: {
      50: '#FDE6F3',
      100: '#FBC1E3',
      200: '#F897D1',
      300: '#F56DBF',
      400: '#F34DB2',
      500: '#F12DA5',
      600: '#E0289D',
      700: '#CC2392',
      800: '#B81E88',
      900: '#951777',
      950: '#4b0c3c',
    },
    pink: {
      50: '#FCE4EC',
      100: '#F8BBD0',
      200: '#F48FB1',
      300: '#F06292',
      400: '#EC407A',
      500: '#E91E63',
      600: '#D81B60',
      700: '#C2185B',
      800: '#AD1457',
      900: '#880E4F',
      950: '#440728',
    },
    rose: {
      50: '#FFF0F0',
      100: '#FFD9D9',
      200: '#FFC0C0',
      300: '#FFA7A7',
      400: '#FF8E8E',
      500: '#FF7575',
      600: '#FF5252',
      700: '#FF3838',
      800: '#F71C1C',
      900: '#D50000',
      950: '#3E0000',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712',
    },
    zinc: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
    },
    stone: {
      50: '#fafaf9',
      100: '#f5f5f4',
      200: '#e7e5e4',
      300: '#d6d3d1',
      400: '#a8a29e',
      500: '#78716c',
      600: '#57534e',
      700: '#44403c',
      800: '#292524',
      900: '#1c1917',
      950: '#0c0a09',
    },
  },
  semantic: {
    transitionDuration: '0.2s',
    focusRing: {
      width: '0',
      style: 'none',
      color: 'unset',
      offset: '0',
    },
    disabledOpacity: '0.38',
    iconSize: '1rem',
    anchorGutter: '0',
    primary: {
      50: '#f1f7fb', // Color más claro (ajusta según el tono deseado)
      100: '#d2e0f2', // Color más claro
      200: '#a4c7e4', // Color intermedio
      300: '#75aee7', // Color intermedio
      400: '#478bd9', // Color oscuro
      500: '#1C3D67', // Tu color principal
      600: '#183256', // Tono más oscuro
      700: '#112c45', // Más oscuro
      800: '#0b2235', // Aún más oscuro
      900: '#061621', // Tono más oscuro
      950: '#040f10', // Tono casi negro
    },
    formField: {
      paddingX: '0.75rem',
      paddingY: '0.75rem',
      sm: {
        fontSize: '0.875rem',
        paddingX: '0.625rem',
        paddingY: '0.625rem',
      },
      lg: {
        fontSize: '1.125rem',
        paddingX: '0.825rem',
        paddingY: '0.825rem',
      },
      borderRadius: '{border.radius.sm}',
      focusRing: {
        width: '2px',
        style: 'solid',
        color: '{primary.color}',
        offset: '-2px',
        shadow: 'none',
      },
      transitionDuration: '{transition.duration}',
    },
    list: {
      padding: '0.5rem 0',
      gap: '0',
      header: {
        padding: '0.75rem 1rem',
      },
      option: {
        padding: '0.75rem 1rem',
        borderRadius: '{border.radius.none}',
      },
      optionGroup: {
        padding: '0.75rem 1rem',
        fontWeight: '700',
      },
    },
    content: {
      borderRadius: '{border.radius.sm}',
    },
    mask: {
      transitionDuration: '0.15s',
    },
    navigation: {
      list: {
        padding: '0.5rem 0',
        gap: '0',
      },
      item: {
        padding: '0.75rem 1rem',
        borderRadius: '{border.radius.none}',
        gap: '0.5rem',
      },
      submenuLabel: {
        padding: '0.75rem 1rem',
        fontWeight: '700',
      },
      submenuIcon: {
        size: '0.875rem',
      },
    },
    overlay: {
      select: {
        borderRadius: '{border.radius.sm}',
        shadow:
          '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)',
      },
      popover: {
        borderRadius: '{border.radius.sm}',
        padding: '1rem',
        shadow:
          '0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12)',
      },
      modal: {
        borderRadius: '{border.radius.sm}',
        padding: '1.5rem',
        shadow:
          '0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12)',
      },
      navigation: {
        shadow:
          '0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12)',
      },
    },
    colorScheme: {
      light: {
        focusRing: {
          shadow: '0 0 1px 4px {surface.200}',
        },
        surface: {
          0: '#ffffff',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        primary: {
          color: '{primary.500}',
          contrastColor: '#ffffff',
          hoverColor: '{primary.400}',
          activeColor: '{primary.300}',
        },
        highlight: {
          background: 'color-mix(in srgb, {primary.color}, transparent 88%)',
          focusBackground:
            'color-mix(in srgb, {primary.color}, transparent 76%)',
          color: '{primary.700}',
          focusColor: '{primary.800}',
        },
        mask: {
          background: 'rgba(0,0,0,0.32)',
          color: '{surface.200}',
        },
        formField: {
          background: '{surface.0}',
          disabledBackground: '{surface.300}',
          filledBackground: '{surface.100}',
          filledHoverBackground: '{surface.200}',
          filledFocusBackground: '{surface.100}',
          borderColor: '{surface.400}',
          hoverBorderColor: '{surface.900}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: '{red.800}',
          color: '{surface.900}',
          disabledColor: '{surface.600}',
          placeholderColor: '{surface.600}',
          invalidPlaceholderColor: '{red.800}',
          floatLabelColor: '{surface.600}',
          floatLabelFocusColor: '{primary.600}',
          floatLabelActiveColor: '{surface.600}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
          iconColor: '{surface.600}',
          shadow: 'none',
        },
        text: {
          color: '{surface.900}',
          hoverColor: '{surface.900}',
          mutedColor: '{surface.600}',
          hoverMutedColor: '{surface.600}',
        },
        content: {
          background: '{surface.0}',
          hoverBackground: '{surface.100}',
          borderColor: '{surface.300}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '{surface.0}',
            borderColor: '{surface.0}',
            color: '{text.color}',
          },
          popover: {
            background: '{surface.0}',
            borderColor: '{surface.0}',
            color: '{text.color}',
          },
          modal: {
            background: '{surface.0}',
            borderColor: '{surface.0}',
            color: '{text.color}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.100}',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '{highlight.focus.background}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            selectedColor: '{highlight.color}',
            selectedFocusColor: '{highlight.focus.color}',
            icon: {
              color: '{surface.600}',
              focusColor: '{surface.600}',
            },
          },
          optionGroup: {
            background: 'transparent',
            color: '{text.color}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.100}',
            activeBackground: '{surface.200}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            activeColor: '{text.hover.color}',
            icon: {
              color: '{surface.600}',
              focusColor: '{surface.600}',
              activeColor: '{surface.600}',
            },
          },
          submenuLabel: {
            background: 'transparent',
            color: '{text.color}',
          },
          submenuIcon: {
            color: '{surface.600}',
            focusColor: '{surface.600}',
            activeColor: '{surface.600}',
          },
        },
      },
      dark: {
        focusRing: {
          shadow: '0 0 1px 4px {surface.700}',
        },
        surface: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        primary: {
          color: '{primary.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{primary.300}',
          activeColor: '{primary.200}',
        },
        highlight: {
          background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
          focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)',
        },
        mask: {
          background: 'rgba(0,0,0,0.6)',
          color: '{surface.200}',
        },
        formField: {
          background: '{surface.950}',
          disabledBackground: '{surface.700}',
          filledBackground: '{surface.800}',
          filledHoverBackground: '{surface.700}',
          filledFocusBackground: '{surface.800}',
          borderColor: '{surface.600}',
          hoverBorderColor: '{surface.400}',
          focusBorderColor: '{primary.color}',
          invalidBorderColor: '{red.300}',
          color: '{surface.0}',
          disabledColor: '{surface.400}',
          placeholderColor: '{surface.400}',
          invalidPlaceholderColor: '{red.300}',
          floatLabelColor: '{surface.400}',
          floatLabelFocusColor: '{primary.color}',
          floatLabelActiveColor: '{surface.400}',
          floatLabelInvalidColor: '{form.field.invalid.placeholder.color}',
          iconColor: '{surface.400}',
          shadow: 'none',
        },
        text: {
          color: '{surface.0}',
          hoverColor: '{surface.0}',
          mutedColor: '{surface.400}',
          hoverMutedColor: '{surface.400}',
        },
        content: {
          background: '{surface.900}',
          hoverBackground: '{surface.800}',
          borderColor: '{surface.700}',
          color: '{text.color}',
          hoverColor: '{text.hover.color}',
        },
        overlay: {
          select: {
            background: '{surface.900}',
            borderColor: '{surface.900}',
            color: '{text.color}',
          },
          popover: {
            background: '{surface.900}',
            borderColor: '{surface.900}',
            color: '{text.color}',
          },
          modal: {
            background: '{surface.900}',
            borderColor: '{surface.900}',
            color: '{text.color}',
          },
        },
        list: {
          option: {
            focusBackground: '{surface.800}',
            selectedBackground: '{highlight.background}',
            selectedFocusBackground: '{highlight.focus.background}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            selectedColor: '{highlight.color}',
            selectedFocusColor: '{highlight.focus.color}',
            icon: {
              color: '{surface.400}',
              focusColor: '{surface.400}',
            },
          },
          optionGroup: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
        },
        navigation: {
          item: {
            focusBackground: '{surface.800}',
            activeBackground: '{surface.700}',
            color: '{text.color}',
            focusColor: '{text.hover.color}',
            activeColor: '{text.hover.color}',
            icon: {
              color: '{surface.400}',
              focusColor: '{surface.400}',
              activeColor: '{surface.400}',
            },
          },
          submenuLabel: {
            background: 'transparent',
            color: '{text.muted.color}',
          },
          submenuIcon: {
            color: '{surface.400}',
            focusColor: '{surface.400}',
            activeColor: '{surface.400}',
          },
        },
      },
    },
  },
  components: {
    accordion: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      panel: {
        borderWidth: '0',
        borderColor: '{content.border.color}',
      },
      header: {
        color: '{text.color}',
        hoverColor: '{text.color}',
        activeColor: '{text.color}',
        padding: '1.25rem',
        fontWeight: '600',
        borderRadius: '0',
        borderWidth: '0',
        borderColor: '{content.border.color}',
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        activeBackground: '{content.background}',
        activeHoverBackground: '{content.background}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
        toggleIcon: {
          color: '{text.muted.color}',
          hoverColor: '{text.muted.color}',
          activeColor: '{text.muted.color}',
          activeHoverColor: '{text.muted.color}',
        },
        first: {
          topBorderRadius: '{content.border.radius}',
          borderWidth: '0',
        },
        last: {
          bottomBorderRadius: '{content.border.radius}',
          activeBottomBorderRadius: '0',
        },
      },
      content: {
        borderWidth: '0',
        borderColor: '{content.border.color}',
        background: '{content.background}',
        color: '{text.color}',
        padding: '0 1.25rem 1.25rem 1.25rem',
      },
    },
    autocomplete: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
      },
      optionGroup: {
        background: '{list.option.group.background}',
        color: '{list.option.group.color}',
        fontWeight: '{list.option.group.font.weight}',
        padding: '{list.option.group.padding}',
      },
      dropdown: {
        width: '3rem',
        sm: {
          width: '2.5rem',
        },
        lg: {
          width: '3.5rem',
        },
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.border.color}',
        activeBorderColor: '{form.field.border.color}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
      chip: {
        borderRadius: '{border.radius.sm}',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
      colorScheme: {
        light: {
          chip: {
            focusBackground: '{surface.300}',
            focusColor: '{surface.950}',
          },
          dropdown: {
            background: '{surface.100}',
            hoverBackground: '{surface.200}',
            activeBackground: '{surface.300}',
            color: '{surface.600}',
            hoverColor: '{surface.700}',
            activeColor: '{surface.800}',
          },
        },
        dark: {
          chip: {
            focusBackground: '{surface.600}',
            focusColor: '{surface.0}',
          },
          dropdown: {
            background: '{surface.800}',
            hoverBackground: '{surface.700}',
            activeBackground: '{surface.600}',
            color: '{surface.300}',
            hoverColor: '{surface.200}',
            activeColor: '{surface.100}',
          },
        },
      },
    },
    avatar: {
      root: {
        width: '2rem',
        height: '2rem',
        fontSize: '1rem',
        background: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
      },
      icon: {
        size: '1rem',
      },
      group: {
        borderColor: '{content.background}',
        offset: '-0.75rem',
      },
      lg: {
        width: '3rem',
        height: '3rem',
        fontSize: '1.5rem',
        icon: {
          size: '1.5rem',
        },
        group: {
          offset: '-1rem',
        },
      },
      xl: {
        width: '4rem',
        height: '4rem',
        fontSize: '2rem',
        icon: {
          size: '2rem',
        },
        group: {
          offset: '-1.5rem',
        },
      },
    },
    badge: {
      root: {
        borderRadius: '{border.radius.md}',
        padding: '0 0.5rem',
        fontSize: '0.75rem',
        fontWeight: '700',
        minWidth: '1.5rem',
        height: '1.5rem',
      },
      dot: {
        size: '0.5rem',
      },
      sm: {
        fontSize: '0.625rem',
        minWidth: '1.25rem',
        height: '1.25rem',
      },
      lg: {
        fontSize: '0.875rem',
        minWidth: '1.75rem',
        height: '1.75rem',
      },
      xl: {
        fontSize: '1rem',
        minWidth: '2rem',
        height: '2rem',
      },
      colorScheme: {
        light: {
          primary: {
            background: '{primary.color}',
            color: '{primary.contrast.color}',
          },
          secondary: {
            background: '{surface.100}',
            color: '{surface.600}',
          },
          success: {
            background: '{green.500}',
            color: '{surface.0}',
          },
          info: {
            background: '{sky.500}',
            color: '{surface.0}',
          },
          warn: {
            background: '{orange.500}',
            color: '{surface.0}',
          },
          danger: {
            background: '{red.500}',
            color: '{surface.0}',
          },
          contrast: {
            background: '{surface.950}',
            color: '{surface.0}',
          },
        },
        dark: {
          primary: {
            background: '{primary.color}',
            color: '{primary.contrast.color}',
          },
          secondary: {
            background: '{surface.800}',
            color: '{surface.300}',
          },
          success: {
            background: '{green.400}',
            color: '{green.950}',
          },
          info: {
            background: '{sky.400}',
            color: '{sky.950}',
          },
          warn: {
            background: '{orange.400}',
            color: '{orange.950}',
          },
          danger: {
            background: '{red.400}',
            color: '{red.950}',
          },
          contrast: {
            background: '{surface.0}',
            color: '{surface.950}',
          },
        },
      },
    },
    blockui: {
      root: {
        borderRadius: '{content.border.radius}',
      },
    },
    breadcrumb: {
      root: {
        padding: '1rem',
        background: '{content.background}',
        gap: '0.5rem',
        transitionDuration: '{transition.duration}',
      },
      item: {
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        borderRadius: '{content.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          hoverColor: '{navigation.item.icon.focus.color}',
        },
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      separator: {
        color: '{navigation.item.icon.color}',
      },
    },
    button: {
      root: {
        borderRadius: '{form.field.border.radius}',
        roundedBorderRadius: '2rem',
        gap: '0.5rem',
        paddingX: '1rem',
        paddingY: '0.625rem',
        iconOnlyWidth: '3rem',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
        label: {
          fontWeight: '500',
        },
        raisedShadow:
          '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          offset: '{focus.ring.offset}',
        },
        badgeSize: '1rem',
        transitionDuration: '{form.field.transition.duration}',
      },
      colorScheme: {
        light: {
          root: {
            primary: {
              background: '{primary.color}',
              hoverBackground: '{primary.hover.color}',
              activeBackground: '{primary.active.color}',
              borderColor: '{primary.color}',
              hoverBorderColor: '{primary.hover.color}',
              activeBorderColor: '{primary.active.color}',
              color: '{primary.contrast.color}',
              hoverColor: '{primary.contrast.color}',
              activeColor: '{primary.contrast.color}',
              focusRing: {
                color: '{primary.color}',
                shadow: 'none',
              },
            },
            secondary: {
              background: '{surface.100}',
              hoverBackground: '{surface.200}',
              activeBackground: '{surface.300}',
              borderColor: '{surface.100}',
              hoverBorderColor: '{surface.200}',
              activeBorderColor: '{surface.300}',
              color: '{surface.600}',
              hoverColor: '{surface.700}',
              activeColor: '{surface.800}',
              focusRing: {
                color: '{surface.600}',
                shadow: 'none',
              },
            },
            info: {
              background: '{sky.500}',
              hoverBackground: '{sky.400}',
              activeBackground: '{sky.300}',
              borderColor: '{sky.500}',
              hoverBorderColor: '{sky.400}',
              activeBorderColor: '{sky.300}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff',
              focusRing: {
                color: '{sky.500}',
                shadow: 'none',
              },
            },
            success: {
              background: '{green.500}',
              hoverBackground: '{green.400}',
              activeBackground: '{green.300}',
              borderColor: '{green.500}',
              hoverBorderColor: '{green.400}',
              activeBorderColor: '{green.300}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff',
              focusRing: {
                color: '{green.500}',
                shadow: 'none',
              },
            },
            warn: {
              background: '{orange.500}',
              hoverBackground: '{orange.400}',
              activeBackground: '{orange.300}',
              borderColor: '{orange.500}',
              hoverBorderColor: '{orange.400}',
              activeBorderColor: '{orange.300}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff',
              focusRing: {
                color: '{orange.500}',
                shadow: 'none',
              },
            },
            help: {
              background: '{purple.500}',
              hoverBackground: '{purple.400}',
              activeBackground: '{purple.300}',
              borderColor: '{purple.500}',
              hoverBorderColor: '{purple.400}',
              activeBorderColor: '{purple.300}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff',
              focusRing: {
                color: '{purple.500}',
                shadow: 'none',
              },
            },
            danger: {
              background: '{red.500}',
              hoverBackground: '{red.400}',
              activeBackground: '{red.300}',
              borderColor: '{red.500}',
              hoverBorderColor: '{red.400}',
              activeBorderColor: '{red.300}',
              color: '#ffffff',
              hoverColor: '#ffffff',
              activeColor: '#ffffff',
              focusRing: {
                color: '{red.500}',
                shadow: 'none',
              },
            },
            contrast: {
              background: '{surface.950}',
              hoverBackground: '{surface.800}',
              activeBackground: '{surface.700}',
              borderColor: '{surface.950}',
              hoverBorderColor: '{surface.800}',
              activeBorderColor: '{surface.700}',
              color: '{surface.0}',
              hoverColor: '{surface.0}',
              activeColor: '{surface.0}',
              focusRing: {
                color: '{surface.950}',
                shadow: 'none',
              },
            },
          },
          outlined: {
            primary: {
              hoverBackground: '{primary.50}',
              activeBackground: '{primary.100}',
              borderColor: '{primary.color}',
              color: '{primary.color}',
            },
            secondary: {
              hoverBackground: '{surface.50}',
              activeBackground: '{surface.100}',
              borderColor: '{surface.600}',
              color: '{surface.600}',
            },
            success: {
              hoverBackground: '{green.50}',
              activeBackground: '{green.100}',
              borderColor: '{green.500}',
              color: '{green.500}',
            },
            info: {
              hoverBackground: '{sky.50}',
              activeBackground: '{sky.100}',
              borderColor: '{sky.500}',
              color: '{sky.500}',
            },
            warn: {
              hoverBackground: '{orange.50}',
              activeBackground: '{orange.100}',
              borderColor: '{orange.500}',
              color: '{orange.500}',
            },
            help: {
              hoverBackground: '{purple.50}',
              activeBackground: '{purple.100}',
              borderColor: '{purple.500}',
              color: '{purple.500}',
            },
            danger: {
              hoverBackground: '{red.50}',
              activeBackground: '{red.100}',
              borderColor: '{red.500}',
              color: '{red.500}',
            },
            contrast: {
              hoverBackground: '{surface.50}',
              activeBackground: '{surface.100}',
              borderColor: '{surface.950}',
              color: '{surface.950}',
            },
            plain: {
              hoverBackground: '{surface.50}',
              activeBackground: '{surface.100}',
              borderColor: '{surface.900}',
              color: '{surface.900}',
            },
          },
          text: {
            primary: {
              hoverBackground: '{primary.50}',
              activeBackground: '{primary.100}',
              color: '{primary.color}',
            },
            secondary: {
              hoverBackground: '{surface.50}',
              activeBackground: '{surface.100}',
              color: '{surface.600}',
            },
            success: {
              hoverBackground: '{green.50}',
              activeBackground: '{green.100}',
              color: '{green.500}',
            },
            info: {
              hoverBackground: '{sky.50}',
              activeBackground: '{sky.100}',
              color: '{sky.500}',
            },
            warn: {
              hoverBackground: '{orange.50}',
              activeBackground: '{orange.100}',
              color: '{orange.500}',
            },
            help: {
              hoverBackground: '{purple.50}',
              activeBackground: '{purple.100}',
              color: '{purple.500}',
            },
            danger: {
              hoverBackground: '{red.50}',
              activeBackground: '{red.100}',
              color: '{red.500}',
            },
            contrast: {
              hoverBackground: '{surface.50}',
              activeBackground: '{surface.100}',
              color: '{surface.950}',
            },
            plain: {
              hoverBackground: '{surface.50}',
              activeBackground: '{surface.100}',
              color: '{surface.900}',
            },
          },
          link: {
            color: '{primary.color}',
            hoverColor: '{primary.color}',
            activeColor: '{primary.color}',
          },
        },
        dark: {
          root: {
            primary: {
              background: '{primary.color}',
              hoverBackground: '{primary.hover.color}',
              activeBackground: '{primary.active.color}',
              borderColor: '{primary.color}',
              hoverBorderColor: '{primary.hover.color}',
              activeBorderColor: '{primary.active.color}',
              color: '{primary.contrast.color}',
              hoverColor: '{primary.contrast.color}',
              activeColor: '{primary.contrast.color}',
              focusRing: {
                color: '{primary.color}',
                shadow: 'none',
              },
            },
            secondary: {
              background: '{surface.800}',
              hoverBackground: '{surface.700}',
              activeBackground: '{surface.600}',
              borderColor: '{surface.800}',
              hoverBorderColor: '{surface.700}',
              activeBorderColor: '{surface.600}',
              color: '{surface.300}',
              hoverColor: '{surface.200}',
              activeColor: '{surface.100}',
              focusRing: {
                color: '{surface.300}',
                shadow: 'none',
              },
            },
            info: {
              background: '{sky.400}',
              hoverBackground: '{sky.300}',
              activeBackground: '{sky.200}',
              borderColor: '{sky.400}',
              hoverBorderColor: '{sky.300}',
              activeBorderColor: '{sky.200}',
              color: '{sky.950}',
              hoverColor: '{sky.950}',
              activeColor: '{sky.950}',
              focusRing: {
                color: '{sky.400}',
                shadow: 'none',
              },
            },
            success: {
              background: '{green.400}',
              hoverBackground: '{green.300}',
              activeBackground: '{green.200}',
              borderColor: '{green.400}',
              hoverBorderColor: '{green.300}',
              activeBorderColor: '{green.200}',
              color: '{green.950}',
              hoverColor: '{green.950}',
              activeColor: '{green.950}',
              focusRing: {
                color: '{green.400}',
                shadow: 'none',
              },
            },
            warn: {
              background: '{orange.400}',
              hoverBackground: '{orange.300}',
              activeBackground: '{orange.200}',
              borderColor: '{orange.400}',
              hoverBorderColor: '{orange.300}',
              activeBorderColor: '{orange.200}',
              color: '{orange.950}',
              hoverColor: '{orange.950}',
              activeColor: '{orange.950}',
              focusRing: {
                color: '{orange.400}',
                shadow: 'none',
              },
            },
            help: {
              background: '{purple.400}',
              hoverBackground: '{purple.300}',
              activeBackground: '{purple.200}',
              borderColor: '{purple.400}',
              hoverBorderColor: '{purple.300}',
              activeBorderColor: '{purple.200}',
              color: '{purple.950}',
              hoverColor: '{purple.950}',
              activeColor: '{purple.950}',
              focusRing: {
                color: '{purple.400}',
                shadow: 'none',
              },
            },
            danger: {
              background: '{red.400}',
              hoverBackground: '{red.300}',
              activeBackground: '{red.200}',
              borderColor: '{red.400}',
              hoverBorderColor: '{red.300}',
              activeBorderColor: '{red.200}',
              color: '{red.950}',
              hoverColor: '{red.950}',
              activeColor: '{red.950}',
              focusRing: {
                color: '{red.400}',
                shadow: 'none',
              },
            },
            contrast: {
              background: '{surface.0}',
              hoverBackground: '{surface.100}',
              activeBackground: '{surface.200}',
              borderColor: '{surface.0}',
              hoverBorderColor: '{surface.100}',
              activeBorderColor: '{surface.200}',
              color: '{surface.950}',
              hoverColor: '{surface.950}',
              activeColor: '{surface.950}',
              focusRing: {
                color: '{surface.0}',
                shadow: 'none',
              },
            },
          },
          outlined: {
            primary: {
              hoverBackground:
                'color-mix(in srgb, {primary.color}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {primary.color}, transparent 84%)',
              borderColor: '{primary.700}',
              color: '{primary.color}',
            },
            secondary: {
              hoverBackground: 'rgba(255,255,255,0.04)',
              activeBackground: 'rgba(255,255,255,0.16)',
              borderColor: '{surface.700}',
              color: '{surface.400}',
            },
            success: {
              hoverBackground:
                'color-mix(in srgb, {green.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {green.400}, transparent 84%)',
              borderColor: '{green.700}',
              color: '{green.400}',
            },
            info: {
              hoverBackground: 'color-mix(in srgb, {sky.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {sky.400}, transparent 84%)',
              borderColor: '{sky.700}',
              color: '{sky.400}',
            },
            warn: {
              hoverBackground:
                'color-mix(in srgb, {orange.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {orange.400}, transparent 84%)',
              borderColor: '{orange.700}',
              color: '{orange.400}',
            },
            help: {
              hoverBackground:
                'color-mix(in srgb, {purple.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {purple.400}, transparent 84%)',
              borderColor: '{purple.700}',
              color: '{purple.400}',
            },
            danger: {
              hoverBackground: 'color-mix(in srgb, {red.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {red.400}, transparent 84%)',
              borderColor: '{red.700}',
              color: '{red.400}',
            },
            contrast: {
              hoverBackground: '{surface.800}',
              activeBackground: '{surface.700}',
              borderColor: '{surface.500}',
              color: '{surface.0}',
            },
            plain: {
              hoverBackground: '{surface.800}',
              activeBackground: '{surface.700}',
              borderColor: '{surface.600}',
              color: '{surface.0}',
            },
          },
          text: {
            primary: {
              hoverBackground:
                'color-mix(in srgb, {primary.color}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {primary.color}, transparent 84%)',
              color: '{primary.color}',
            },
            secondary: {
              hoverBackground: '{surface.800}',
              activeBackground: '{surface.700}',
              color: '{surface.400}',
            },
            success: {
              hoverBackground:
                'color-mix(in srgb, {green.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {green.400}, transparent 84%)',
              color: '{green.400}',
            },
            info: {
              hoverBackground: 'color-mix(in srgb, {sky.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {sky.400}, transparent 84%)',
              color: '{sky.400}',
            },
            warn: {
              hoverBackground:
                'color-mix(in srgb, {orange.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {orange.400}, transparent 84%)',
              color: '{orange.400}',
            },
            help: {
              hoverBackground:
                'color-mix(in srgb, {purple.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {purple.400}, transparent 84%)',
              color: '{purple.400}',
            },
            danger: {
              hoverBackground: 'color-mix(in srgb, {red.400}, transparent 96%)',
              activeBackground:
                'color-mix(in srgb, {red.400}, transparent 84%)',
              color: '{red.400}',
            },
            contrast: {
              hoverBackground: '{surface.800}',
              activeBackground: '{surface.700}',
              color: '{surface.0}',
            },
            plain: {
              hoverBackground: '{surface.800}',
              activeBackground: '{surface.700}',
              color: '{surface.0}',
            },
          },
          link: {
            color: '{primary.color}',
            hoverColor: '{primary.color}',
            activeColor: '{primary.color}',
          },
        },
      },
    },
    datepicker: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      panel: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.popover.shadow}',
        padding: '0.5rem',
      },
      header: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        padding: '0 0 0.5rem 0',
      },
      title: {
        gap: '0.5rem',
        fontWeight: '700',
      },
      dropdown: {
        width: '3rem',
        sm: {
          width: '2.5rem',
        },
        lg: {
          width: '3.5rem',
        },
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.border.color}',
        activeBorderColor: '{form.field.border.color}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'nıne',
        },
      },
      inputIcon: {
        color: '{form.field.icon.color}',
      },
      selectMonth: {
        hoverBackground: '{content.hover.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        padding: '0.5rem 0.75rem',
        borderRadius: '{content.border.radius}',
      },
      selectYear: {
        hoverBackground: '{content.hover.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        padding: '0.5rem 0.75rem',
        borderRadius: '{content.border.radius}',
      },
      group: {
        borderColor: '{content.border.color}',
        gap: '{overlay.popover.padding}',
      },
      dayView: {
        margin: '0.5rem 0 0 0',
      },
      weekDay: {
        padding: '0.5rem',
        fontWeight: '700',
        color: '{content.color}',
      },
      date: {
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{primary.color}',
        rangeSelectedBackground: '{highlight.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{primary.contrast.color}',
        rangeSelectedColor: '{highlight.color}',
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        padding: '0.125rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      monthView: {
        margin: '0.5rem 0 0 0',
      },
      month: {
        padding: '0.625rem',
        borderRadius: '{content.border.radius}',
      },
      yearView: {
        margin: '0.5rem 0 0 0',
      },
      year: {
        padding: '0.625rem',
        borderRadius: '{content.border.radius}',
      },
      buttonbar: {
        padding: '0.5rem 0 0 0',
        borderColor: '{content.border.color}',
      },
      timePicker: {
        padding: '0.5rem 0 0 0',
        borderColor: '{content.border.color}',
        gap: '0.5rem',
        buttonGap: '0.25rem',
      },
      colorScheme: {
        light: {
          dropdown: {
            background: '{surface.100}',
            hoverBackground: '{surface.200}',
            activeBackground: '{surface.300}',
            color: '{surface.600}',
            hoverColor: '{surface.700}',
            activeColor: '{surface.800}',
          },
          today: {
            background: '{surface.200}',
            color: '{surface.900}',
          },
        },
        dark: {
          dropdown: {
            background: '{surface.800}',
            hoverBackground: '{surface.700}',
            activeBackground: '{surface.600}',
            color: '{surface.300}',
            hoverColor: '{surface.200}',
            activeColor: '{surface.100}',
          },
          today: {
            background: '{surface.700}',
            color: '{surface.0}',
          },
        },
      },
    },
    card: {
      root: {
        background: '{content.background}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        shadow:
          '0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12)',
      },
      body: {
        padding: '1.5rem',
        gap: '0.75rem',
      },
      caption: {
        gap: '0.5rem',
      },
      title: {
        fontSize: '1.25rem',
        fontWeight: '500',
      },
      subtitle: {
        color: '{text.muted.color}',
      },
    },
    carousel: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      content: {
        gap: '0.25rem',
      },
      indicatorList: {
        padding: '1rem',
        gap: '1rem',
      },
      indicator: {
        width: '1.25rem',
        height: '1.25rem',
        borderRadius: '50%',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
      colorScheme: {
        light: {
          indicator: {
            background: '{surface.200}',
            hoverBackground: '{surface.300}',
            activeBackground: '{primary.color}',
          },
        },
        dark: {
          indicator: {
            background: '{surface.700}',
            hoverBackground: '{surface.600}',
            activeBackground: '{primary.color}',
          },
        },
      },
    },
    cascadeselect: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
      dropdown: {
        width: '2.5rem',
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
        mobileIndent: '1rem',
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
        icon: {
          color: '{list.option.icon.color}',
          focusColor: '{list.option.icon.focus.color}',
          size: '0.875rem',
        },
      },
      clearIcon: {
        color: '{form.field.icon.color}',
      },
    },
    checkbox: {
      root: {
        borderRadius: '{border.radius.xs}',
        width: '18px',
        height: '18px',
        background: '{form.field.background}',
        checkedBackground: '{primary.color}',
        checkedHoverBackground: '{primary.color}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        checkedBorderColor: '{primary.color}',
        checkedHoverBorderColor: '{primary.color}',
        checkedFocusBorderColor: '{primary.color}',
        checkedDisabledBorderColor: '{form.field.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        shadow: '{form.field.shadow}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          width: '14px',
          height: '14px',
        },
        lg: {
          width: '22px',
          height: '22px',
        },
      },
      icon: {
        size: '0.875rem',
        color: '{form.field.color}',
        checkedColor: '{primary.contrast.color}',
        checkedHoverColor: '{primary.contrast.color}',
        disabledColor: '{form.field.disabled.color}',
        sm: {
          size: '0.75rem',
        },
        lg: {
          size: '1rem',
        },
      },
    },
    chip: {
      root: {
        borderRadius: '2rem',
        paddingX: '0.75rem',
        paddingY: '0.75rem',
        gap: '0.5rem',
        transitionDuration: '{transition.duration}',
      },
      image: {
        width: '2.25rem',
        height: '2.25rem',
      },
      icon: {
        size: '1rem',
      },
      removeIcon: {
        size: '1rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
        },
      },
      colorScheme: {
        light: {
          root: {
            background: '{surface.200}',
            color: '{surface.900}',
          },
          icon: {
            color: '{surface.600}',
          },
          removeIcon: {
            color: '{surface.600}',
            focusRing: {
              shadow: '0 0 1px 4px {surface.300}',
            },
          },
        },
        dark: {
          root: {
            background: '{surface.700}',
            color: '{surface.0}',
          },
          icon: {
            color: '{surface.0}',
          },
          removeIcon: {
            color: '{surface.0}',
            focusRing: {
              shadow: '0 0 1px 4px {surface.600}',
            },
          },
        },
      },
    },
    colorpicker: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      preview: {
        width: '2rem',
        height: '2rem',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      panel: {
        shadow: '{overlay.popover.shadow}',
        borderRadius: '{overlay.popover.borderRadius}',
      },
      colorScheme: {
        light: {
          panel: {
            background: '{surface.800}',
            borderColor: '{surface.900}',
          },
          handle: {
            color: '{surface.0}',
          },
        },
        dark: {
          panel: {
            background: '{surface.900}',
            borderColor: '{surface.700}',
          },
          handle: {
            color: '{surface.0}',
          },
        },
      },
    },
    confirmdialog: {
      icon: {
        size: '2rem',
        color: '{overlay.modal.color}',
      },
      content: {
        gap: '1rem',
      },
    },
    confirmpopup: {
      root: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        color: '{overlay.popover.color}',
        borderRadius: '{overlay.popover.border.radius}',
        shadow: '{overlay.popover.shadow}',
        gutter: '10px',
        arrowOffset: '1.25rem',
      },
      content: {
        padding: '{overlay.popover.padding}',
        gap: '1rem',
      },
      icon: {
        size: '1.5rem',
        color: '{overlay.popover.color}',
      },
      footer: {
        gap: '0.5rem',
        padding:
          '0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}',
      },
    },
    contextmenu: {
      root: {
        background: '{content.background}',
        borderColor: 'transparent',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        transitionDuration: '{transition.duration}',
      },
      list: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        activeBackground: '{navigation.item.active.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        activeColor: '{navigation.item.active.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          activeColor: '{navigation.item.icon.active.color}',
        },
      },
      submenu: {
        mobileIndent: '1rem',
      },
      submenuIcon: {
        size: '{navigation.submenu.icon.size}',
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
        activeColor: '{navigation.submenu.icon.active.color}',
      },
      separator: {
        borderColor: '{content.border.color}',
      },
    },
    dataview: {
      root: {
        borderColor: 'transparent',
        borderWidth: '0',
        borderRadius: '0',
        padding: '0',
      },
      header: {
        background: '{content.background}',
        color: '{content.color}',
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.75rem 1rem',
        borderRadius: '0',
      },
      content: {
        background: '{content.background}',
        color: '{content.color}',
        borderColor: 'transparent',
        borderWidth: '0',
        padding: '0',
        borderRadius: '0',
      },
      footer: {
        background: '{content.background}',
        color: '{content.color}',
        borderColor: '{content.border.color}',
        borderWidth: '1px 0 0 0',
        padding: '0.75rem 1rem',
        borderRadius: '0',
      },
      paginatorTop: {
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0',
      },
      paginatorBottom: {
        borderColor: '{content.border.color}',
        borderWidth: '1px 0 0 0',
      },
    },
    datatable: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      header: {
        background: '{content.background}',
        borderColor: '{datatable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.75rem 1rem',
      },
      headerCell: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        borderColor: '{datatable.border.color}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      columnTitle: {
        fontWeight: '600',
      },
      row: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      bodyCell: {
        borderColor: '{datatable.border.color}',
        padding: '0.75rem 1rem',
      },
      footerCell: {
        background: '{content.background}',
        borderColor: '{datatable.border.color}',
        color: '{content.color}',
        padding: '0.75rem 1rem',
      },
      columnFooter: {
        fontWeight: '600',
      },
      footer: {
        background: '{content.background}',
        borderColor: '{datatable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.75rem 1rem',
      },
      dropPoint: {
        color: '{primary.color}',
      },
      resizeIndicator: {
        width: '1px',
        color: '{primary.color}',
      },
      sortIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        size: '0.875rem',
      },
      loadingIcon: {
        size: '2rem',
      },
      rowToggleButton: {
        hoverBackground: '{content.hover.background}',
        selectedHoverBackground: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        selectedHoverColor: '{primary.color}',
        size: '1.75rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      filter: {
        inlineGap: '0.5rem',
        overlaySelect: {
          background: '{overlay.select.background}',
          borderColor: '{overlay.select.border.color}',
          borderRadius: '{overlay.select.border.radius}',
          color: '{overlay.select.color}',
          shadow: '{overlay.select.shadow}',
        },
        overlayPopover: {
          background: '{overlay.popover.background}',
          borderColor: '{overlay.popover.border.color}',
          borderRadius: '{overlay.popover.border.radius}',
          color: '{overlay.popover.color}',
          shadow: '{overlay.popover.shadow}',
          padding: '{overlay.popover.padding}',
          gap: '0.5rem',
        },
        rule: {
          borderColor: '{content.border.color}',
        },
        constraintList: {
          padding: '{list.padding}',
          gap: '{list.gap}',
        },
        constraint: {
          focusBackground: '{list.option.focus.background}',
          selectedBackground: '{list.option.selected.background}',
          selectedFocusBackground: '{list.option.selected.focus.background}',
          color: '{list.option.color}',
          focusColor: '{list.option.focus.color}',
          selectedColor: '{list.option.selected.color}',
          selectedFocusColor: '{list.option.selected.focus.color}',
          separator: {
            borderColor: '{content.border.color}',
          },
          padding: '{list.option.padding}',
          borderRadius: '{list.option.border.radius}',
        },
      },
      paginatorTop: {
        borderColor: '{datatable.border.color}',
        borderWidth: '0 0 1px 0',
      },
      paginatorBottom: {
        borderColor: '{datatable.border.color}',
        borderWidth: '0 0 1px 0',
      },
      colorScheme: {
        light: {
          root: {
            borderColor: '{content.border.color}',
          },
          row: {
            stripedBackground: '{surface.50}',
          },
          bodyCell: {
            selectedBorderColor: '{primary.100}',
          },
        },
        dark: {
          root: {
            borderColor: '{surface.800}',
          },
          row: {
            stripedBackground: '{surface.950}',
          },
          bodyCell: {
            selectedBorderColor: '{primary.900}',
          },
        },
      },
    },
    dialog: {
      root: {
        background: '{overlay.modal.background}',
        borderColor: '{overlay.modal.border.color}',
        color: '{overlay.modal.color}',
        borderRadius: '{overlay.modal.border.radius}',
        shadow: '{overlay.modal.shadow}',
      },
      header: {
        padding: '{overlay.modal.padding}',
        gap: '0.5rem',
      },
      title: {
        fontSize: '1.25rem',
        fontWeight: '600',
      },
      content: {
        padding:
          '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}',
      },
      footer: {
        padding:
          '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}',
        gap: '0.5rem',
      },
    },
    divider: {
      root: {
        borderColor: '{content.border.color}',
      },
      content: {
        background: '{content.background}',
        color: '{text.color}',
      },
      horizontal: {
        margin: '1rem 0',
        padding: '0 1rem',
        content: {
          padding: '0 0.5rem',
        },
      },
      vertical: {
        margin: '0 1rem',
        padding: '0.5rem 0',
        content: {
          padding: '0.5rem 0',
        },
      },
    },
    dock: {
      root: {
        background: 'rgba(255, 255, 255, 0.1)',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        padding: '0.5rem',
        borderRadius: '{border.radius.xl}',
      },
      item: {
        borderRadius: '{content.border.radius}',
        padding: '0.5rem',
        size: '3rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    drawer: {
      root: {
        background: '{overlay.modal.background}',
        borderColor: '{overlay.modal.border.color}',
        color: '{overlay.modal.color}',
        shadow: '{overlay.modal.shadow}',
      },
      header: {
        padding: '{overlay.modal.padding}',
      },
      title: {
        fontSize: '1.5rem',
        fontWeight: '600',
      },
      content: {
        padding:
          '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}',
      },
      footer: {
        padding: '{overlay.modal.padding}',
      },
    },
    editor: {
      toolbar: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
      },
      toolbarItem: {
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
        padding: '{list.padding}',
      },
      overlayOption: {
        focusBackground: '{list.option.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
      },
      content: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
      },
    },
    fieldset: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        padding: '0 1.25rem 1.25rem 1.25rem',
        transitionDuration: '{transition.duration}',
      },
      legend: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        borderRadius: '{content.border.radius}',
        borderWidth: '1px',
        borderColor: 'transparent',
        padding: '0.75rem 1rem',
        gap: '0.5rem',
        fontWeight: '600',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
      toggleIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
      },
      content: {
        padding: '0',
      },
    },
    fileupload: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        transitionDuration: '{transition.duration}',
      },
      header: {
        background: 'transparent',
        color: '{text.color}',
        padding: '1.25rem',
        borderColor: 'unset',
        borderWidth: '0',
        borderRadius: '0',
        gap: '0.5rem',
      },
      content: {
        highlightBorderColor: '{primary.color}',
        padding: '0 1.25rem 1.25rem 1.25rem',
        gap: '1rem',
      },
      file: {
        padding: '1rem',
        gap: '1rem',
        borderColor: '{content.border.color}',
        info: {
          gap: '0.5rem',
        },
      },
      fileList: {
        gap: '0.5rem',
      },
      progressbar: {
        height: '0.25rem',
      },
      basic: {
        gap: '0.5rem',
      },
    },
    iftalabel: {
      root: {
        color: '{form.field.float.label.color}',
        focusColor: '{form.field.float.label.focus.color}',
        invalidColor: '{form.field.float.label.invalid.color}',
        transitionDuration: '0.2s',
        positionX: '{form.field.padding.x}',
        top: '0.5rem',
        fontSize: '0.75rem',
        fontWeight: '400',
      },
      input: {
        paddingTop: '1.5rem',
        paddingBottom: '0.5rem',
      },
    },
    floatlabel: {
      root: {
        color: '{form.field.float.label.color}',
        focusColor: '{form.field.float.label.focus.color}',
        activeColor: '{form.field.float.label.active.color}',
        invalidColor: '{form.field.float.label.invalid.color}',
        transitionDuration: '0.2s',
        positionX: '{form.field.padding.x}',
        positionY: '{form.field.padding.y}',
        fontWeight: '500',
        active: {
          fontSize: '0.75rem',
          fontWeight: '400',
        },
      },
      over: {
        active: {
          top: '-1.25rem',
        },
      },
      in: {
        input: {
          paddingTop: '1.5rem',
          paddingBottom: '0.5rem',
        },
        active: {
          top: '0.5rem',
        },
      },
      on: {
        borderRadius: '{border.radius.xs}',
        active: {
          background: '{form.field.background}',
          padding: '0 0.125rem',
        },
      },
    },
    galleria: {
      root: {
        borderWidth: '1px',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        transitionDuration: '{transition.duration}',
      },
      navButton: {
        background: 'rgba(255, 255, 255, 0.1)',
        hoverBackground: 'rgba(255, 255, 255, 0.2)',
        color: '{surface.100}',
        hoverColor: '{surface.0}',
        size: '3rem',
        gutter: '0.5rem',
        prev: {
          borderRadius: '50%',
        },
        next: {
          borderRadius: '50%',
        },
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      navIcon: {
        size: '1.5rem',
      },
      thumbnailsContent: {
        background: '{content.background}',
        padding: '1rem 0.25rem',
      },
      thumbnailNavButton: {
        size: '2rem',
        borderRadius: '50%',
        gutter: '0.5rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      thumbnailNavButtonIcon: {
        size: '1rem',
      },
      caption: {
        background: 'rgba(0, 0, 0, 0.5)',
        color: '{surface.100}',
        padding: '1rem',
      },
      indicatorList: {
        gap: '0.5rem',
        padding: '1rem',
      },
      indicatorButton: {
        width: '1rem',
        height: '1rem',
        activeBackground: '{primary.color}',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      insetIndicatorList: {
        background: 'rgba(0, 0, 0, 0.5)',
      },
      insetIndicatorButton: {
        background: 'rgba(255, 255, 255, 0.4)',
        hoverBackground: 'rgba(255, 255, 255, 0.6)',
        activeBackground: 'rgba(255, 255, 255, 0.9)',
      },
      closeButton: {
        size: '3rem',
        gutter: '0.5rem',
        background: 'rgba(255, 255, 255, 0.1)',
        hoverBackground: 'rgba(255, 255, 255, 0.2)',
        color: '{surface.50}',
        hoverColor: '{surface.0}',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      closeButtonIcon: {
        size: '1.5rem',
      },
      colorScheme: {
        light: {
          thumbnailNavButton: {
            hoverBackground: '{surface.100}',
            color: '{surface.600}',
            hoverColor: '{surface.700}',
          },
          indicatorButton: {
            background: '{surface.200}',
            hoverBackground: '{surface.300}',
          },
        },
        dark: {
          thumbnailNavButton: {
            hoverBackground: '{surface.700}',
            color: '{surface.400}',
            hoverColor: '{surface.0}',
          },
          indicatorButton: {
            background: '{surface.700}',
            hoverBackground: '{surface.600}',
          },
        },
      },
    },
    iconfield: {
      icon: {
        color: '{form.field.icon.color}',
      },
    },
    image: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      preview: {
        icon: {
          size: '1.5rem',
        },
        mask: {
          background: '{mask.background}',
          color: '{mask.color}',
        },
      },
      toolbar: {
        position: {
          left: 'auto',
          right: '1rem',
          top: '1rem',
          bottom: 'auto',
        },
        blur: '8px',
        background: 'rgba(255,255,255,0.1)',
        borderColor: 'rgba(255,255,255,0.2)',
        borderWidth: '1px',
        borderRadius: '30px',
        padding: '.5rem',
        gap: '0.5rem',
      },
      action: {
        hoverBackground: 'rgba(255,255,255,0.1)',
        color: '{surface.50}',
        hoverColor: '{surface.0}',
        size: '3rem',
        iconSize: '1.5rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    imagecompare: {
      handle: {
        size: '20px',
        hoverSize: '40px',
        background: 'rgba(255,255,255,0.4)',
        hoverBackground: 'rgba(255,255,255,0.6)',
        borderColor: 'unset',
        hoverBorderColor: 'unset',
        borderWidth: '0',
        borderRadius: '50%',
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: 'rgba(255,255,255,0.3)',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    inlinemessage: {
      root: {
        padding: '{form.field.padding.y} {form.field.padding.x}',
        borderRadius: '{content.border.radius}',
        gap: '0.5rem',
      },
      text: {
        fontWeight: '500',
      },
      icon: {
        size: '1rem',
      },
      colorScheme: {
        light: {
          info: {
            background: 'color-mix(in srgb, {blue.50}, transparent 5%)',
            borderColor: '{blue.200}',
            color: '{blue.600}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)',
          },
          success: {
            background: 'color-mix(in srgb, {green.50}, transparent 5%)',
            borderColor: '{green.200}',
            color: '{green.600}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)',
          },
          warn: {
            background: 'color-mix(in srgb,{yellow.50}, transparent 5%)',
            borderColor: '{yellow.200}',
            color: '{yellow.600}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)',
          },
          error: {
            background: 'color-mix(in srgb, {red.50}, transparent 5%)',
            borderColor: '{red.200}',
            color: '{red.600}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)',
          },
          secondary: {
            background: '{surface.100}',
            borderColor: '{surface.200}',
            color: '{surface.600}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)',
          },
          contrast: {
            background: '{surface.900}',
            borderColor: '{surface.950}',
            color: '{surface.50}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)',
          },
        },
        dark: {
          info: {
            background: 'color-mix(in srgb, {blue.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {blue.700}, transparent 64%)',
            color: '{blue.500}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)',
          },
          success: {
            background: 'color-mix(in srgb, {green.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {green.700}, transparent 64%)',
            color: '{green.500}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)',
          },
          warn: {
            background: 'color-mix(in srgb, {yellow.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {yellow.700}, transparent 64%)',
            color: '{yellow.500}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)',
          },
          error: {
            background: 'color-mix(in srgb, {red.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {red.700}, transparent 64%)',
            color: '{red.500}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)',
          },
          secondary: {
            background: '{surface.800}',
            borderColor: '{surface.700}',
            color: '{surface.300}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)',
          },
          contrast: {
            background: '{surface.0}',
            borderColor: '{surface.100}',
            color: '{surface.950}',
            shadow:
              '0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)',
          },
        },
      },
    },
    inplace: {
      root: {
        padding: '{form.field.padding.y} {form.field.padding.x}',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        transitionDuration: '{transition.duration}',
      },
      display: {
        hoverBackground: '{content.hover.background}',
        hoverColor: '{content.hover.color}',
      },
    },
    inputchips: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
      },
      chip: {
        borderRadius: '{border.radius.sm}',
      },
      colorScheme: {
        light: {
          chip: {
            focusBackground: '{surface.200}',
            color: '{surface.800}',
          },
        },
        dark: {
          chip: {
            focusBackground: '{surface.700}',
            color: '{surface.0}',
          },
        },
      },
    },
    inputgroup: {
      addon: {
        background: '{form.field.background}',
        borderColor: '{form.field.border.color}',
        color: '{form.field.icon.color}',
        borderRadius: '{form.field.border.radius}',
        padding: '0.75rem',
        minWidth: '3rem',
      },
    },
    inputnumber: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      button: {
        width: '3rem',
        borderRadius: '{form.field.border.radius}',
        verticalPadding: '{form.field.padding.y}',
      },
      colorScheme: {
        light: {
          button: {
            background: 'transparent',
            hoverBackground: '{surface.100}',
            activeBackground: '{surface.200}',
            borderColor: '{form.field.border.color}',
            hoverBorderColor: '{form.field.border.color}',
            activeBorderColor: '{form.field.border.color}',
            color: '{surface.400}',
            hoverColor: '{surface.500}',
            activeColor: '{surface.600}',
          },
        },
        dark: {
          button: {
            background: 'transparent',
            hoverBackground: '{surface.800}',
            activeBackground: '{surface.700}',
            borderColor: '{form.field.border.color}',
            hoverBorderColor: '{form.field.border.color}',
            activeBorderColor: '{form.field.border.color}',
            color: '{surface.400}',
            hoverColor: '{surface.300}',
            activeColor: '{surface.200}',
          },
        },
      },
    },
    inputotp: {
      root: {
        gap: '0.5rem',
      },
      input: {
        width: '3rem',
        sm: {
          width: '2.5rem',
        },
        lg: {
          width: '3.5rem',
        },
      },
    },
    inputtext: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
    },
    knob: {
      root: {
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      value: {
        background: '{primary.color}',
      },
      range: {
        background: '{content.border.color}',
      },
      text: {
        color: '{text.muted.color}',
      },
    },
    listbox: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        borderColor: '{form.field.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        shadow: '{form.field.shadow}',
        borderRadius: '{form.field.border.radius}',
        transitionDuration: '{form.field.transition.duration}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
        header: {
          padding: '{list.header.padding}',
        },
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
      },
      optionGroup: {
        background: '{list.option.group.background}',
        color: '{list.option.group.color}',
        fontWeight: '{list.option.group.font.weight}',
        padding: '{list.option.group.padding}',
      },
      checkmark: {
        color: '{list.option.color}',
        gutterStart: '-0.375rem',
        gutterEnd: '0.375rem',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
      colorScheme: {
        light: {
          option: {
            stripedBackground: '{surface.50}',
          },
        },
        dark: {
          option: {
            stripedBackground: '{surface.900}',
          },
        },
      },
    },
    megamenu: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        gap: '0.5rem',
        verticalOrientation: {
          padding: '{navigation.list.padding}',
          gap: '{navigation.list.gap}',
        },
        horizontalOrientation: {
          padding: '0.5rem 0.75rem',
          gap: '0.5rem',
        },
        transitionDuration: '{transition.duration}',
      },
      baseItem: {
        borderRadius: '{content.border.radius}',
        padding: '{navigation.item.padding}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        activeBackground: '{navigation.item.active.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        activeColor: '{navigation.item.active.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          activeColor: '{navigation.item.icon.active.color}',
        },
      },
      overlay: {
        padding: '0',
        background: '{content.background}',
        borderColor: 'transparent',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        shadow: '{overlay.navigation.shadow}',
        gap: '0.5rem',
      },
      submenu: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
      },
      submenuLabel: {
        padding: '{navigation.submenu.label.padding}',
        fontWeight: '{navigation.submenu.label.font.weight}',
        background: '{navigation.submenu.label.background.}',
        color: '{navigation.submenu.label.color}',
      },
      submenuIcon: {
        size: '{navigation.submenu.icon.size}',
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
        activeColor: '{navigation.submenu.icon.active.color}',
      },
      separator: {
        borderColor: '{content.border.color}',
      },
      mobileButton: {
        borderRadius: '50%',
        size: '2.5rem',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        hoverBackground: '{content.hover.background}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
    },
    menu: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        transitionDuration: '{transition.duration}',
      },
      list: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
        },
      },
      submenuLabel: {
        padding: '{navigation.submenu.label.padding}',
        fontWeight: '{navigation.submenu.label.font.weight}',
        background: '{navigation.submenu.label.background}',
        color: '{navigation.submenu.label.color}',
      },
      separator: {
        borderColor: '{content.border.color}',
      },
    },
    menubar: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        color: '{content.color}',
        gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        transitionDuration: '{transition.duration}',
      },
      baseItem: {
        borderRadius: '{content.border.radius}',
        padding: '{navigation.item.padding}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        activeBackground: '{navigation.item.active.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        activeColor: '{navigation.item.active.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          activeColor: '{navigation.item.icon.active.color}',
        },
      },
      submenu: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
        background: '{content.background}',
        borderColor: 'transparent',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        mobileIndent: '1rem',
        icon: {
          size: '{navigation.submenu.icon.size}',
          color: '{navigation.submenu.icon.color}',
          focusColor: '{navigation.submenu.icon.focus.color}',
          activeColor: '{navigation.submenu.icon.active.color}',
        },
      },
      separator: {
        borderColor: '{content.border.color}',
      },
      mobileButton: {
        borderRadius: '50%',
        size: '2.5rem',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        hoverBackground: '{content.hover.background}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
    },
    message: {
      root: {
        borderRadius: '{content.border.radius}',
        borderWidth: '0',
        transitionDuration: '{transition.duration}',
      },
      content: {
        padding: '1rem 1.25rem',
        gap: '0.5rem',
        sm: {
          padding: '0.625rem 0.625rem',
        },
        lg: {
          padding: '0.825rem 0.825rem',
        },
      },
      text: {
        fontSize: '1rem',
        fontWeight: '500',
        sm: {
          fontSize: '0.875rem',
        },
        lg: {
          fontSize: '1.125rem',
        },
      },
      icon: {
        size: '1.25rem',
        sm: {
          size: '1rem',
        },
        lg: {
          size: '1.5rem',
        },
      },
      closeButton: {
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          offset: '{focus.ring.offset}',
        },
      },
      closeIcon: {
        size: '1rem',
        sm: {
          size: '0.875rem',
        },
        lg: {
          size: '1.125rem',
        },
      },
      outlined: {
        root: {
          borderWidth: '1px',
        },
      },
      simple: {
        content: {
          padding: '0',
        },
      },
      colorScheme: {
        light: {
          info: {
            background: 'color-mix(in srgb, {blue.50}, transparent 5%)',
            borderColor: '{blue.200}',
            color: '{blue.600}',
            shadow: 'none',
            closeButton: {
              hoverBackground: '{blue.100}',
              focusRing: {
                color: '{blue.600}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{blue.600}',
              borderColor: '{blue.600}',
            },
            simple: {
              color: '{blue.600}',
            },
          },
          success: {
            background: 'color-mix(in srgb, {green.50}, transparent 5%)',
            borderColor: '{green.200}',
            color: '{green.600}',
            shadow: 'none',
            closeButton: {
              hoverBackground: '{green.100}',
              focusRing: {
                color: '{green.600}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{green.600}',
              borderColor: '{green.600}',
            },
            simple: {
              color: '{green.600}',
            },
          },
          warn: {
            background: 'color-mix(in srgb,{yellow.50}, transparent 5%)',
            borderColor: '{yellow.200}',
            color: '{yellow.900}',
            shadow: 'none',
            closeButton: {
              hoverBackground: '{yellow.100}',
              focusRing: {
                color: '{yellow.600}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{yellow.900}',
              borderColor: '{yellow.900}',
            },
            simple: {
              color: '{yellow.900}',
            },
          },
          error: {
            background: 'color-mix(in srgb, {red.50}, transparent 5%)',
            borderColor: '{red.200}',
            color: '{red.600}',
            shadow: 'none',
            closeButton: {
              hoverBackground: '{red.100}',
              focusRing: {
                color: '{red.600}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{red.600}',
              borderColor: '{red.600}',
            },
            simple: {
              color: '{red.600}',
            },
          },
          secondary: {
            background: '{surface.100}',
            borderColor: '{surface.200}',
            color: '{surface.600}',
            shadow: 'none',
            closeButton: {
              hoverBackground: '{surface.200}',
              focusRing: {
                color: '{surface.600}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{surface.600}',
              borderColor: '{surface.600}',
            },
            simple: {
              color: '{surface.600}',
            },
          },
          contrast: {
            background: '{surface.900}',
            borderColor: '{surface.950}',
            color: '{surface.50}',
            shadow: 'none',
            closeButton: {
              hoverBackground: '{surface.800}',
              focusRing: {
                color: '{surface.50}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{surface.950}',
              borderColor: '{surface.950}',
            },
            simple: {
              color: '{surface.950}',
            },
          },
        },
        dark: {
          info: {
            background: 'color-mix(in srgb, {blue.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {blue.700}, transparent 64%)',
            color: '{blue.500}',
            shadow: 'none',
            closeButton: {
              hoverBackground: 'rgba(255, 255, 255, 0.05)',
              focusRing: {
                color: '{blue.500}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{blue.500}',
              borderColor: '{blue.500}',
            },
            simple: {
              color: '{blue.500}',
            },
          },
          success: {
            background: 'color-mix(in srgb, {green.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {green.700}, transparent 64%)',
            color: '{green.500}',
            shadow: 'none',
            closeButton: {
              hoverBackground: 'rgba(255, 255, 255, 0.05)',
              focusRing: {
                color: '{green.500}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{green.500}',
              borderColor: '{green.500}',
            },
            simple: {
              color: '{green.500}',
            },
          },
          warn: {
            background: 'color-mix(in srgb, {yellow.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {yellow.700}, transparent 64%)',
            color: '{yellow.500}',
            shadow: 'none',
            closeButton: {
              hoverBackground: 'rgba(255, 255, 255, 0.05)',
              focusRing: {
                color: '{yellow.500}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{yellow.500}',
              borderColor: '{yellow.500}',
            },
            simple: {
              color: '{yellow.500}',
            },
          },
          error: {
            background: 'color-mix(in srgb, {red.500}, transparent 84%)',
            borderColor: 'color-mix(in srgb, {red.700}, transparent 64%)',
            color: '{red.500}',
            shadow: 'none',
            closeButton: {
              hoverBackground: 'rgba(255, 255, 255, 0.05)',
              focusRing: {
                color: '{red.500}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{red.500}',
              borderColor: '{red.500}',
            },
            simple: {
              color: '{red.500}',
            },
          },
          secondary: {
            background: '{surface.800}',
            borderColor: '{surface.700}',
            color: '{surface.300}',
            shadow: 'none',
            closeButton: {
              hoverBackground: '{surface.700}',
              focusRing: {
                color: '{surface.300}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{surface.400}',
              borderColor: '{surface.400}',
            },
            simple: {
              color: '{surface.400}',
            },
          },
          contrast: {
            background: '{surface.0}',
            borderColor: '{surface.100}',
            color: '{surface.950}',
            shadow: 'none',
            closeButton: {
              hoverBackground: '{surface.100}',
              focusRing: {
                color: '{surface.950}',
                shadow: 'none',
              },
            },
            outlined: {
              color: '{surface.0}',
              borderColor: '{surface.0}',
            },
            simple: {
              color: '{surface.0}',
            },
          },
        },
      },
    },
    metergroup: {
      root: {
        borderRadius: '{content.border.radius}',
        gap: '1rem',
      },
      meters: {
        background: '{content.border.color}',
        size: '0.5rem',
      },
      label: {
        gap: '0.5rem',
      },
      labelMarker: {
        size: '0.5rem',
      },
      labelIcon: {
        size: '1rem',
      },
      labelList: {
        verticalGap: '0.5rem',
        horizontalGap: '1rem',
      },
    },
    multiselect: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
      dropdown: {
        width: '2.5rem',
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
        header: {
          padding: '{list.header.padding}',
        },
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
        gap: '0.75rem',
      },
      optionGroup: {
        background: '{list.option.group.background}',
        color: '{list.option.group.color}',
        fontWeight: '{list.option.group.font.weight}',
        padding: '{list.option.group.padding}',
      },
      chip: {
        borderRadius: '{border.radius.sm}',
      },
      clearIcon: {
        color: '{form.field.icon.color}',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
    },
    orderlist: {
      root: {
        gap: '1.125rem',
      },
      controls: {
        gap: '0.5rem',
      },
    },
    organizationchart: {
      root: {
        gutter: '0.75rem',
        transitionDuration: '{transition.duration}',
      },
      node: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        selectedColor: '{highlight.color}',
        hoverColor: '{content.hover.color}',
        padding: '1rem 1.25rem',
        toggleablePadding: '1rem 1.25rem 1.5rem 1.25rem',
        borderRadius: '{content.border.radius}',
      },
      nodeToggleButton: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        borderColor: '{content.border.color}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        size: '1.75rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      connector: {
        color: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        height: '24px',
      },
    },
    overlaybadge: {
      root: {
        outline: {
          width: '2px',
          color: '{content.background}',
        },
      },
    },
    popover: {
      root: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        color: '{overlay.popover.color}',
        borderRadius: '{overlay.popover.border.radius}',
        shadow: '{overlay.popover.shadow}',
        gutter: '10px',
        arrowOffset: '1.25rem',
      },
      content: {
        padding: '{overlay.popover.padding}',
      },
    },
    paginator: {
      root: {
        padding: '0.5rem 1rem',
        gap: '0.25rem',
        borderRadius: '{content.border.radius}',
        background: '{content.background}',
        color: '{content.color}',
        transitionDuration: '{transition.duration}',
      },
      navButton: {
        background: 'transparent',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        selectedColor: '{highlight.color}',
        width: '2.5rem',
        height: '2.5rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      currentPageReport: {
        color: '{text.muted.color}',
      },
      jumpToPageInput: {
        maxWidth: '2.5rem',
      },
    },
    password: {
      meter: {
        background: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        height: '.75rem',
      },
      icon: {
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.popover.background}',
        borderColor: '{overlay.popover.border.color}',
        borderRadius: '{overlay.popover.border.radius}',
        color: '{overlay.popover.color}',
        padding: '{overlay.popover.padding}',
        shadow: '{overlay.popover.shadow}',
      },
      content: {
        gap: '0.5rem',
      },
      colorScheme: {
        light: {
          strength: {
            weakBackground: '{red.500}',
            mediumBackground: '{amber.500}',
            strongBackground: '{green.500}',
          },
        },
        dark: {
          strength: {
            weakBackground: '{red.400}',
            mediumBackground: '{amber.400}',
            strongBackground: '{green.400}',
          },
        },
      },
    },
    panel: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
      },
      header: {
        background: 'transparent',
        color: '{text.color}',
        padding: '1.25rem',
        borderColor: '{content.border.color}',
        borderWidth: '0',
        borderRadius: '0',
      },
      toggleableHeader: {
        padding: '0.5rem 1.25rem',
      },
      title: {
        fontWeight: '600',
      },
      content: {
        padding: '0 1.25rem 1.25rem 1.25rem',
      },
      footer: {
        padding: '0 1.25rem 1.25rem 1.25rem',
      },
    },
    panelmenu: {
      root: {
        gap: '0',
        transitionDuration: '{transition.duration}',
      },
      panel: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        borderWidth: '0',
        color: '{content.color}',
        padding: '0',
        borderRadius: '0',
        first: {
          borderWidth: '0',
          topBorderRadius: '{content.border.radius}',
        },
        last: {
          borderWidth: '0',
          bottomBorderRadius: '{content.border.radius}',
        },
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        gap: '0.5rem',
        padding: '{navigation.item.padding}',
        borderRadius: '{content.border.radius}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
        },
      },
      submenu: {
        indent: '1rem',
      },
      submenuIcon: {
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
      },
    },
    picklist: {
      root: {
        gap: '1.125rem',
      },
      controls: {
        gap: '0.5rem',
      },
    },
    progressbar: {
      root: {
        background: '{content.border.color}',
        borderRadius: '{content.border.radius}',
        height: '1rem',
      },
      value: {
        background: '{primary.color}',
      },
      label: {
        color: '{primary.contrast.color}',
        fontSize: '0.75rem',
        fontWeight: '600',
      },
    },
    progressspinner: {
      colorScheme: {
        light: {
          root: {
            // color.1: "{red.500}",
            // color.2: "{blue.500}",
            // color.3: "{green.500}",
            // color.4: "{yellow.500}"
          },
        },
        dark: {
          root: {
            // color.1: "{red.400}",
            // color.2: "{blue.400}",
            // color.3: "{green.400}",
            // color.4: "{yellow.400}"
          },
        },
      },
    },
    radiobutton: {
      root: {
        width: '20px',
        height: '20px',
        background: '{form.field.background}',
        checkedBackground: '{primary.contrast.color}',
        checkedHoverBackground: '{primary.contrast.color}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        checkedBorderColor: '{primary.color}',
        checkedHoverBorderColor: '{primary.color}',
        checkedFocusBorderColor: '{primary.color}',
        checkedDisabledBorderColor: '{form.field.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        shadow: '{form.field.shadow}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          width: '16px',
          height: '16px',
        },
        lg: {
          width: '24px',
          height: '24px',
        },
      },
      icon: {
        size: '10px',
        checkedColor: '{primary.color}',
        checkedHoverColor: '{primary.color}',
        disabledColor: '{form.field.disabled.color}',
        sm: {
          size: '8px',
        },
        lg: {
          size: '12px',
        },
      },
    },
    rating: {
      root: {
        gap: '0.5rem',
        transitionDuration: '{transition.duration}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
      icon: {
        size: '1.125rem',
        color: '{text.muted.color}',
        hoverColor: '{primary.color}',
        activeColor: '{primary.color}',
      },
    },
    scrollpanel: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      bar: {
        size: '9px',
        borderRadius: '{border.radius.sm}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      colorScheme: {
        light: {
          bar: {
            background: '{surface.200}',
          },
        },
        dark: {
          bar: {
            background: '{surface.700}',
          },
        },
      },
    },
    select: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
      dropdown: {
        width: '2.5rem',
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      list: {
        padding: '{list.padding}',
        gap: '{list.gap}',
        header: {
          padding: '{list.header.padding}',
        },
      },
      option: {
        focusBackground: '{list.option.focus.background}',
        selectedBackground: '{list.option.selected.background}',
        selectedFocusBackground: '{list.option.selected.focus.background}',
        color: '{list.option.color}',
        focusColor: '{list.option.focus.color}',
        selectedColor: '{list.option.selected.color}',
        selectedFocusColor: '{list.option.selected.focus.color}',
        padding: '{list.option.padding}',
        borderRadius: '{list.option.border.radius}',
      },
      optionGroup: {
        background: '{list.option.group.background}',
        color: '{list.option.group.color}',
        fontWeight: '{list.option.group.font.weight}',
        padding: '{list.option.group.padding}',
      },
      clearIcon: {
        color: '{form.field.icon.color}',
      },
      checkmark: {
        color: '{list.option.color}',
        gutterStart: '-0.375rem',
        gutterEnd: '0.375rem',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
    },
    selectbutton: {
      root: {
        borderRadius: '{form.field.border.radius}',
      },
      colorScheme: {
        light: {
          root: {
            invalidBorderColor: '{form.field.invalid.border.color}',
          },
        },
        dark: {
          root: {
            invalidBorderColor: '{form.field.invalid.border.color}',
          },
        },
      },
    },
    skeleton: {
      root: {
        borderRadius: '{content.border.radius}',
      },
      colorScheme: {
        light: {
          root: {
            background: '{surface.200}',
            animationBackground: 'rgba(255,255,255,0.4)',
          },
        },
        dark: {
          root: {
            background: 'rgba(255, 255, 255, 0.06)',
            animationBackground: 'rgba(255, 255, 255, 0.04)',
          },
        },
      },
    },
    slider: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      track: {
        background: '{content.border.color}',
        borderRadius: '{border.radius.xs}',
        size: '2px',
      },
      range: {
        background: '{primary.color}',
      },
      handle: {
        width: '18px',
        height: '18px',
        borderRadius: '50%',
        background: '{primary.color}',
        hoverBackground: '{primary.color}',
        content: {
          borderRadius: '50%',
          hoverBackground: '{primary.color}',
          width: '18px',
          height: '18px',
          shadow:
            '0px 2px 1px -1px rgba(0, 0, 0, .2), 0px 1px 1px 0px rgba(0, 0, 0, .14), 0px 1px 3px 0px rgba(0, 0, 0, .12)',
        },
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
    },
    speeddial: {
      root: {
        gap: '0.5rem',
        transitionDuration: '{transition.duration}',
      },
    },
    splitter: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        transitionDuration: '{transition.duration}',
      },
      gutter: {
        background: '{content.border.color}',
      },
      handle: {
        size: '24px',
        background: 'transparent',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
    },
    splitbutton: {
      root: {
        borderRadius: '{form.field.border.radius}',
        roundedBorderRadius: '2rem',
        raisedShadow:
          '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
      },
    },
    stepper: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      separator: {
        background: '{content.border.color}',
        activeBackground: '{primary.color}',
        margin: '0 0 0 1.625rem',
        size: '2px',
      },
      step: {
        padding: '0.5rem',
        gap: '1rem',
      },
      stepHeader: {
        padding: '0.75rem 1rem',
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
        gap: '0.5rem',
      },
      stepTitle: {
        color: '{text.muted.color}',
        activeColor: '{text.color}',
        fontWeight: '500',
      },
      stepNumber: {
        activeBackground: '{primary.color}',
        activeBorderColor: '{primary.color}',
        activeColor: '{primary.contrast.color}',
        size: '2rem',
        fontSize: '1.143rem',
        fontWeight: '500',
        borderRadius: '50%',
        shadow: 'none',
      },
      steppanels: {
        padding: '0.875rem 0.5rem 1.125rem 0.5rem',
      },
      steppanel: {
        background: '{content.background}',
        color: '{content.color}',
        padding: '0',
        indent: '1rem',
      },
      colorScheme: {
        light: {
          stepNumber: {
            background: '{surface.400}',
            borderColor: '{surface.400}',
            color: '{surface.0}',
          },
        },
        dark: {
          stepNumber: {
            background: '{surface.200}',
            borderColor: '{surface.200}',
            color: '{surface.900}',
          },
        },
      },
    },
    steps: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      separator: {
        background: '{content.border.color}',
      },
      itemLink: {
        borderRadius: '{content.border.radius}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
        gap: '0.5rem',
      },
      itemLabel: {
        color: '{text.muted.color}',
        activeColor: '{primary.color}',
        fontWeight: '500',
      },
      itemNumber: {
        background: '{content.background}',
        activeBackground: '{content.background}',
        borderColor: '{content.border.color}',
        activeBorderColor: '{content.border.color}',
        color: '{text.muted.color}',
        activeColor: '{primary.color}',
        size: '2rem',
        fontSize: '1.143rem',
        fontWeight: '500',
        borderRadius: '50%',
        shadow:
          '0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)',
      },
    },
    tabmenu: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      tablist: {
        borderWidth: '0 0 1px 0',
        background: '{content.background}',
        borderColor: '{content.border.color}',
      },
      item: {
        background: 'transparent',
        hoverBackground: 'transparent',
        activeBackground: 'transparent',
        borderWidth: '0 0 1px 0',
        borderColor: '{content.border.color}',
        hoverBorderColor: '{content.border.color}',
        activeBorderColor: '{primary.color}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
        padding: '1rem 1.125rem',
        fontWeight: '600',
        margin: '0 0 -1px 0',
        gap: '0.5rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      itemIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
      },
      activeBar: {
        height: '1px',
        bottom: '-1px',
        background: '{primary.color}',
      },
    },
    tabs: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      tablist: {
        borderWidth: '0 0 1px 0',
        background: '{content.background}',
        borderColor: '{content.border.color}',
      },
      tab: {
        background: 'transparent',
        hoverBackground: '{content.hover.background}',
        activeBackground: 'transparent',
        borderWidth: '0 0 1px 0',
        borderColor: '{content.border.color}',
        hoverBorderColor: '{content.border.color}',
        activeBorderColor: '{primary.color}',
        color: '{text.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
        padding: '1rem 1.25rem',
        fontWeight: '600',
        margin: '0 0 -1px 0',
        gap: '0.5rem',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
      tabpanel: {
        background: '{content.background}',
        color: '{content.color}',
        padding: '1.25rem 1.25rem 1.25rem 1.25rem',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
      navButton: {
        background: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        width: '3rem',
        shadow: 'none',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
      },
      activeBar: {
        height: '2px',
        bottom: '-1px',
        background: '{primary.color}',
      },
    },
    tabview: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      tabList: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
      },
      tab: {
        borderColor: '{content.border.color}',
        activeBorderColor: '{primary.color}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        activeColor: '{primary.color}',
      },
      tabPanel: {
        background: '{content.background}',
        color: '{content.color}',
      },
      navButton: {
        background: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
      },
      colorScheme: {
        light: {
          navButton: {
            shadow: '0px 0px 10px 50px rgba(255, 255, 255, 0.6)',
          },
        },
        dark: {
          navButton: {
            shadow:
              '0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)',
          },
        },
      },
    },
    textarea: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
    },
    tieredmenu: {
      root: {
        background: '{content.background}',
        borderColor: '{content.border.color}',
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        shadow: '{overlay.navigation.shadow}',
        transitionDuration: '{transition.duration}',
      },
      list: {
        padding: '{navigation.list.padding}',
        gap: '{navigation.list.gap}',
      },
      item: {
        focusBackground: '{navigation.item.focus.background}',
        activeBackground: '{navigation.item.active.background}',
        color: '{navigation.item.color}',
        focusColor: '{navigation.item.focus.color}',
        activeColor: '{navigation.item.active.color}',
        padding: '{navigation.item.padding}',
        borderRadius: '{navigation.item.border.radius}',
        gap: '{navigation.item.gap}',
        icon: {
          color: '{navigation.item.icon.color}',
          focusColor: '{navigation.item.icon.focus.color}',
          activeColor: '{navigation.item.icon.active.color}',
        },
      },
      submenu: {
        mobileIndent: '1rem',
      },
      submenuIcon: {
        size: '{navigation.submenu.icon.size}',
        color: '{navigation.submenu.icon.color}',
        focusColor: '{navigation.submenu.icon.focus.color}',
        activeColor: '{navigation.submenu.icon.active.color}',
      },
      separator: {
        borderColor: '{content.border.color}',
      },
    },
    tag: {
      root: {
        fontSize: '0.875rem',
        fontWeight: '700',
        padding: '0.25rem 0.5rem',
        gap: '0.25rem',
        borderRadius: '{content.border.radius}',
        roundedBorderRadius: '{border.radius.xl}',
      },
      icon: {
        size: '0.75rem',
      },
      colorScheme: {
        light: {
          primary: {
            background: '{primary.color}',
            color: '{primary.contrast.color}',
          },
          secondary: {
            background: '{surface.100}',
            color: '{surface.600}',
          },
          success: {
            background: '{green.500}',
            color: '{surface.0}',
          },
          info: {
            background: '{sky.500}',
            color: '{surface.0}',
          },
          warn: {
            background: '{orange.500}',
            color: '{surface.0}',
          },
          danger: {
            background: '{red.500}',
            color: '{surface.0}',
          },
          contrast: {
            background: '{surface.950}',
            color: '{surface.0}',
          },
        },
        dark: {
          primary: {
            background: '{primary.color}',
            color: '{primary.contrast.color}',
          },
          secondary: {
            background: '{surface.800}',
            color: '{surface.300}',
          },
          success: {
            background: '{green.400}',
            color: '{green.950}',
          },
          info: {
            background: '{sky.400}',
            color: '{sky.950}',
          },
          warn: {
            background: '{orange.400}',
            color: '{orange.950}',
          },
          danger: {
            background: '{red.400}',
            color: '{red.950}',
          },
          contrast: {
            background: '{surface.0}',
            color: '{surface.950}',
          },
        },
      },
    },
    terminal: {
      root: {
        background: '{form.field.background}',
        borderColor: '{form.field.border.color}',
        color: '{form.field.color}',
        height: '18rem',
        padding: '{form.field.padding.y} {form.field.padding.x}',
        borderRadius: '{form.field.border.radius}',
      },
      prompt: {
        gap: '0.25rem',
      },
      commandResponse: {
        margin: '2px 0',
      },
    },
    timeline: {
      event: {
        minHeight: '5rem',
      },
      horizontal: {
        eventContent: {
          padding: '1rem 0',
        },
      },
      vertical: {
        eventContent: {
          padding: '0 1rem',
        },
      },
      eventMarker: {
        size: '1.5rem',
        borderRadius: '50%',
        borderWidth: '2px',
        background: '{primary.color}',
        content: {
          borderRadius: '50%',
          size: '0',
          background: '{primary.color}',
          insetShadow: 'none',
        },
      },
      eventConnector: {
        color: '{content.border.color}',
        size: '2px',
      },
      colorScheme: {
        light: {
          eventMarker: {
            borderColor: '{surface.0}',
          },
        },
        dark: {
          eventMarker: {
            borderColor: '{surface.900}',
          },
        },
      },
    },
    togglebutton: {
      root: {
        padding: '0.75rem 1rem',
        borderRadius: '{form.field.border.radius}',
        gap: '0.5rem',
        fontWeight: '500',
        background: '{form.field.background}',
        borderColor: '{form.field.border.color}',
        color: '{form.field.color}',
        hoverColor: '{form.field.color}',
        checkedColor: '{form.field.color}',
        checkedBorderColor: '{form.field.border.color}',
        disabledBackground: '{form.field.disabled.background}',
        disabledBorderColor: '{form.field.disabled.background}',
        disabledColor: '{form.field.disabled.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        focusRing: {
          width: '0',
          style: 'none',
          offset: '0',
          color: 'unset',
          shadow: 'none',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          padding: '0.625rem 0.75rem',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          padding: '0.875rem 1.25rem',
        },
      },
      icon: {
        color: '{text.muted.color}',
        hoverColor: '{text.muted.color}',
        checkedColor: '{text.muted.color}',
        disabledColor: '{form.field.disabled.color}',
      },
      content: {
        checkedBackground: 'transparent',
        checkedShadow: 'none',
      },
      colorScheme: {
        light: {
          root: {
            hoverBackground: '{surface.100}',
            checkedBackground: '{surface.200}',
          },
        },
        dark: {
          root: {
            hoverBackground: '{surface.800}',
            checkedBackground: '{surface.700}',
          },
        },
      },
    },
    toggleswitch: {
      root: {
        width: '2.75rem',
        height: '1rem',
        borderRadius: '30px',
        gap: '0px',
        shadow: 'none',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'unset',
          offset: '0',
          shadow: 'none',
        },
        borderWidth: '1px',
        borderColor: 'transparent',
        hoverBorderColor: 'transparent',
        checkedBorderColor: 'transparent',
        checkedHoverBorderColor: 'transparent',
        invalidBorderColor: '{form.field.invalid.border.color}',
        transitionDuration: '{form.field.transition.duration}',
        slideDuration: '0.2s',
      },
      handle: {
        borderRadius: '50%',
        size: '1.5rem',
      },
      colorScheme: {
        light: {
          root: {
            background: '{surface.300}',
            disabledBackground: '{surface.400}',
            hoverBackground: '{surface.300}',
            checkedBackground: '{primary.200}',
            checkedHoverBackground: '{primary.200}',
          },
          handle: {
            background: '{surface.0}',
            disabledBackground: '{surface.200}',
            hoverBackground: '{surface.0}',
            checkedBackground: '{primary.color}',
            checkedHoverBackground: '{primary.color}',
            color: '{text.muted.color}',
            hoverColor: '{text.color}',
            checkedColor: '{primary.contrast.color}',
            checkedHoverColor: '{primary.contrast.color}',
          },
        },
        dark: {
          root: {
            background: '{surface.700}',
            disabledBackground: '{surface.600}',
            hoverBackground: '{surface.700}',
            checkedBackground: '{primary.color}',
            checkedHoverBackground: '{primary.color}',
          },
          handle: {
            background: '{surface.400}',
            disabledBackground: '{surface.500}',
            hoverBackground: '{surface.300}',
            checkedBackground: '{primary.200}',
            checkedHoverBackground: '{primary.200}',
            color: '{surface.800}',
            hoverColor: '{surface.900}',
            checkedColor: '{primary.contrast.color}',
            checkedHoverColor: '{primary.contrast.color}',
          },
        },
      },
    },
    tree: {
      root: {
        background: '{content.background}',
        color: '{content.color}',
        padding: '1rem',
        gap: '2px',
        indent: '2rem',
        transitionDuration: '{transition.duration}',
      },
      node: {
        padding: '0.5rem 0.75rem',
        borderRadius: '{border.radius.xs}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{text.color}',
        hoverColor: '{text.hover.color}',
        selectedColor: '{highlight.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
        gap: '0.5rem',
      },
      nodeIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        selectedColor: '{highlight.color}',
      },
      nodeToggleButton: {
        borderRadius: '50%',
        size: '2rem',
        hoverBackground: '{content.hover.background}',
        selectedHoverBackground: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        selectedHoverColor: '{primary.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      loadingIcon: {
        size: '2rem',
      },
      filter: {
        margin: '0 0 0.75rem 0',
      },
    },
    treeselect: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledHoverBackground: '{form.field.filled.hover.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.hover.border.color}',
        focusBorderColor: '{form.field.focus.border.color}',
        invalidBorderColor: '{form.field.invalid.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.invalid.placeholder.color}',
        shadow: '{form.field.shadow}',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{form.field.border.radius}',
        focusRing: {
          width: '{form.field.focus.ring.width}',
          style: '{form.field.focus.ring.style}',
          color: '{form.field.focus.ring.color}',
          offset: '{form.field.focus.ring.offset}',
          shadow: '{form.field.focus.ring.shadow}',
        },
        transitionDuration: '{form.field.transition.duration}',
        sm: {
          fontSize: '{form.field.sm.font.size}',
          paddingX: '{form.field.sm.padding.x}',
          paddingY: '{form.field.sm.padding.y}',
        },
        lg: {
          fontSize: '{form.field.lg.font.size}',
          paddingX: '{form.field.lg.padding.x}',
          paddingY: '{form.field.lg.padding.y}',
        },
      },
      dropdown: {
        width: '2.5rem',
        color: '{form.field.icon.color}',
      },
      overlay: {
        background: '{overlay.select.background}',
        borderColor: '{overlay.select.border.color}',
        borderRadius: '{overlay.select.border.radius}',
        color: '{overlay.select.color}',
        shadow: '{overlay.select.shadow}',
      },
      tree: {
        padding: '{list.padding}',
      },
      emptyMessage: {
        padding: '{list.option.padding}',
      },
      chip: {
        borderRadius: '{border.radius.sm}',
      },
      clearIcon: {
        color: '{form.field.icon.color}',
      },
    },
    treetable: {
      root: {
        transitionDuration: '{transition.duration}',
      },
      header: {
        background: '{content.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.75rem 1rem',
      },
      headerCell: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      columnTitle: {
        fontWeight: '600',
      },
      row: {
        background: '{content.background}',
        hoverBackground: '{content.hover.background}',
        selectedBackground: '{highlight.background}',
        color: '{content.color}',
        hoverColor: '{content.hover.color}',
        selectedColor: '{highlight.color}',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '-1px',
          shadow: '{focus.ring.shadow}',
        },
      },
      bodyCell: {
        borderColor: '{treetable.border.color}',
        padding: '0.75rem 1rem',
        gap: '0.5rem',
      },
      footerCell: {
        background: '{content.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        padding: '0.75rem 1rem',
      },
      columnFooter: {
        fontWeight: '600',
      },
      footer: {
        background: '{content.background}',
        borderColor: '{treetable.border.color}',
        color: '{content.color}',
        borderWidth: '0 0 1px 0',
        padding: '0.75rem 1rem',
      },
      resizeIndicator: {
        width: '1px',
        color: '{primary.color}',
      },
      sortIcon: {
        color: '{text.muted.color}',
        hoverColor: '{text.hover.muted.color}',
        size: '0.875rem',
      },
      loadingIcon: {
        size: '2rem',
      },
      nodeToggleButton: {
        hoverBackground: '{content.hover.background}',
        selectedHoverBackground: '{content.background}',
        color: '{text.muted.color}',
        hoverColor: '{text.color}',
        selectedHoverColor: '{primary.color}',
        size: '1.75rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          color: '{focus.ring.color}',
          offset: '{focus.ring.offset}',
          shadow: '{focus.ring.shadow}',
        },
      },
      paginatorTop: {
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0',
      },
      paginatorBottom: {
        borderColor: '{content.border.color}',
        borderWidth: '0 0 1px 0',
      },
      colorScheme: {
        light: {
          root: {
            borderColor: '{content.border.color}',
          },
          bodyCell: {
            selectedBorderColor: '{primary.100}',
          },
        },
        dark: {
          root: {
            borderColor: '{surface.800}',
          },
          bodyCell: {
            selectedBorderColor: '{primary.900}',
          },
        },
      },
    },
    toast: {
      root: {
        width: '25rem',
        borderRadius: '{content.border.radius}',
        borderWidth: '0',
        transitionDuration: '{transition.duration}',
      },
      icon: {
        size: '1.25rem',
      },
      content: {
        padding: '{overlay.popover.padding}',
        gap: '0.5rem',
      },
      text: {
        gap: '0.5rem',
      },
      summary: {
        fontWeight: '500',
        fontSize: '1rem',
      },
      detail: {
        fontWeight: '500',
        fontSize: '0.875rem',
      },
      closeButton: {
        width: '2rem',
        height: '2rem',
        borderRadius: '50%',
        focusRing: {
          width: '{focus.ring.width}',
          style: '{focus.ring.style}',
          offset: '{focus.ring.offset}',
        },
      },
      closeIcon: {
        size: '1rem',
      },
      colorScheme: {
        light: {
          info: {
            background: '{blue.50}',
            borderColor: '{blue.200}',
            color: '{blue.600}',
            detailColor: '{surface.700}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: '{blue.100}',
              focusRing: {
                color: '{blue.600}',
                shadow: 'none',
              },
            },
          },
          success: {
            background: '{green.50}',
            borderColor: '{green.200}',
            color: '{green.600}',
            detailColor: '{surface.700}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: '{green.100}',
              focusRing: {
                color: '{green.600}',
                shadow: 'none',
              },
            },
          },
          warn: {
            background: '{yellow.50}',
            borderColor: '{yellow.200}',
            color: '{yellow.900}',
            detailColor: '{surface.700}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: '{yellow.100}',
              focusRing: {
                color: '{yellow.600}',
                shadow: 'none',
              },
            },
          },
          error: {
            background: '{red.50}',
            borderColor: '{red.200}',
            color: '{red.600}',
            detailColor: '{surface.700}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: '{red.100}',
              focusRing: {
                color: '{red.600}',
                shadow: 'none',
              },
            },
          },
          secondary: {
            background: '{surface.100}',
            borderColor: '{surface.200}',
            color: '{surface.600}',
            detailColor: '{surface.700}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: '{surface.200}',
              focusRing: {
                color: '{surface.600}',
                shadow: 'none',
              },
            },
          },
          contrast: {
            background: '{surface.900}',
            borderColor: '{surface.950}',
            color: '{surface.50}',
            detailColor: '{surface.0}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: '{surface.800}',
              focusRing: {
                color: '{surface.50}',
                shadow: 'none',
              },
            },
          },
        },
        dark: {
          info: {
            background: 'color-mix(in srgb, {blue.500}, transparent 36%)',
            borderColor: 'color-mix(in srgb, {blue.700}, transparent 64%)',
            color: '{surface.0}',
            detailColor: '{blue.100}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: 'rgba(255, 255, 255, 0.05)',
              focusRing: {
                color: '{blue.500}',
                shadow: 'none',
              },
            },
          },
          success: {
            background: 'color-mix(in srgb, {green.500}, transparent 36%)',
            borderColor: 'color-mix(in srgb, {green.700}, transparent 64%)',
            color: '{surface.0}',
            detailColor: '{green.100}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: 'rgba(255, 255, 255, 0.05)',
              focusRing: {
                color: '{green.500}',
                shadow: 'none',
              },
            },
          },
          warn: {
            background: 'color-mix(in srgb, {yellow.500}, transparent 36%)',
            borderColor: 'color-mix(in srgb, {yellow.700}, transparent 64%)',
            color: '{surface.0}',
            detailColor: '{yellow.50}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: 'rgba(255, 255, 255, 0.05)',
              focusRing: {
                color: '{yellow.500}',
                shadow: 'none',
              },
            },
          },
          error: {
            background: 'color-mix(in srgb, {red.500}, transparent 36%)',
            borderColor: 'color-mix(in srgb, {red.700}, transparent 64%)',
            color: '{surface.0}',
            detailColor: '{red.100}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: 'rgba(255, 255, 255, 0.05)',
              focusRing: {
                color: '{red.500}',
                shadow: 'none',
              },
            },
          },
          secondary: {
            background: '{surface.800}',
            borderColor: '{surface.700}',
            color: '{surface.300}',
            detailColor: '{surface.0}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: '{surface.700}',
              focusRing: {
                color: '{surface.300}',
                shadow: 'none',
              },
            },
          },
          contrast: {
            background: '{surface.0}',
            borderColor: '{surface.100}',
            color: '{surface.950}',
            detailColor: '{surface.950}',
            shadow:
              '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
            closeButton: {
              hoverBackground: '{surface.100}',
              focusRing: {
                color: '{surface.950}',
                shadow: 'none',
              },
            },
          },
        },
      },
    },
    toolbar: {
      root: {
        color: '{content.color}',
        borderRadius: '{content.border.radius}',
        gap: '0.5rem',
        padding: '1rem',
      },
      colorScheme: {
        light: {
          root: {
            background: '{surface.100}',
            borderColor: '{surface.100}',
          },
        },
        dark: {
          root: {
              background: '{surface.800}',
              borderColor: '{surface.800}',
          },
        },
      },
    },
    virtualscroller: {
      loader: {
        mask: {
          background: '{content.background}',
          color: '{text.muted.color}',
        },
        icon: {
          size: '2rem',
        },
      },
    },
    tooltip: {
      root: {
        background: '{surface.600}',
        color: '{surface.0}',
        maxWidth: '12.5rem',
        gutter: '0.25rem',
        shadow: '{overlay.popover.shadow}',
        padding: '0.5rem 0.75rem',
        borderRadius: '{overlay.popover.border.radius}',
      },
    },
    ripple: {
      colorScheme: {
        light: {
          root: {
            background: 'rgba(0,0,0,0.1)',
          },
        },
        dark: {
          root: {
            background: 'rgba(255,255,255,0.3)',
          },
        },
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: IISUPAOTheme,
      },
    }),
  ],
};
