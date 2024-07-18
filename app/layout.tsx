import "./styles.css";

// const getTemplate = () => {
//   const filePath = path.join(process.cwd(), 'public', 'template.html');
//   const htmlContent = fs.readFileSync(filePath, 'utf8');
//   const [headerContent, bodyContent] = htmlContent.split('<body className="with-cu-identity">');
//   const headContent = headerContent.split('<head>')[1].split('</head>')[0];
//   const [bodyAboveContent, bodyBelowContent] = bodyContent.split('{content}');
//   const bodyBelowParts = bodyBelowContent.split('</body>');

//   return { headContent, bodyAboveContent, bodyBelowContent: bodyBelowParts[0] };
// };

// const { headContent, bodyAboveContent, bodyBelowContent } = getTemplate();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <title>Paper Matching</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="msapplication-TileColor" content="#2c53da" />
        <meta name="theme-color" content="#ffffff" />
      </head>

      <body className="with-cu-identity">

        <div className="flex-wrap-footer">
          <header>

            <div id="header" className="is-hidden-mobile">
              <a aria-hidden="true" href="{{url_path('ignore_me')}}"></a>
              <div className="header-breadcrumbs">
                {/* <a href="https://arxiv.org/"><img src="https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-one-color-white.svg" alt="arxiv logo" style={{ height: "40px" }} /></a> */}
                <h2>Paper Matching</h2>
                <span>&gt;</span>
                <a href="https://arxiv.org/list/hep-ph/recent">hep-ph</a>
              </div>
            </div>

            <div className="mobile-header">
              <div className="columns is-mobile">
                <div className="column logo-arxiv"><a href="https://arxiv.org/"><img src="https://arxiv.org/static/browse/0.3.4/images/arxiv-logomark-small-white.svg" alt="arXiv logo" style={{ height: "60px" }} /></a></div>
                <div className="column logo-cornell"><a href="https://www.cornell.edu/">
                  <picture>
                    <source media="(min-width: 501px)"
                      srcSet="https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell-reduced-white-SMALL.svg  400w"
                      sizes="400w" />
                    <source srcSet="https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell_seal_simple_black.svg 2x" />
                    <img src="https://arxiv.org/static/browse/0.3.4/images/icons/cu/cornell-reduced-white-SMALL.svg" alt="Cornell University Logo" />
                  </picture>
                </a></div>
                <div className="column nav" id="toggle-container" role="menubar">
                  <button className="toggle-control"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="icon filter-white"><title>open search</title><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" /></svg></button>
                  <div className="mobile-toggle-block toggle-target">
                    <form className="mobile-search-form" method="GET" action="https://arxiv.org/search">
                      <div className="field has-addons">
                        <input className="input" type="text" name="query" placeholder="Search..." aria-label="Search term or terms" />
                        <input type="hidden" name="source" value="header" />
                        <input type="hidden" name="searchtype" value="all" />
                        <button className="button">GO</button>
                      </div>
                    </form>
                  </div>

                  <button className="toggle-control"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="icon filter-white" role="menu"><title>open navigation menu</title><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" /></svg></button>
                  <div className="mobile-toggle-block toggle-target">
                    <nav className="mobile-menu" aria-labelledby="mobilemenulabel">
                      <h2 id="mobilemenulabel">quick links</h2>
                      <ul>
                        <li><a href="https://arxiv.org/login">Login</a></li>
                        <li><a href="https://info.arxiv.org/help">Help Pages</a></li>
                        <li><a href="https://info.arxiv.org/about">About</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main>
            <div id="content">
              <div id='content-inner'>
                <div id='dlpage'>
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>

  );
};
