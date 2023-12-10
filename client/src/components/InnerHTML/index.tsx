import { FC } from "react";

type TypeInnerHTMLProps = {
  content: string;
  className?: string;
};

const InnerHTML: FC<TypeInnerHTMLProps> = ({ content, className }) => {
  return (
    <>
      <div
        className={
          `prose prose-gray max-w-none dark:prose-invert ` +
          // h1-h6
          `prose-h1:my-[0.65em] prose-h1:text-[2em] prose-h1:font-bold ` +
          `prose-h2:my-[0.83em] prose-h2:text-[1.5em] prose-h2:font-bold ` +
          `prose-h3:my-[1em] prose-h3:text-[1.17em] prose-h3:font-bold ` +
          `prose-h4:my-[1.33em] prose-h4:text-[1em] prose-h4:font-bold ` +
          `prose-h5:my-[1.67em] prose-h5:text-[0.83em] prose-h5:font-bold ` +
          `prose-h6:my-[2.33em] prose-h6:text-[0.67em] prose-h6:font-bold ` +
          //...
          `prose-p:my-[1em] ` +
          `prose-code:rounded-[3px] prose-code:bg-default-200 prose-code:px-[0.2em] prose-code:py-[0.1em] prose-code:font-light prose-code:before:content-none prose-code:after:content-none ` +
          `prose-pre:my-[1em] prose-pre:whitespace-pre prose-pre:rounded-none prose-pre:bg-inherit prose-pre:p-0 prose-pre:font-mono prose-pre:text-[1em] prose-pre:leading-[1.4em] prose-pre:text-default-foreground ` +
          `prose-img:m-0 prose-img:inline prose-img:overflow-clip ` +
          `${className ?? ""}`
        } //prose-sm sm:prose-base
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default InnerHTML;
