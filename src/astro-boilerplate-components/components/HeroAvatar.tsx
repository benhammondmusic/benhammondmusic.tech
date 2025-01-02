import type { ReactNode } from 'react';

type IHeroAvatarProps = {
	title: ReactNode;
	subtitle: ReactNode;
	description: ReactNode;
	avatar: ReactNode;
	socialButtons: ReactNode;
};

const HeroAvatar = (props: IHeroAvatarProps) => (
	<div className="flex flex-col items-center md:flex-row md:justify-between md:gap-x-24">
		<div>
			<h1>
				<span className="text-6xl font-bold">{props.title}</span>
				<span className="text-3xl font-bold">{props.subtitle}</span>
			</h1>

			<p className="mt-6 text-xl leading-9">{props.description}</p>

			<div className="mt-3 flex gap-1">{props.socialButtons}</div>
		</div>

		<div className="">{props.avatar}</div>
	</div>
);

export { HeroAvatar };
