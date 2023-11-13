import { useState, useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

// function CreatePostpage() {
//   const editorRef = useRef(null);
//   const log = () => {
//     if (editorRef.current) {
//       console.log(editorRef.current.getContent());
//     }
//   };

//   return (
//     <>
//       <div className="container mx-auto">
//         <div className="flex flex-col gap-4">
//           <Editor
//             apiKey=""
//             onInit={(evt, editor) => (editorRef.current = editor)}
//             initialValue="<p>This is the initial content of the editor.</p>"
//             init={{
//               height: 500,
//               menubar: false,
//               plugins: [
//                 "advlist autolink lists link image charmap print preview anchor",
//                 "searchreplace visualblocks code fullscreen",
//                 "insertdatetime media table paste code help wordcount",
//               ],
//               toolbar:
//                 "undo redo | formatselect | " +
//                 "bold italic backcolor | alignleft aligncenter " +
//                 "alignright alignjustify | bullist numlist outdent indent | " +
//                 "removeformat | help",
//               content_style:
//                 "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//             }}
//           />
//           <button onClick={log}>Log editor content</button>
//         </div>
//       </div>
//     </>
//   );
// }

function CreatePostpage() {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TinyMCE_apiKey}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      initialValue="Welcome to TinyMCE!"
    />
  );
}

export default CreatePostpage;
