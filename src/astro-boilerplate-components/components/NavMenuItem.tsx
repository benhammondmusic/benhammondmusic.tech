type INavMenuItemProps = {
  href: string;
  children: string;
};

const NavMenuItem = (props: INavMenuItemProps) => (
  <li className="hover:text-benhammondyellow">
    <a href={props.href}>{props.children}</a>
  </li>
);

export { NavMenuItem };
