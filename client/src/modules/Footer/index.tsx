const Footer = () => {
  return (
    <>
      <footer className="bottom-0">
        <hr className="mt-8 h-px border-0 bg-background-200"></hr>
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between py-2">
            <div className="w-full text-center">
              <p className="mt-2 text-sm first-line:text-default-500">
                Created by{" "}
                <a
                  href="https://www.linkedin.com/in/nikita-savenko-dev/"
                  className="text-primary"
                >
                  Nikita Savenko
                </a>
              </p>

              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <a href="/" className="mx-2 text-xs text-primary">
                  PostHub
                </a>
                <a
                  href="https://vercel.com/"
                  className="mx-2 text-xs text-primary"
                >
                  Deployed on Vercel
                </a>
                <a
                  href="https://github.com/Nikitosiki/PostHub-app"
                  className="mx-2 text-xs text-primary"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
