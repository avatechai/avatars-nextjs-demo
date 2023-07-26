'use client';

import Reveal from 'reveal.js';

// @ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
// @ts-ignore
import HightLight from 'reveal.js/plugin/highlight/highlight.esm.js';

import '/node_modules/reveal.js/dist/reveal.css';
import '/node_modules/reveal.js/dist/theme/white.css';

import '../app/code.css';
import '../app/theme.css';

import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { useChat } from 'ai/react';
import { buildCharacterPersonaPrompt } from '@avatechai/avatars';
import { ElevenLabsVoiceService } from '@avatechai/avatars/voice';
import { getAIReplyWithEmotion, useAvatar } from '@avatechai/avatars/react';
import {
  defaultAvatarLoaders,
  defaultBlendshapesService,
} from '@avatechai/avatars/default-loaders';

const elevenLabs = new ElevenLabsVoiceService(
  process.env.NEXT_PUBLIC_ELEVEN_LABS_API_KEY!,
  'eleven_monolingual_v1',
  'EXAVITQu4vr4xnSDxMaL',
);

export default function Demo() {
  const [deck, setDeck] = useState<Reveal.Api | null>(null);

  useEffect(() => {
    if (deck) return;

    const tmp = new Reveal({
      plugins: [Markdown, HightLight],
      help: false,
    });
    tmp.initialize();
    setDeck(tmp);
  }, []);

  return (
    <Presentation>
      <Slide animate>
        <div>Setting up a Chat Components</div>
        <Slide animate title="Chat.tsx">
          <Code lang="tsx">
            {`
export default function Chat() {
}
					`}
          </Code>
        </Slide>
        <Slide animate title="Chat.tsx">
          <Code lang="tsx">
            {`
export default function Chat() {
	const {
    	messages,
    	input,
    	handleInputChange,
    	handleSubmit,
  	} = useChat()

	...
}
					`}
          </Code>
        </Slide>
        <Slide animate title="Setting the chat interface" twoColumn>
          <Code lang="tsx" lines="7,10">
            {`
export default function Chat() {
	...

	return (
    	<>
    	  <div>
    	    {/* Message Display */}
    	  </div>

    	  {/* Input */}
    	</>
  	)
}
					`}
          </Code>
          <CustomDemo />
        </Slide>

        <Slide animate title="Message Display">
          <TwoColumn>
            <Code lang="tsx">
              {`
...
{messages.map(
  (m) =>
    m.role != 'system' && (
      <div key={m.id}>
        {m.role === 'user' ? 'User: ' : 'AI: '}
        {m.content}
      </div>
    ),
)}
...
					`}
            </Code>
            <CustomDemo showMessage />
          </TwoColumn>
        </Slide>

        <Slide animate title="Input">
          <TwoColumn>
            <Code lang="html">
              {`
...
<form
  onSubmit={(e) => {
    handleSubmit(e)
  }}
>
  <input
    value={input}
    onChange={handleInputChange}
  />
 
  <button type="submit">Send</button>
</form>
...
					`}
            </Code>
            <CustomDemo showInput showMessage />
          </TwoColumn>
        </Slide>
      </Slide>

      <Slide animate>
        <div>Setting up ElevenLabVoiceService</div>
        <Slide animate title="Importing the ElevenLabsVoiceService">
          <Code lang="tsx">
            {`
import {
  ElevenLabsVoiceService
} from '@avatechai/avatars'

const elevenLabs = new ElevenLabsVoiceService(

)
					`}
          </Code>
        </Slide>
        <Slide animate title="Load your API Key and Voice ID">
          <Code lang="tsx" lines="6,7,8">
            {`
import {
  ElevenLabsVoiceService
} from '@avatechai/avatars/voice'

const elevenLabs = new ElevenLabVoiceService(
  'API_KEY',
  'eleven_monolingual_v1',
  'VOICE_ID',
)
					`}
          </Code>
        </Slide>
      </Slide>

      <Slide animate>
        <div>Integrating Avatars SDK</div>
        <Slide animate>
          <Code lang="tsx">
            {`
const { 
	avatarDisplay, 
	handleFirstInteractionAudio, 
	availableEmotions 
} =
  useAvatar({
    ...
  })
					`}
          </Code>
        </Slide>
        <Slide
          animate
          title="Setting avatar state and id (from labs.avatech.ai)"
        >
          <Code lang="tsx">
            {`
const { ... } =
  useAvatar({
    // Avatar State
    text: text,
    currentEmotion: currentEmotion,
    avatarId: 'af3f42c9-d1d7-4e14-bd81-bf2e05fd11a3',
  })
					`}
          </Code>
        </Slide>

        <Slide
          animate
          title="Setting avatar loader, blendshapes and audio service"
        >
          <Code lang="tsx">
            {`
import {
  defaultAvatarLoaders,
  defaultBlendshapesService_2,
} from '@avatechai/avatars/default-loaders'


const { ... } =
  useAvatar({
    // Loader + Plugins
    avatarLoaders: defaultAvatarLoaders,
    blendshapesService: defaultBlendshapesService_2,
    audioService: elevenLabs,
  })
					`}
          </Code>
        </Slide>

        <Slide animate title="Extra styles and class name props">
          <Code lang="tsx">
            {`
const { ... } =
  useAvatar({
    // Style Props
    scale: 4,
    className: 'w-[400px] h-[400px]',
  })
					`}
          </Code>
        </Slide>

        <Slide
          animate
          title="Rendering the Avatar Display in your react tree"
          twoColumn
        >
          <Code lang="tsx" lines="7">
            {`
export default function Chat() {
	...

	return (
    	<>
    	  <div>
          {avatarDisplay}
    	    {/* Message Display */}
    	  </div>

    	  {/* Input */}
    	</>
  	)
}
					`}
          </Code>
          <CustomDemo showInput showMessage showAvatar />
        </Slide>
      </Slide>
    </Presentation>
  );
}

function TwoColumn(props: { children: React.ReactNode }) {
  return <div className="!flex !flex-row">{props.children}</div>;
}

function CustomDemo(props: {
  showMessage?: boolean;
  showInput?: boolean;
  showAvatar?: boolean;
}) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    initialMessages: [
      {
        content: 'hi',
        role: 'user',
        id: '1',
      },
      {
        content: 'Hello!',
        role: 'assistant',
        id: '2',
      },
    ],
  });

  const [text, currentEmotion] = getAIReplyWithEmotion(messages, isLoading);

  const { avatarDisplay, handleFirstInteractionAudio, availableEmotions } =
    useAvatar({
      // Avatar State
      text: text,
      currentEmotion: currentEmotion,
      avatarId: !props.showAvatar
        ? undefined
        : 'af3f42c9-d1d7-4e14-bd81-bf2e05fd11a3',

      // Loader + Plugins
      avatarLoaders: defaultAvatarLoaders,
      blendshapesService: defaultBlendshapesService,
      audioService: elevenLabs,

      // Style Props
      scale: 2,
      className: 'w-[200px] h-[200px]',
    });

  // Set initial prompt
  useEffect(() => {
    if (!availableEmotions) return;
    if (!props.showAvatar) return;

    setMessages([
      {
        content: buildCharacterPersonaPrompt({
          name: 'Eleven',
          context: 'Eleven Labs',
          exampleReplies: ['Hello', 'How are you?'],
          emotionList: availableEmotions,
        }),
        role: 'system',
        id: '1',
      },
    ]);
  }, [availableEmotions, props.showAvatar]);

  return (
    <>
      <div
        // data-id="code-demo"
        className="h-[400px] rounded-lg w-1/3 text-sm bg-white text-black relative text-left py-6 px-10"
      >
        <div className="w-full md:max-w-md flex flex-col stretch items-center">
          {/* Avatar Display */}
          {props.showAvatar && avatarDisplay}

          {/* Message Display */}
          {props.showMessage &&
            messages.map(
              (m) =>
                m.role != 'system' && (
                  <div key={m.id} className="w-full text-start">
                    {m.role === 'user' ? 'User: ' : 'AI: '}
                    {m.content}
                  </div>
                ),
            )}
        </div>

        {/* Input */}
        {props.showInput && (
          <form
            data-id="code-demo-input"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
              if (props.showAvatar) handleFirstInteractionAudio();
            }}
            className="max-w-md left-0 right-0 absolute bottom-0 flex items-center gap-2 justify-center mb-8 w-[90%] mx-auto"
          >
            <input
              placeholder="Say something..."
              className="max-w-md border border-gray-300 rounded shadow-xl p-2 w-full"
              value={input}
              onChange={handleInputChange}
            />

            <button type="submit">Send</button>
          </form>
        )}
      </div>
    </>
  );
}

function Presentation(props: { children: React.ReactNode }) {
  return (
    <div
      className="reveal"
      style={{
        height: '100dvh',
      }}
    >
      <div className="slides">{props.children}</div>
    </div>
  );
}

function Slide(props: {
  animate: boolean;
  children: React.ReactNode;
  title?: string;
  twoColumn?: boolean;
}) {
  return (
    <section data-auto-animate={props.animate}>
      {props.title && (
        <div className="w-full flex justify-center items-center mb-4">
          <div
            data-id={props.title}
            className="text-sm rounded-full w-fit px-4 ring-white ring-1"
          >
            {props.title}
          </div>
        </div>
      )}
      {props.twoColumn ? (
        <div className="!flex !flex-row items-center justify-center">
          {props.children}
        </div>
      ) : (
        props.children
      )}
    </section>
  );
}

type CodeAnimationProps = {
  id?: string;
  lines?: string | boolean | null;
  offset?: string | null;
  lang?: string | null;
} & HTMLAttributes<HTMLElement>;

const Code: FC<CodeAnimationProps> = ({
  id = 'code-animation',
  lines = true,
  offset = null,
  lang = null,
  className,
  children,
  ...restProps
}) => {
  const lineNumbers = lines || null;
  const lnStartFrom = offset;
  const languageClass = `language-${lang}`;

  return (
    <pre
      id={id}
      className={(className || '') + ' !w-2/3'}
      {...restProps}
      data-id="code-animation"
    >
      <code
        data-trim
        data-line-numbers={lineNumbers}
        data-ln-start-from={lnStartFrom}
        className={languageClass}
      >
        {children}
      </code>
    </pre>
  );
};
