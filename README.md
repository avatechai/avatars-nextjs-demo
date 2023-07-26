This is a Next JS + Vercel AI (LLM) + Avatech SDK (Avatar) + Eleven Labs (Voice) avatar demo.

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

## Customizing voice

Currently supporting elevenlabs directly. To change the voice id, head to Chat.tsx

```tsx #2
const elevenLabs = new ElevenLabsVoiceService(
  process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY!,
  'eleven_monolingual_v1',
  'YOUR_NEW_VOICE_ID',
);
```

## Learn more

Documentation https://docs.avatech.ai
