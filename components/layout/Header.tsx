export const Header = () => {
  return (
    <div className="style.header">
      <div className="style.headerLeft">
        <button
          onClick={() => {
            //@ts-ignore
            if (window.__theme === "dark") {
              //@ts-ignore
              window.__setPreferredTheme("light");
              //@ts-ignore
            } else if (window.__theme === "light") {
              //@ts-ignore
              window.__setPreferredTheme("dark");
            }
          }}
        >
          set theme
        </button>
      </div>
    </div>
  );
};
