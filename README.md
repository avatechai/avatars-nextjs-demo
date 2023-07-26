This is a Next JS + Vercel AI + OpenAI + Avatech SDK +

## Getting Started

```
pnpm i
pnpm dev
```

## Customizing avatars

Head to https://labs.avatech.ai

Sign in and generate avatars and edit the avatar id in Chat.tsx

```tsx
  const {
    avatarDisplay,
    handleFirstInteractionAudio,
    availableEmotions,
    audioStatus,
  } = useAvatar({
    ...
    avatarId: 'YOU_AVATAR_ID',
    ...
});
```
