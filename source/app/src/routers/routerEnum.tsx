interface RouterEnumType {
  path: string;
}

export const RouterEnum: Record<string, RouterEnumType> = {
  Login: { path: '/login'},
  FindPWD: { path: '/find-password'},
  Register: { path: '/create-account'},
  ChangePWD: { path: '/change-password'},
  Home: { path: '/'},
};
