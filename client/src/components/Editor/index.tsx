import { FC } from "react";

import { Editor as EditorTiny, IAllProps } from "@tinymce/tinymce-react";
import { useSwitchTheme } from "src/hooks";

const Editor: FC<IAllProps> = (props) => {
  const [isDarkTheme] = useSwitchTheme();

  return (
    <EditorTiny
      apiKey={import.meta.env.VITE_TINYMCE_KEY}
      init={{
        // height: 500,
        menubar: false,
        paste_data_images: false,
        // skin: isDarkTheme ? "oxide-dark" : "oxide",
        content_css: isDarkTheme ? "dark" : "default",
        skin: "oxide",
        // content_css: "default",
        plugins: [
          "accordion",
          "preview",
          "lists",
          "advlist",
          "wordcount",
          "emoticons",
          "help",
          "paste",
          "link",
          "autolink",
          "image",
          "media",
          // "code",
        ],
        toolbar:
          "undo redo | styles align | bold italic underline strikethrough | " +
          "outdent indent | bullist numlist accordion | " +
          "forecolor backcolor emoticons | " +
          "image media | " +
          "preview help", // code
      }}
      {...props}
    />
  );
};

export default Editor;
