import { Head, Html, Main, NextScript } from "next/document";

const MyDocument = () => {
  return (
    <Html>
      <Head />
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
              function setNewTheme(newTheme) {
                window.__theme = newTheme;
                if (newTheme === "dark") {
                  document.documentElement.classList.add("dark");
                } else if(newTheme ==='light') {
                  document.documentElement.classList.remove('dark');
                }
              }
            
              var preferredTheme;
              try {
                preferredTheme = localStorage.getItem('theme')
              } catch (error) {
              
              }
            
            window.__setPreferredTheme = function(theme){
              try{
                localStorage.setItem('theme', theme)
              }catch (e) {
              
              }
              preferredTheme= theme
              setNewTheme(theme)
            }
            var initialTheme = preferredTheme;
            var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (!initialTheme) {
              initialTheme = darkQuery.matches ? 'dark' : 'light';
            }
            setNewTheme(initialTheme);
            darkQuery.addEventListener('change', function (e) {
              if (!preferredTheme) {
                setNewTheme(e.matches ? 'dark' : 'light');
              }
            });
            })()

`,
          }}
        ></script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

//@ts-ignore

export default MyDocument;
