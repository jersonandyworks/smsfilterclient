{
    "compilerOptions": {
      "target": "ES2017",
      "lib": ["es6", "dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": false,
      "forceConsistentCasingInFileNames": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "ESNEXT",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "baseUrl": ".",
      "paths": {
        "@components/*": ["./src/components/*"],
        "@api/*": ["./src/api/*"],
        "@models/*": ["./src/models/*"],
        "@screens/*": ["./src/screens/*"],
        "@hooks/*": ["./src/hooks/*"],
        "@services/*": ["./src/services/*"],
        "@constants": ["./src/constants.ts"],
        "@context/*": ["./src/context/*"],
        "@queries/*": ["./src/queries/*"],
        "@data/*": ["./src/data/*"],
        "@typeDefs/*": ["./src/types/*"],
        "@generated/*": ["./src/generated/*"],
        "@public/*": ["./public/*"],
        "@utils/*": ["./src/utils/*"],
        "@app/*": ["./src/app/*"],
        "@assets/*": ["./src/assets/*"]
      }
    },
    "exclude": ["node_modules"],
    "include": ["**/*.ts", "**/*.tsx", "next-env.d.ts", "next.config.js"]
  }