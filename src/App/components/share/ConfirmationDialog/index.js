import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslation } from "react-i18next";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import DoneIcon from "@mui/icons-material/Done";

export default function AlertDialog({
  isOpen,
  handleClose,
  handleAccept,
  title,
}) {
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogActions>
        <Button startIcon={<DoDisturbIcon />} onClick={handleClose}>
          {t("Disagree")}
        </Button>
        <Button startIcon={<DoneIcon />} onClick={handleAccept}>
          {t("Agree")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
