import type { ReactNode } from 'react';

import type { Values } from '../types/TypeUnion';

export const ColorTags = {
  SLATE: 'SLATE',
  GRAY: 'GRAY',
  ZINC: 'ZINC',
  NEUTRAL: 'NEUTRAL',
  STONE: 'STONE',
  RED: 'RED',
  ORANGE: 'ORANGE',
  AMBER: 'AMBER',
  YELLOW: 'YELLOW',
  LIME: 'LIME',
  GREEN: 'GREEN',
  EMERALD: 'EMERALD',
  TEAL: 'TEAL',
  CYAN: 'CYAN',
  SKY: 'SKY',
  BLUE: 'BLUE',
  INDIGO: 'INDIGO',
  VIOLET: 'VIOLET',
  PURPLE: 'PURPLE',
  FUCHSIA: 'FUCHSIA',
  PINK: 'PINK',
  ROSE: 'ROSE',
} as const;

type ITagsProps = {
  color: Values<typeof ColorTags>;
  children: ReactNode;
};

const colorToClassMap = {
  [ColorTags.SLATE]: 'bg-slate-100 text-slate-900',
  [ColorTags.GRAY]: 'bg-gray-100 text-gray-900',
  [ColorTags.ZINC]: 'bg-zinc-100 text-zinc-900',
  [ColorTags.NEUTRAL]: 'bg-neutral-100 text-neutral-900',
  [ColorTags.STONE]: 'bg-stone-100 text-stone-900',
  [ColorTags.RED]: 'bg-red-100 text-red-900',
  [ColorTags.ORANGE]: 'bg-orange-100 text-orange-900',
  [ColorTags.AMBER]: 'bg-amber-100 text-amber-900',
  [ColorTags.YELLOW]: 'bg-yellow-100 text-yellow-900',
  [ColorTags.LIME]: 'bg-lime-100 text-lime-900',
  [ColorTags.GREEN]: 'bg-green-100 text-green-900',
  [ColorTags.EMERALD]: 'bg-emerald-100 text-emerald-900',
  [ColorTags.TEAL]: 'bg-teal-100 text-teal-900',
  [ColorTags.CYAN]: 'bg-cyan-100 text-cyan-900',
  [ColorTags.SKY]: 'bg-sky-100 text-sky-900',
  [ColorTags.BLUE]: 'bg-blue-100 text-blue-900',
  [ColorTags.INDIGO]: 'bg-indigo-100 text-indigo-900',
  [ColorTags.VIOLET]: 'bg-violet-100 text-violet-900',
  [ColorTags.PURPLE]: 'bg-purple-100 text-purple-900',
  [ColorTags.FUCHSIA]: 'bg-fuchsia-100 text-fuchsia-900',
  [ColorTags.PINK]: 'bg-pink-100 text-pink-900',
  [ColorTags.ROSE]: 'bg-rose-100 text-rose-900',
};

const Tags = (props: ITagsProps) => (
  <div
    className={`rounded-md px-2 py-1 text-xs font-semibold ${
      colorToClassMap[props.color]
    }`}
  >
    {props.children}
  </div>
);

export { Tags };
