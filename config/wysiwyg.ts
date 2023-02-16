export const getWysiwygConfig = (theme) => {
  return {
    language: 'pl',
    branding: false,
    skin: theme == 'dark' ? "oxide-dark" : "oxide",
    content_css: theme === "dark" ? "dark" : "default",
    height: 500,
    // menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code',
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  }
}
