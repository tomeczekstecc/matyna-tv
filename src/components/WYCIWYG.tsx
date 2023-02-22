import React, { useRef } from "react"
import { getWysiwygConfig } from "@/config/wysiwyg"
import { Editor } from "@tinymce/tinymce-react"
import { useTheme } from "next-themes"
import PropTypes from "prop-types"

import { Label } from "@/components/ui/label"

export default function WYSIWYG(props: { label: string, value: string, onChange: (value: string) => void }) {
  const { theme } = useTheme()
  const editorRef = useRef(null)
  return (
    <>
      <Label className={"mb-0"}>{props.label}</Label>
      <Editor
        apiKey="gd0owyf8n5o27wcnj89c2vhbq0n3bkbd5lfl42s995m0gb4p"
        // @ts-ignore

        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue="<p>Tutaj umieść treść</p>"
        init={getWysiwygConfig(theme)}
        value={props.value}
        onChange={(e) => {
          console.log(e.target.getContent())
          props.onChange(e.target.getContent())
          }
        }
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
