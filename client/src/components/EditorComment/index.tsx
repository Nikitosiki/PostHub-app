import { FC } from "react";
import { Editor as EditorTiny, IAllProps } from "@tinymce/tinymce-react";

import { useSwitchTheme } from "src/hooks";
import "./style.css";

const EditorComment: FC<IAllProps> = (props) => {
  const [isDarkTheme] = useSwitchTheme();

  return (
    <EditorTiny
      apiKey={import.meta.env.VITE_TinyMCE_apiKey}
      init={{
        height: 250,
        menubar: false,
        forced_root_block: "div",
        skin: isDarkTheme ? "oxide-dark" : "oxide",
        content_css: isDarkTheme ? "dark" : "default",
        plugins: [
          // "accordion",
          // "preview",
          "lists",
          "advlist",
          "wordcount",
          "emoticons",
          "help",
          "paste",
          "link",
          "autolink",
          // "code",
        ],
        toolbar:
          "undo redo | styles bold italic underline strikethrough | " + //align
          "bullist numlist | " + // outdent indent accordion
          "forecolor backcolor emoticons |" +
          "help", // preview code
      }}
      {...props}
    />
  );
};

export default EditorComment;
