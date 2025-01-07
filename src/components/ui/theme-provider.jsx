 import { createContext, useContext, useEffect, useState } from 'react';

 // Initial state
 const initialState = {
   theme: 'system',
   setTheme: () => null,
 };

 // Create the context
 const ThemeProviderContext = createContext(initialState);

 export function ThemeProvider({
   children,
   defaultTheme = 'system',
   storageKey = 'vite-ui-theme',
   ...props
 }) {
   const [theme, setTheme] = useState(() => {
     return localStorage.getItem(storageKey) || defaultTheme;
   });

   useEffect(() => {
     const root = window.document.documentElement;

     // Remove existing theme classes
     root.classList.remove('light', 'dark');

     if (theme === 'system') {
       // Detect system theme
       const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
         .matches
         ? 'dark'
         : 'light';

       root.classList.add(systemTheme);
       return;
     }

     // Add the selected theme
     root.classList.add(theme);
   }, [theme]);

   const value = {
     theme,
     setTheme: (theme) => {
       localStorage.setItem(storageKey, theme);
       setTheme(theme);
     },
   };

   return (
     <ThemeProviderContext.Provider {...props} value={value}>
       {children}
     </ThemeProviderContext.Provider>
   );
 }

 // Hook to use the theme
 export const useTheme = () => {
   const context = useContext(ThemeProviderContext);

   if (context === undefined) {
     throw new Error('useTheme must be used within a ThemeProvider');
   }

   return context;
 };
