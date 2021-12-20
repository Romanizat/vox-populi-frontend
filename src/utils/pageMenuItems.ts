export const userMenu: IMenuItem[] = [
  {title: "Events", icon: "event", path: "/events"},
  {title: "Profile", icon: "person", path: "/profile"}
];

export const adminMenu: IMenuItem[] = userMenu.concat({
  title: "Users", icon: "groups", path: "/users"
});
