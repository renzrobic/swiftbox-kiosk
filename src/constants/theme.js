export const THEME = {
  COLORS: {
    LABEL: '#000000',
    SECONDARY_LABEL: '#8E8E93',
    TERTIARY_LABEL: '#C7C7CC',
    
    BACKGROUND: '#FFFFFF',
    SECONDARY_BACKGROUND: '#F2F2F7',
    
    WHITE: '#FFFFFF',
    INK: '#000000',
    
    ACCENT: '#000000',
    SUCCESS: '#34C759',
    DANGER: '#FF3B30',
  },
  
  FONTS: {
    FAMILY_MEDIUM: 'Inter-Medium',     
    FAMILY_SEMIBOLD: 'Inter-SemiBold', 
    FAMILY_BOLD: 'Inter-Bold',
    
    TRACKING_HEADER: -0.022,
    TRACKING_BODY: -0.011,
    
    LINE_HEIGHT_MULT: 1.25,
  },
  
  SPACING: {
    G8: 8,
    G16: 16,
    G24: 24,
    G32: 32,
    G40: 40,
    G48: 48,
    G64: 64,
    G80: 80,
    G120: 120,
    
    RADIUS_S: 12,
    RADIUS_M: 24,
    RADIUS_L: 100,              // FORCED PILL GEOMETRY
    RADIUS_BUTTON: 100,         // FORCED PILL GEOMETRY
    
    KIOSK_PADDING: 64,
  },
  
  SHADOWS: {
    SM: { 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 4 }, 
      shadowOpacity: 0.05, 
      shadowRadius: 10, 
      elevation: 2 
    },
    MD: { 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 8 }, 
      shadowOpacity: 0.08, 
      shadowRadius: 24, 
      elevation: 5 
    },
    LG: { 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 16 }, 
      shadowOpacity: 0.12, 
      shadowRadius: 32, 
      elevation: 10 
    },
    APPLE_PREMIUM: { 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 20 }, 
      shadowOpacity: 0.1, 
      shadowRadius: 40, 
      elevation: 12 
    },
    FIGMA_CARD: { 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 12 }, 
      shadowOpacity: 0.06, 
      shadowRadius: 24, 
      elevation: 4 
    },
  }
};