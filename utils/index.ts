//
export const isDarkMode =
  typeof window !== "undefined" && window.__theme === "dark" ? true : false;

export const appInfo = {
  0: {
    imgPath: "/assets/images/productInfo_1.png",
    title: "Some lengthy title Info needs to be updated later on1",
    subTitle:
      "Some lengthy Info needs to be updated later on. Some lengthy Info needs to be updated later on",
  },
  1: {
    imgPath: "/assets/images/productInfo_2.png",
    title: "Some lengthy title2 needs to be updated later on2",
    subTitle:
      "Some lengthy Info 2 needs to be updated later on. Some lengthy Info needs to be updated later on",
  },
  2: {
    imgPath: "/assets/images/productInfo_1.png",
    title: "Some lengthy title3 needs to be updated later on3s",
    subTitle:
      "Some lengthy Info 3 needs to be updated later on. Some lengthy Info needs to be updated later on",
  },
};

export const getFirst = (list: any[]): any => {
  return list.length > 0 ? list[0] : null;
};

export const defaultRedirectRoutes = {
  loggedIn: "dashboard",
  anonyms: "login",
};

/**
 * if has redirect param in path then redirect to redirect path
 * else
 * redirect to that path provided
 *
 */
export const redirectPath = (path: string, defaultPath: string) => {
  //dummy URL
  const dummyUrl = new URL(path, "http://localhost:3000/");

  const redirect = dummyUrl.searchParams.get("redirect");
  if (!redirect) return defaultPath;
  return redirect;
};

export const appendRedirectPath = (path: string) => {
  const dummyUrl = new URL(path, "http://localhost:3000/");

  dummyUrl.searchParams.append("redirect", path);
  return dummyUrl.search;
};
