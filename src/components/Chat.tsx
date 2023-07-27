'use client';

import { useChat } from 'ai/react';
import { useAvatar, getAIReplyWithEmotion } from '@avatechai/avatars/react';
import { ElevenLabsVoiceService } from '@avatechai/avatars/voice';
import {
  defaultAvatarLoaders,
  defaultBlendshapesService_2,
} from '@avatechai/avatars/default-loaders';
import { buildCharacterPersonaPrompt } from '@avatechai/avatars';

import { useEffect } from 'react';

const elevenLabs = new ElevenLabsVoiceService(
  process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY!,
  'eleven_monolingual_v1',
  'EXAVITQu4vr4xnSDxMaL',
);

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat();

  const [text, currentEmotion] = getAIReplyWithEmotion(messages, isLoading);

  const {
    avatarDisplay,
    handleFirstInteractionAudio,
    availableEmotions,
    audioStatus,
  } = useAvatar({
    // Avatar State
    text: text,
    currentEmotion: currentEmotion,
    avatarId: 'af3f42c9-d1d7-4e14-bd81-bf2e05fd11a3',

    // Loader + Plugins
    avatarLoaders: defaultAvatarLoaders,
    blendshapesService: defaultBlendshapesService_2,

    audioService: elevenLabs,

    // Style Props
    scale: 4,
    className: 'w-full md:w-[400px] h-[400px]',
  });

  // Set initial prompt
  useEffect(() => {
    if (!availableEmotions) return;
    setMessages([
      {
        content: buildCharacterPersonaPrompt({
          name: 'Ava',
          context: 'Im ava, a virtual idol from avatechs.',
          exampleReplies: ['I am ava!', 'I love next js!', 'What are you working on recently?', 'npm i @avatechai/avatars'],
          emotionList: availableEmotions,
        }),
        role: 'system',
        id: '1',
      },
    ]);
  }, [availableEmotions]);

  return (
    <>
      <div className="w-full md:max-w-md py-24 flex flex-col stretch ">
        {/* Avatar Display */}
        <div>
          Audio Status: <span className='bg-gray-200 rounded-lg px-2'>{audioStatus}</span>
        </div>

        {avatarDisplay}

        {/* Message Display */}
        {messages.map(
          (m) =>
            m.role != 'system' && (
              <div key={m.id}>
                {m.role === 'user' ? 'User: ' : 'AI: '}
                {m.content}
              </div>
            ),
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          handleFirstInteractionAudio();
        }}
        className="px-2 max-w-md fixed bottom-0 flex items-center gap-2 justify-center mb-8 w-full"
      >
        <input
          placeholder="Say something..."
          className="max-w-md border border-gray-300 rounded shadow-xl p-2 w-full"
          value={input}
          onChange={handleInputChange}
        />

        <button type="submit">Send</button>
      </form>
    </>
  );
}
