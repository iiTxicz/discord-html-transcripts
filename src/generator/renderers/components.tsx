import { DiscordActionRow, DiscordButton } from '@derockdev/discord-components-react';
import { ComponentType, type MessageActionRowComponent, type ActionRow } from 'discord.js';
import React from 'react';
import { parseDiscordEmoji } from '../../utils/utils';

export default function ComponentRow({ row, id }: { row: ActionRow<MessageActionRowComponent>; id: number }) {
  return (
    <DiscordActionRow key={id}>
      {row.components.map((component, id) => (
        <Component component={component} id={id} key={id} />
      ))}
    </DiscordActionRow>
  );
}

type ButtonStyle = 1 | 2 | 3 | 4 | 5;

const ButtonStyleMapping: { [key in ButtonStyle]: "primary" | "secondary" | "success" | "destructive" } = {
  1: "primary",
  2: "secondary",
  3: "success",
  4: "destructive",
  5: "secondary",
};

export function Component({ component, id }: { component: MessageActionRowComponent; id: number }) {
  if (component.type === ComponentType.Button) {
    return (
      <DiscordButton
        key={id}
        type={ButtonStyleMapping[component.style as ButtonStyle]}
        url={component.url ?? undefined}
        emoji={component.emoji ? parseDiscordEmoji(component.emoji) : undefined}
      >
        {component.label}
      </DiscordButton>
    );
  }

  return undefined;
}
