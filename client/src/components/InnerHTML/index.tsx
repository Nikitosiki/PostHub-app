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
          `prose-headings:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 ` +
          `prose-p:m-0 prose-pre:m-0 ` +
          `${className ?? ""}`
        } //prose-sm sm:prose-base
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </>
  );
};

export default InnerHTML;
