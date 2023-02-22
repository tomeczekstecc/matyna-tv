import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import PropTypes from "prop-types";

const DialogModal = ({children, triggerText, title}) => {
  return <Dialog>
    <Button>
    <DialogTrigger>{triggerText}</DialogTrigger>
  </Button><DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>
          {children}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
}

DialogModal.defaultProps = {
  triggerText: "Otworz",
  title: "Czy na pewno?"
}


DialogModal.propTypes = {

  triggerText: PropTypes.string,
  title: PropTypes.string,
}

export default DialogModal
