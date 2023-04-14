/* eslint-env browser */
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CurrencyItem from "./CurrencyItem";
import { useSelector } from "react-redux";
import { removeCurrency } from "../../../redux/currencySlice";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CurrencyNameEditor from "./CurrencyNameEditor";
import { useTranslation } from "react-i18next";
import AlertDialog from "../../share/ConfirmationDialog";
import Box from "@mui/material/Box";
import AdditionalInfo from "./AdditionalInfo";

const CurrencyList = () => {
  const { t } = useTranslation();

  const [isOpen, setOpen] = React.useState(false);
  const [removedCurrencyId, setRemovedCurrencyId] = React.useState(null);

  const dispatch = useDispatch();

  const currencies = useSelector((state) => state.currencies.currencies);

  const currenciesArr = Object.keys(currencies);

  const handleRemoveCurrency = (evt, id) => {
    evt.stopPropagation();
    evt.preventDefault();
    setRemovedCurrencyId(id);
    setOpen(true);
  };

  const ProvedRemoveCurrency = (id) => {
    dispatch(removeCurrency({ id }));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogeTitle = t("DialogeTitle_remove_currency");

  return (
    <div>
      {currenciesArr.map(( currencyId ) => (
        <Accordion
          key={currencyId}
          sx={{ backgroundColor: "custom.foreground" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <CurrencyNameEditor currencyId={currencyId} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-beetwen",
                  alignItems: "center",
                }}
              >
                <AdditionalInfo currencies={currencies} currencyId={currencyId} />
                <Tooltip title="Delete">
                  <IconButton
                    type="button"
                    color="error"
                    size="small"
                    sx={{ marginRight: "30px" }}
                    onClick={(evt) => handleRemoveCurrency(evt, currencyId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <CurrencyItem currencyId={currencyId} />
          </AccordionDetails>
        </Accordion>
      ))}
      <AlertDialog
        isOpen={isOpen}
        handleClose={handleClose}
        handleAccept={() => ProvedRemoveCurrency(removedCurrencyId)}
        title={dialogeTitle}
      />
    </div>
  );
};

export default CurrencyList;
