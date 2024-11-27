/* empty css                                 */
import { c as createComponent, a as createAstro, r as renderTemplate, b as addAttribute, d as renderHead, e as renderComponent, f as renderSlot } from '../chunks/astro/server_7O38pSzB.mjs';
import 'kleur/colors';
import 'html-escaper';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { Octokit } from 'octokit';
export { renderers } from '../renderers.mjs';

const BlogCard = (props) => /* @__PURE__ */ jsx(
  "a",
  {
    className: "hover:translate-y-1 focus:translate-y-1",
    href: `https://blog.benhammondmusic.tech/${props.postSlug}`,
    children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden rounded-md bg-slate-800", children: /* @__PURE__ */ jsx("div", { className: "aspect-w-2 aspect-h-1", children: /* @__PURE__ */ jsx(
      "img",
      {
        className: "h-full w-full object-cover object-center",
        src: props.postImgUrl,
        alt: props.postTitle,
        loading: "lazy"
      }
    ) }) })
  }
);

async function fetchRecentPosts() {
  const query = `
	query Publication {
		publication(host: "blog.benhammondmusic.tech") {
			isTeam
			title
			posts(first: 6) {
				edges {
					node {
						title
						coverImage {
							url
						}
						slug
					}
				}
			}
		}
	}
	`;
  const response = await fetch("https://gql.hashnode.com", {
    method: "post",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  const jsonResponse = await response.json();
  const posts = jsonResponse.data.publication.posts.edges.map((post) => post.node);
  return posts;
}

const posts = await fetchRecentPosts();
const BlogGallery = () => /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 bg-gradient-to-br p-4 from-benhammondyellow to-benhammondyellow-600 rounded-md", children: posts.map(
  (postItem) => {
    return /* @__PURE__ */ jsx(
      BlogCard,
      {
        postSlug: postItem.slug,
        postTitle: postItem.title,
        postImgUrl: postItem.coverImage.url
      },
      postItem.slug
    );
  }
) });

const FooterCopyright = (props) => /* @__PURE__ */ jsx("div", { className: "border-t border-benhammondblue-50 pt-5 text-center", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-200", children: [
  "© Copyright ",
  (/* @__PURE__ */ new Date()).getFullYear(),
  " by ",
  props.site_name,
  " &",
  " ",
  /* @__PURE__ */ jsx(
    "a",
    {
      className: "hover:text-benhammondyellow hover:underline",
      href: "https://github.com/ixartz/Astro-boilerplate",
      target: "_blank",
      rel: "noopener noreferrer",
      children: "CreativeDesignsGuru"
    }
  ),
  "."
] }) });

const GradientText = (props) => /* @__PURE__ */ jsx(
  "span",
  {
    className: `${props.className ?? ""} bg-gradient-to-br from-white to-benhammondyellow-500 bg-clip-text text-transparent`,
    children: props.children
  }
);

const HeroAvatar = (props) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center md:flex-row md:justify-between md:gap-x-24", children: [
  /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h1", { children: [
      /* @__PURE__ */ jsx("span", { className: "text-6xl font-bold", children: props.title }),
      /* @__PURE__ */ jsx("span", { className: "text-3xl font-bold", children: props.subtitle })
    ] }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-xl leading-9", children: props.description }),
    /* @__PURE__ */ jsx("div", { className: "mt-3 flex gap-1", children: props.socialButtons })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "shrink-0", children: props.avatar })
] });

const Logo = (props) => /* @__PURE__ */ jsxs("div", { className: "flex bg-gradient-to-br to-benhammondyellow-50 from-white bg-clip-text  text-transparent", children: [
  props.icon,
  props.name
] });

const NavbarTwoColumns = (props) => /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between", children: props.children });

const NavMenu = (props) => /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsx("ul", { className: "flex gap-x-3 font-medium text-gray-200", children: props.children }) });

const NavMenuItem = (props) => /* @__PURE__ */ jsx("li", { className: "hover:text-benhammondyellow", children: /* @__PURE__ */ jsx("a", { href: props.href, children: props.children }) });

const Connect = (props) => /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-evenly gap-6 sm:flex-row text-center md:text-left", children: [
  /* @__PURE__ */ jsxs("div", { className: "sm:w-7/12", children: [
    /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: props.title }),
    /* @__PURE__ */ jsx("p", { className: "mt-3 text-gray-300", children: props.description })
  ] }),
  /* @__PURE__ */ jsx("div", { className: "w-full sm:w-2/12", children: /* @__PURE__ */ jsx(
    "a",
    {
      href: "mailto:hello@benhammondmusic.tech",
      className: "ml-2 shrink-0 cursor-pointer rounded-full bg-gradient-to-br from-benhammondblue-50 to-cyan-300 px-5 py-3 text-sm font-medium text-benhammondblue-700 hover:from-benhammondblue-800 hover:to-cyan-800 hover:text-benhammondblue-50 focus:ring-2 focus:ring-benhammondyellow-300/50",
      children: "Email me"
    }
  ) })
] });

const Project = (props) => {
  const link = props.deployLink ?? props.blogLink ?? props.repoLink;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-x-8 rounded-md bg-slate-800 p-5 md:flex-row md:justify-center ring-1 ring-benhammondblue-50 ring-inset", children: [
    /* @__PURE__ */ jsxs("div", { className: "shrink-0 flex flex-col items-center", children: [
      /* @__PURE__ */ jsx("a", { href: link, children: /* @__PURE__ */ jsx(
        "img",
        {
          className: "h-36 w-36 rounded hover:translate-y-1",
          src: props.img.src,
          alt: props.img.alt,
          loading: "lazy"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 text-center  md:font-semibold md:text-2xl ", children: [
        props.name,
        /* @__PURE__ */ jsxs("span", { className: "md:hidden leading-loose", children: [
          " — ",
          props.summary
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "w-11/12", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-col items-center justify-between  gap-y-2 md:flex-row", children: [
        /* @__PURE__ */ jsx("div", { className: "my-3 text-center text-xl font-semibold md:text-left hidden md:block", children: props.summary }),
        /* @__PURE__ */ jsxs("div", { className: "mb-5 flex w-96 justify-center text-right font-semibold md:flex-col lg:flex-none italic md:not-italic ", children: [
          props.blogLink && /* @__PURE__ */ jsx(
            "a",
            {
              className: "mx-5 text-sm  hover:text-benhammondyellow md:mr-10 md:ml-0",
              href: props.blogLink,
              children: "Blog Post↗"
            }
          ),
          props.deployLink && /* @__PURE__ */ jsx(
            "a",
            {
              className: "mx-5 text-sm  hover:text-benhammondyellow md:mr-10 md:ml-0",
              href: props.deployLink,
              children: "View Site↗"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              className: "mx-5 text-sm  hover:text-benhammondyellow md:mr-10 md:ml-0",
              href: props.repoLink,
              children: "GitHub Repo↗"
            }
          )
        ] })
      ] }),
      props?.description && /* @__PURE__ */ jsx("p", { children: props.description }),
      props.descriptionList && /* @__PURE__ */ jsxs("details", { children: [
        /* @__PURE__ */ jsx("summary", { className: "cursor-pointer py-3 font-semibold hover:text-benhammondyellow", children: "Role details" }),
        props.descriptionList
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-5 flex flex-wrap justify-center gap-2 md:justify-start", children: props.category })
    ] })
  ] });
};

const Section = (props) => /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-screen-lg px-3 py-6", children: [
  props.title && /* @__PURE__ */ jsx("div", { className: "mb-2 text-2xl font-bold", children: props.title }),
  props.children
] });

const ColorTags = {
  SLATE: "SLATE",
  GRAY: "GRAY",
  ZINC: "ZINC",
  NEUTRAL: "NEUTRAL",
  STONE: "STONE",
  RED: "RED",
  ORANGE: "ORANGE",
  AMBER: "AMBER",
  YELLOW: "YELLOW",
  LIME: "LIME",
  GREEN: "GREEN",
  EMERALD: "EMERALD",
  TEAL: "TEAL",
  CYAN: "CYAN",
  SKY: "SKY",
  BLUE: "BLUE",
  INDIGO: "INDIGO",
  VIOLET: "VIOLET",
  PURPLE: "PURPLE",
  FUCHSIA: "FUCHSIA",
  PINK: "PINK",
  ROSE: "ROSE"
};
const colorToClassMap = {
  [ColorTags.SLATE]: "bg-slate-100 text-slate-900",
  [ColorTags.GRAY]: "bg-gray-100 text-gray-900",
  [ColorTags.ZINC]: "bg-zinc-100 text-zinc-900",
  [ColorTags.NEUTRAL]: "bg-neutral-100 text-neutral-900",
  [ColorTags.STONE]: "bg-stone-100 text-stone-900",
  [ColorTags.RED]: "bg-red-100 text-red-900",
  [ColorTags.ORANGE]: "bg-orange-100 text-orange-900",
  [ColorTags.AMBER]: "bg-amber-100 text-amber-900",
  [ColorTags.YELLOW]: "bg-yellow-100 text-yellow-900",
  [ColorTags.LIME]: "bg-lime-100 text-lime-900",
  [ColorTags.GREEN]: "bg-green-100 text-green-900",
  [ColorTags.EMERALD]: "bg-emerald-100 text-emerald-900",
  [ColorTags.TEAL]: "bg-teal-100 text-teal-900",
  [ColorTags.CYAN]: "bg-cyan-100 text-cyan-900",
  [ColorTags.SKY]: "bg-sky-100 text-sky-900",
  [ColorTags.BLUE]: "bg-blue-100 text-blue-900",
  [ColorTags.INDIGO]: "bg-indigo-100 text-indigo-900",
  [ColorTags.VIOLET]: "bg-violet-100 text-violet-900",
  [ColorTags.PURPLE]: "bg-purple-100 text-purple-900",
  [ColorTags.FUCHSIA]: "bg-fuchsia-100 text-fuchsia-900",
  [ColorTags.PINK]: "bg-pink-100 text-pink-900",
  [ColorTags.ROSE]: "bg-rose-100 text-rose-900"
};
const Tags = (props) => /* @__PURE__ */ jsx(
  "div",
  {
    className: `rounded-md px-2 py-1 text-xs font-semibold ${colorToClassMap[props.color]}`,
    children: props.children
  }
);

const CTA = () => /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(
  Connect,
  {
    title: /* @__PURE__ */ jsxs("div", { className: "font-rubik", children: [
      "Let's build ",
      /* @__PURE__ */ jsx(GradientText, { children: "together!" })
    ] }),
    description: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "text-benhammondyellow hover:underline",
          href: "mailto:hello@benhammondmusic.tech",
          children: "Email me"
        }
      ),
      ", or connect on",
      " ",
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "text-benhammondyellow hover:underline",
          href: "https://github.com/benhammondmusic",
          children: "GitHub"
        }
      ),
      " ",
      "and",
      " ",
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "text-benhammondyellow hover:underline",
          href: "https://www.linkedin.com/in/benhammondmusic",
          children: "LinkedIn"
        }
      ),
      "."
    ] })
  }
) });

const ben = new Proxy({"src":"/_astro/ben.7ylEcJhY.jpg","width":860,"height":645,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/ben.jpg";
							}
							
							return target[name];
						}
					});

const Hero = () => /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(
  HeroAvatar,
  {
    title: /* @__PURE__ */ jsx("div", { className: "m-2 pb-2", children: /* @__PURE__ */ jsx(GradientText, { className: "font-rubik", children: "Ben Hammond" }) }),
    subtitle: /* @__PURE__ */ jsx("div", { className: "m-2 pb-2", children: /* @__PURE__ */ jsxs("p", { className: "font-rubik", children: [
      "Denver Developer",
      /* @__PURE__ */ jsx("br", {}),
      /* @__PURE__ */ jsx(GradientText, { children: "&&" }),
      " Song Builder"
    ] }) }),
    description: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "m-2 pb-2", children: [
        "I'm an endlessly curious web developer, with a parallel career performing and operating a",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-benhammondyellow hover:underline",
            href: "https://benhammondmusic.com",
            children: "tech-forward music business"
          }
        ),
        ". I am a graduate of McGill University and General Assembly, living in Denver, Colorado with my family."
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "m-2 pb-2", children: [
        "I am currently employed by the Morehouse School of Medicine, proudly working on the open-source",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-benhammondyellow hover:underline",
            href: "https://healthequitytracker.org",
            children: "Health Equity Tracker"
          }
        ),
        ", which was built by Google.org and the Satcher Health Leadership Institute."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "m-2 pb-2", children: "I believe deeply in the power of music and technology to uplift our communities, so please reach out if I can help or answer any questions you may have. Let's build something together!" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://docs.google.com/document/d/1nYJf1ZjGetUo8lFbwoyf23prkTw-0H_HiqvMKlY5_nw",
            className: "m-5 text-lg font-semibold hover:text-benhammondyellow",
            children: "☆ Resume"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "mailto:hello@benhammondmusic.tech",
            className: "m-5 text-lg font-semibold hover:text-benhammondyellow",
            children: "☆ Email"
          }
        )
      ] })
    ] }),
    avatar: /* @__PURE__ */ jsx(
      "img",
      {
        className: "h-64 rounded-2xl",
        src: ben.src,
        alt: "Ben Hammond selfie holding guitar with a Denver sunset glowing behind"
      }
    ),
    socialButtons: null
  }
) });

const BenHammondTech = new Proxy({"src":"/_astro/benhammond-tech.UGK-Grt9.png","width":286,"height":286,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/benhammond-tech.png";
							}
							
							return target[name];
						}
					});

const BenHammondMusic = new Proxy({"src":"/_astro/benhammondmusic.nQgGSkBD.png","width":699,"height":700,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/benhammondmusic.png";
							}
							
							return target[name];
						}
					});

const DataViz = new Proxy({"src":"/_astro/data-viz.Dtn2TrVB.png","width":496,"height":500,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/data-viz.png";
							}
							
							return target[name];
						}
					});

const HET = new Proxy({"src":"/_astro/het.BY-E5zzU.svg","width":605,"height":600,"format":"svg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/het.svg";
							}
							
							return target[name];
						}
					});

const RecentSideProjects = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(
    Section,
    {
      title: /* @__PURE__ */ jsxs("p", { className: "font-rubik", children: [
        "Currently:",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(GradientText, { children: "Sr Software Engineer (Team Lead)" })
      ] }),
      children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-6", children: /* @__PURE__ */ jsx(
        Project,
        {
          name: "HET",
          summary: "Health Equity Tracker",
          description: "Free-to-use data visualization platform enabling new insights into the impact of COVID-19 and other social and political determinants of health on historically underrepresented groups in the US; built collaboratively by Google.org and continuously expanded by the Satcher Health Leadership Institute",
          descriptionList: /* @__PURE__ */ jsxs("ul", { className: "list-inside list-disc", children: [
            /* @__PURE__ */ jsx("li", { children: "Ownership of Health Equity Tracker frontend, coordinating MVP hand-off from Google.org to our small team and continuing development into an award-winning platform." }),
            /* @__PURE__ */ jsx("li", { children: "Personally achieved: 90% reduction in dataset transfer sizes by adding gzip Express middleware, 85% improvement on bundle sizes by code-splitting and lazy-loading React components, and another 84% reduction in data shipped on our slowest reports (100% faster load times) by refactoring Airflow DAGs, setting permissions with Terraform and using SQL to query and export dramatically smaller JSON files." }),
            /* @__PURE__ */ jsx("li", { children: "Personally quadrupled the number of trackable data types, completing research and writing new Python modules that process datasets across disparate sources using Pandas; Docker to containerize and upload for execution on GCP Cloud Run / BigQuery." }),
            /* @__PURE__ */ jsx("li", { children: "Addressed over 170 accessibility audit items, adding screen-reader navigation to our Vega and D3 visualizations and making open-source contributions to NPM packages that improved usability for hundreds of thousands of users" }),
            /* @__PURE__ */ jsx("li", { children: "Architected an integrated blog and content management system, utilizing a headless Wordpress dashboard and incorporating content directly using React Query persisted via local storage." }),
            /* @__PURE__ */ jsx("li", { children: "Representing our organization in communications with NPR, CDC, Rutgers and Robert Wood Johnson Foundation; collaboration with outside agencies to allow for problem-free insertion of newly designed components." }),
            /* @__PURE__ */ jsx("li", { children: "Created a design system and standardized styling system, refactoring an inconsistent mix of Sass modules, Material UI, and inline styles into a custom Tailwind theme using a design token library. Included expanded tests with all new functionality; identified the lack of “end to end” testing and implemented coverage using Playwright running on CI and against production, added missing Typescript custom typing to expedite development and prevent errors." })
          ] }),
          deployLink: "https://healthequitytracker.org",
          repoLink: "https://github.com/SatcherInstitute/health-equity-tracker",
          img: {
            src: HET.src,
            alt: "Health Equity Tracker Project"
          },
          category: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Python" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Pandas" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Pytest" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Docker" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Terraform" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "GitHub Actions" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "GCP" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "BigQuery" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "React" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "TypeScript" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Vitest" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Playwright" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "MUI" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Tailwind" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Vega" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "D3" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Pre-Commit" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.EMERALD, children: "Biome" })
          ] })
        }
      ) })
    }
  ),
  /* @__PURE__ */ jsx(
    Section,
    {
      title: /* @__PURE__ */ jsxs("div", { className: "font-rubik", children: [
        "Ongoing ",
        /* @__PURE__ */ jsx(GradientText, { children: "Side Projects" })
      ] }),
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6", children: [
        /* @__PURE__ */ jsx(
          Project,
          {
            name: "Dev Portfolio",
            summary: "benhammondmusic.tech",
            description: "My web dev and software engineering online presence. Using Astro as a meta-framework for server side generated pages, with React function components. Dynamically pulls in my recent blog posts with GraphQL at build time, along with GitHub events rendered as emoji 💪. ",
            deployLink: "https://benhammondmusic.tech",
            repoLink: "https://github.com/benhammondmusic/benhammond.tech",
            img: {
              src: BenHammondTech.src,
              alt: "benhammondmusic.tech Project"
            },
            category: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.SKY, children: "Astro" }),
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.SKY, children: "React" }),
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.SKY, children: "TypeScript" }),
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.SKY, children: "Tailwind" }),
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.SKY, children: "GraphQL" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Project,
          {
            name: "Music Site",
            summary: "benhammondmusic.com",
            description: "Refactored my professional music site to incorporate modern web best-practices and allow seamless CI/CD with Netlify and GitHub; filterable song search for improved user experience.\n					",
            deployLink: "https://benhammondmusic.com",
            repoLink: "https://github.com/benhammondmusic/benhammondmusic.com",
            img: {
              src: BenHammondMusic.src,
              alt: "benhammondmusic.com Professional Musician Site Project"
            },
            category: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.RED, children: "SvelteKit" }),
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.RED, children: "TypeScript" }),
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.RED, children: "Tailwind" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx(
          Project,
          {
            name: "Data Viz",
            summary: "Music Career Visualization Playground",
            description: 'Low-stakes place to experiment with visualizing the meta-data behind my other career as a professional musician. Configured multiple components using secure server page routes to authenticate access to Spotify API and answer the question "So what kind of music do you play?".\n					',
            deployLink: "https://benhammondmusic.com/playground",
            repoLink: "https://github.com/benhammondmusic/benhammondmusic.com",
            img: {
              src: DataViz.src,
              alt: "benhammondmusic.com Data Visualization Playground"
            },
            category: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.AMBER, children: "SvelteKit" }),
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.AMBER, children: "TypeScript" }),
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.AMBER, children: "MongoDB" }),
              /* @__PURE__ */ jsx(Tags, { color: ColorTags.AMBER, children: "D3" })
            ] })
          }
        )
      ] })
    }
  )
] });

const FamilyFriendly = new Proxy({"src":"/_astro/family-friendly.CHPWWRE5.png","width":290,"height":290,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/family-friendly.png";
							}
							
							return target[name];
						}
					});

const GigUploader = new Proxy({"src":"/_astro/gig-uploader.nQG-_iyX.png","width":400,"height":400,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/gig-uploader.png";
							}
							
							return target[name];
						}
					});

const GigBoard = new Proxy({"src":"/_astro/gigboard.DNIhRkx7.png","width":450,"height":450,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/gigboard.png";
							}
							
							return target[name];
						}
					});

const LittleCabin = new Proxy({"src":"/_astro/little-cabin.BJdgDqaG.png","width":450,"height":450,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/little-cabin.png";
							}
							
							return target[name];
						}
					});

const Tanks = new Proxy({"src":"/_astro/tanks.D6KwAvcv.png","width":450,"height":450,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/bhammond/code/benhammond.tech/src/assets/images/tanks.png";
							}
							
							return target[name];
						}
					});

const CompletedWebApp = (props) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse items-center gap-x-8 rounded-md bg-benhammondblue-900 p-5 pb-1 md:flex-row w-full ring-1 ring-benhammondblue-600 ring-inset", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-11/12", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          className: "hover:text-benhammondyellow",
          href: props.deployLink ?? props.blogLink ?? props.repoLink,
          children: [
            /* @__PURE__ */ jsx("span", { className: "font-black", children: props.name }),
            props?.description && /* @__PURE__ */ jsxs("span", { children: [
              ": ",
              props.description
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap justify-center gap-1 md:justify-start", children: props.category }),
      props.descriptionList && /* @__PURE__ */ jsxs("details", { className: "py-3 text-sm ", children: [
        /* @__PURE__ */ jsx("summary", { className: "cursor-pointer  hover:text-benhammondyellow", children: "Details" }),
        /* @__PURE__ */ jsx("div", { className: "p-4 ", children: props.descriptionList })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-5 flex w-96 justify-center text-right text-xs italic md:not-italic md:font-semibold md:flex-col lg:flex-none ", children: [
      props.blogLink && /* @__PURE__ */ jsx(
        "a",
        {
          className: "mx-5 text-sm  hover:text-benhammondyellow md:mr-10 md:ml-0",
          href: props.blogLink,
          children: "Blog Post↗"
        }
      ),
      props.deployLink && /* @__PURE__ */ jsx(
        "a",
        {
          className: "mx-5 text-sm  hover:text-benhammondyellow md:mr-10 md:ml-0",
          href: props.deployLink,
          children: "View Site↗"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          className: "mx-5 text-sm  hover:text-benhammondyellow md:mr-10 md:ml-0",
          href: props.repoLink,
          children: "GitHub Repo↗"
        }
      )
    ] })
  ] });
};

const CompletedWebAppChallenges = () => /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
  Section,
  {
    title: /* @__PURE__ */ jsxs("div", { className: "font-rubik", children: [
      "Past ",
      /* @__PURE__ */ jsx(GradientText, { children: "Project Challenges" })
    ] }),
    children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 ring-1 ring-benhammondblue-50 ring-inset bg-slate-800 rounded-md p-6", children: [
      /* @__PURE__ */ jsx(
        CompletedWebApp,
        {
          name: "Little Cabin",
          description: "Fullstack Python App with Django and Google Calendar API",
          descriptionList: /* @__PURE__ */ jsxs("ul", { className: "list-square", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              " ",
              "Created this web app to provide my extended family integrated property management tools."
            ] }),
            /* @__PURE__ */ jsx("li", { children: "Syncs consensus-based scheduling with Google Calendar API using a Google Cloud Platform service account." }),
            /* @__PURE__ */ jsx("li", { children: "Heroku deployment required customized configuration to generate required credentials file." }),
            /* @__PURE__ */ jsx("li", { children: "“Demo” logs in a pre-authenticated account and programmatically generates additional test accounts with tiered authentication and incoming action requests to demonstrate user-to-user interactions." }),
            /* @__PURE__ */ jsx("li", { children: "Prioritizes responsive design with media queries and CSS variables; persistent dark mode toggle selection." })
          ] }),
          blogLink: "https://blog.benhammondmusic.tech/connecting-google-cal-api-and-django",
          repoLink: "https://github.com/benhammondmusic/littlecabin",
          img: {
            src: LittleCabin.src,
            alt: "Little Cabin Project"
          },
          category: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.YELLOW, children: "Python" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.YELLOW, children: "Django" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.YELLOW, children: "PostgreSQL" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.YELLOW, children: "AWS" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.YELLOW, children: "GCP" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        CompletedWebApp,
        {
          name: "GigBoard",
          description: "MERN stack web app connecting gig-workers",
          descriptionList: /* @__PURE__ */ jsxs("ul", { className: "list-square", children: [
            /* @__PURE__ */ jsx("li", { children: "Uses Model-View-Controller (MVC) design pattern, user stories, and an internal RESTful API." }),
            /* @__PURE__ */ jsx("li", { children: "CRUD functionality restricted per user status; offers custom encrypted registration or Google OAuth login." }),
            /* @__PURE__ */ jsx("li", { children: "Project-managed team of 6, utilizing GitHub's agile board to delegate and to minimize merge conflicts; provided hands-on assistance on multiple occasions and helped instructor solve another team's bug.." }),
            /* @__PURE__ */ jsx("li", { children: "Wrote 3 technical posts, assisting team members with deployments and environmental variables." }),
            /* @__PURE__ */ jsx("li", { children: "Personally contributed across the stack: scaffolding functional React components; dynamic searching; hooks for state management and side-effects; assisted with JWT process." })
          ] }),
          blogLink: "https://blog.benhammondmusic.tech/connecting-your-deployed-frontend-backend-and-mongodb-atlas-database",
          repoLink: "https://github.com/benhammondmusic/gigboard",
          img: {
            src: GigBoard.src,
            alt: "GigBoard Project"
          },
          category: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.VIOLET, children: "Node" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.VIOLET, children: "MongoDB" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.VIOLET, children: "Express" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.VIOLET, children: "JavaScript" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.VIOLET, children: "React" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.VIOLET, children: "Bootstrap" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        CompletedWebApp,
        {
          name: "Tanks!",
          description: "Classic artillery game, built in 1 week with HTML Canvas",
          descriptionList: /* @__PURE__ */ jsx("ul", { className: "list-square", children: /* @__PURE__ */ jsx("li", { children: "Incorporated programmatically generated terrain and collision detection / destruction, gravity, scalable multiplayer mode, and responsive design." }) }),
          deployLink: "https://tanks-js.netlify.app/",
          blogLink: "https://blog.benhammondmusic.tech/tanks",
          repoLink: "https://github.com/benhammondmusic/tanks",
          img: { src: Tanks.src, alt: "Tanks Game Project" },
          category: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.ORANGE, children: "HTML Canvas" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.ORANGE, children: "JQuery" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.ORANGE, children: "JavaScript" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        CompletedWebApp,
        {
          name: "Family Friendly",
          description: "Crowd-sourced help for caregivers of all genders",
          blogLink: "https://blog.benhammondmusic.tech/familyfriendly",
          descriptionList: /* @__PURE__ */ jsxs("ul", { className: "list-square", children: [
            /* @__PURE__ */ jsx("li", { children: "Delegates and restricts users' CRUD permissions with OAuth2." }),
            /* @__PURE__ */ jsx("li", { children: "Plots user location and data with Google Maps API." }),
            /* @__PURE__ */ jsx("li", { children: "Integrates a deployed MongoDB Atlas NoSQL database." }),
            /* @__PURE__ */ jsx("li", { children: "Internally operates a RESTful API backend in Node/Express with EJS templating." })
          ] }),
          repoLink: "https://github.com/benhammondmusic/familyfriendly",
          img: {
            src: FamilyFriendly.src,
            alt: "Family Friendly Project"
          },
          category: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.TEAL, children: "Node" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.TEAL, children: "NoSQL" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.TEAL, children: "Express / EJS" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.TEAL, children: "OAuth" })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(
        CompletedWebApp,
        {
          name: "Gig Uploader",
          description: "Boost music promotion with web-scraping",
          descriptionList: /* @__PURE__ */ jsxs("ul", { className: "list-square", children: [
            /* @__PURE__ */ jsx("li", { children: "Automate gig promotion by programmatically submitting to multiple online event services." }),
            /* @__PURE__ */ jsx("li", { children: "User inputs details into a local .xls spreadsheet, and the data is uploaded publicly to Songkick, BandsInTown, Strumsy, and privately to Dubsado." }),
            /* @__PURE__ */ jsx("li", { children: "Further integration propagates this information to Spotify, Google, a user's Google Calendar, and many more locations." })
          ] }),
          blogLink: "https://blog.benhammondmusic.tech/giguploader",
          repoLink: "https://github.com/benhammondmusic/giguploader",
          img: {
            src: GigUploader.src,
            alt: "Gig Uploader Project"
          },
          category: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.SLATE, children: "Python" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.SLATE, children: "Selenium" }),
            /* @__PURE__ */ jsx(Tags, { color: ColorTags.SLATE, children: "BeautifulSoup" })
          ] })
        }
      )
    ] })
  }
) });

const RecentPosts = () => /* @__PURE__ */ jsx(
  Section,
  {
    title: /* @__PURE__ */ jsxs("div", { className: "flex  justify-between ", children: [
      /* @__PURE__ */ jsxs("div", { className: "font-rubik", children: [
        "Recent ",
        /* @__PURE__ */ jsx(GradientText, { children: "Posts" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-sm", children: /* @__PURE__ */ jsxs(
        "a",
        {
          className: "hover:text-benhammondyellow flex flex-col sm:block italic md:not-italic",
          href: "https://blog.benhammondmusic.tech",
          children: [
            /* @__PURE__ */ jsx("span", { children: "Read my " }),
            /* @__PURE__ */ jsx("span", { children: "tech blog ↗" })
          ]
        }
      ) })
    ] }),
    children: /* @__PURE__ */ jsx(BlogGallery, {})
  }
);

const AppConfig = {
  site_name: "benhammondmusic.tech",
  title: "BenHammondMusic.tech - Denver Developer && Song Builder",
  description: "Project Site and Resume for Ben Hammond",
  author: "Ben"};

const Footer = () => /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(FooterCopyright, { site_name: AppConfig.site_name }) });

const Navbar = () => /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs(NavbarTwoColumns, { children: [
  /* @__PURE__ */ jsx("a", { href: "/", children: /* @__PURE__ */ jsx(Logo, { name: "benhammondmusic.tech" }) }),
  /* @__PURE__ */ jsxs(NavMenu, { children: [
    /* @__PURE__ */ jsx(NavMenuItem, { href: "https://github.com/benhammondmusic", children: "GitHub" }),
    /* @__PURE__ */ jsx(NavMenuItem, { href: "https://www.linkedin.com/in/benhammondmusic/", children: "LinkedIn" }),
    /* @__PURE__ */ jsx(NavMenuItem, { href: "https://blog.benhammondmusic.tech", children: "Blog" }),
    /* @__PURE__ */ jsx(NavMenuItem, { href: "https://benhammondmusic.com", children: "Music" })
  ] })
] }) });

const $$Astro = createAstro();
const $$Base = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const {
    head: { title, description }
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><meta name="author"${addAttribute(AppConfig.author, "content")}><link rel="alternate" type="application/rss+xml" href="/rss.xml"><link rel="icon" type="image/x-icon" href="/favicon.ico"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Rubik+Mono+One&display=swap" rel="stylesheet"><!-- Open Graph Meta Tags --><meta property="og:title" content="BenHammondMusic.Tech"><meta property="og:description" content="Ben Hammond - Denver Developer && Song Builder"><!-- <meta property="og:image" content="URL to an image for sharing"> --><meta property="og:url" content="https://benhammondmusic.tech"><meta property="og:type" content="website">${renderHead()}</head> <body class="bg-gradient-to-br from-benhammondblue-900 to-benhammondblue text-gray-50"> ${renderComponent($$result, "Navbar", Navbar, {})} ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", Footer, {})} </body></html>`;
}, "/Users/bhammond/code/benhammond.tech/src/templates/Base.astro", void 0);

async function fetchGitHubData() {
  try {
    const token = process.env.GH_STATS_TOKEN;
    const octokit = new Octokit({
      auth: token
    });
    const response = await octokit.request("GET /users/benhammondmusic/events", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28"
      },
      per_page: 100
    });
    if (response.status !== 200) {
      throw new Error(`Failed to fetch GitHub data: ${response.status} ${response.data}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw error;
  }
}

function splitEventsByDate(events) {
  const eventsByDate2 = {};
  events.forEach((event) => {
    if (!["CreateEvent", "DeleteEvent"].includes(event.type)) {
      const eventDate = event.created_at.split("T")[0];
      if (!eventsByDate2[eventDate]) {
        eventsByDate2[eventDate] = [event];
      } else {
        eventsByDate2[eventDate].push(event);
      }
    }
  });
  return eventsByDate2;
}
const data = await fetchGitHubData();
const eventsByDate = splitEventsByDate(data);
const activityMap = {
  PushEvent: "💪",
  // Represents pushing commits
  IssuesEvent: "🐛",
  // Represents opening or closing issues
  IssueCommentEvent: "💬",
  // Represents commenting on issues
  PullRequestEvent: "⇵",
  // Represents opening, merging, or closing pull requests
  PullRequestReviewCommentEvent: "🔍",
  // Represents commenting on pull request reviews
  PullRequestReviewEvent: "👀",
  // Represents approving or requesting changes on pull requests
  ForkEvent: "🍴",
  // Represents creating a for
  WatchEvent: "⭐️"
  // Represents watching repos
};
function generateGitHubEventLink(event) {
  const eventType = event.type;
  const eventRepo = event.repo.name;
  switch (eventType) {
    case "PushEvent":
      const eventSha = event.payload.commits?.[0]?.sha ?? "";
      return `https://github.com/${eventRepo}/commit/${eventSha}`;
    case "IssuesEvent":
      return event.payload.issue.html_url;
    case "IssueCommentEvent":
    case "PullRequestReviewCommentEvent":
      return event.payload.comment.html_url;
    case "PullRequestReviewEvent":
      return event.payload.review.html_url;
    case "PullRequestEvent":
      return event.payload.pull_request.html_url;
    default:
      return `https://github.com/${eventRepo}`;
  }
}
function GitHubStats() {
  return /* @__PURE__ */ jsx(
    Section,
    {
      title: /* @__PURE__ */ jsxs("div", { className: "font-rubik", children: [
        "Recent ",
        /* @__PURE__ */ jsx(GradientText, { children: "GitHub Activity" })
      ] }),
      children: Object.entries(eventsByDate).map(([eventDate, events]) => {
        if (!events.length) return null;
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-col px-5 py-1 m-1 rounded border-white border bg-benhammondblue-800", children: [
          /* @__PURE__ */ jsx("h2", { children: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(new Date(eventDate)) }),
          /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap ", children: events.map((event) => {
            const link = generateGitHubEventLink(event);
            return /* @__PURE__ */ jsx("li", { className: "px-0.5 group hover:bg-white hover:text-benhammondblue-800", children: /* @__PURE__ */ jsxs("a", { href: link, target: "_blank", className: "flex items-center", children: [
              activityMap[event.type],
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "ml-2 opacity-0 group-hover:opacity-100 group-hover:max-w-[200px] group-hover:block group-hover:text-benhammondblue-800 group-hover:font-medium transition-all duration-[1500ms] ease-in-out max-w-0 overflow-hidden",
                  children: event.type.replace("Event", "")
                }
              )
            ] }) }, event.id);
          }) })
        ] });
      })
    }
  );
}

const $$Index = createComponent(($$result, $$props, $$slots) => {
  const { title } = AppConfig;
  const { description } = AppConfig;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "head": { title, description }, "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "Hero", Hero, { "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "RecentPosts", RecentPosts, { "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "RecentSideProjects", RecentSideProjects, { "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "GitHubStats", GitHubStats, { "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "CompletedWebAppChallenges", CompletedWebAppChallenges, { "data-astro-cid-j7pv25f6": true })}${renderComponent($$result2, "CTA", CTA, { "data-astro-cid-j7pv25f6": true })}` })}`;
}, "/Users/bhammond/code/benhammond.tech/src/pages/index.astro", void 0);

const $$file = "/Users/bhammond/code/benhammond.tech/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
