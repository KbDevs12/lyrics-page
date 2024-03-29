"use client";
const NoLirik = () => {
  const refreshPage = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  };
  return (
    <div className="container-404">
      <div>
        <div>
          <div className="starsec"></div>
          <div className="starthird"></div>
          <div className="starfourth"></div>
          <div className="starfifth"></div>

          <section className="error">
            <div className="error__content">
              <div className="error__message message">
                <h1 className="message__title">Lyrics Not Found</h1>
                <p className="message__text">
                  We`re sorry, the page you were looking for i`snt found here.
                  The link you followed may either be broken or no longer
                  exists. Please try again, or take a look at our.
                </p>
              </div>
              <div className="error__nav e-nav">
                <button className="e-nav__link" onClick={refreshPage}></button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default NoLirik;
