import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#270637', // Deep rich purple (Accent)
          secondary: '#221A26', // Dark desaturated purple-grey
          accent: '#270637', // Deep rich purple
          background: '#120B15', // Very dark purplish-grey (BG)
          surface: '#221A26', // Secondary
          'surface-variant': '#34283A', // Tertiary
          error: '#EF4444',
          info: '#3B82F6',
          success: '#10B981',
          warning: '#F59E0B',
          'on-primary': '#F3DBD7', // Title color (pale pink/off-white)
          'on-surface': '#F3DBD7', // Title color for text
          'on-background': '#9A8F98', // Body color (muted grey-purple)
          gold: '#F3D6B1', // Light gold
          'gold-dark': '#C19161', // Dark gold
        },
      },
      light: {
        colors: {
          primary: '#8B5CF6',
          secondary: '#1F1F1F',
          accent: '#A78BFA',
          background: '#FAFAFA',
          surface: '#FFFFFF',
          'surface-variant': '#F5F5F5',
          error: '#EF4444',
          info: '#3B82F6',
          success: '#10B981',
          warning: '#F59E0B',
          'on-primary': '#FFFFFF',
          'on-surface': '#1F1F1F',
        },
      },
    },
  },
  defaults: {
    VCard: {
      elevation: 0,
      variant: 'flat',
    },
    VBtn: {
      elevation: 0,
      style: 'text-transform: uppercase; font-weight: 700; letter-spacing: 0.5px; font-family: "Nunito Sans", sans-serif;',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },
  },
})

