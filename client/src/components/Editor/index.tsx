import { FC } from "react";

import { Editor as EditorTiny } from "@tinymce/tinymce-react";
import { useSwitchTheme } from "src/hooks";

const Editor: FC = () => {
  const [isDarkTheme] = useSwitchTheme();

  return (
    <EditorTiny
      apiKey={import.meta.env.VITE_TinyMCE_apiKey}
      init={{
        height: 500,
        menubar: false,
        skin: isDarkTheme ? "oxide-dark" : "oxide",
        content_css: isDarkTheme ? "dark" : "default",
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
          "preview",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help | preview",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      // initialValue="Description"
    />
  );
};

export default Editor;
