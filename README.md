# LumaLive

Polished frontend-only Expo prototype for a live shopping mobile app.

## Run Locally

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on Android.

## Useful Scripts

```bash
npm run typecheck
npm run lint
```

## Android APK Preview

```bash
npx eas build -p android --profile preview
```

## Notes

- This is frontend only.
- Data is local mock data in `data/mock.ts`.
- Cart, favorites, follows, login state, and notification read state are simulated with Zustand.
- There are no backend APIs, databases, real payments, WebSockets, or livestream infrastructure.
