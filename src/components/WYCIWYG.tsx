import React, { useRef } from "react"
import { getWysiwygConfig } from "@/config/wysiwyg"
import { Editor } from "@tinymce/tinymce-react"
import { useTheme } from "next-themes"
import PropTypes from "prop-types"

import { Label } from "@/components/ui/label"

export default function WYSIWYG(props: { label: string }) {
  const { theme } = useTheme()
  const editorRef = useRef(null)
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }
  return (
    <>
      <Label className={"mb-0"}>{props.label}</Label>
      <Editor
        apiKey="gd0owyf8n5o27wcnj89c2vhbq0n3bkbd5lfl42s995m0gb4p"
        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue="<p>Tutaj umieść treść</p>"
        init={getWysiwygConfig(theme)}
      />
    </>
  )
}

WYSIWYG.defaultProps = {
  label: "Treść",
}

WYSIWYG.propTypes = {
  label: PropTypes.string,
}
