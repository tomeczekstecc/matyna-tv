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
    </Button>
    <DialogContent className={'overflow-y-auto max-h-[95vh]'} style={{minWidth: '50vw'}}>
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
  triggerText: "Otwórz",
  title: "Wybierz zdjęcie"
}


DialogModal.propTypes = {

  triggerText: PropTypes.string,
  title: PropTypes.string,
}

export default DialogModal
