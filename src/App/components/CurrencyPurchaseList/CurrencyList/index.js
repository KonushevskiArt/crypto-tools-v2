import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CurrencyItem from "../CurrencyItem";
import { useSelector } from "react-redux";
import { removeCurrency, toggleAccardion } from "../../../redux/currencySlice";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import CurrencyNameEditor from "../CurrencyNameEditor";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import AlertDialog from "../../share/ConfirmationDialog";

import {
  averagePrice,
  totalCosts,
  totalQuantity,
} from "../../../Utils/calculations";

const CurrencyList = () => {
  const { t } = useTranslation();

  const [isOpen, setOpen] = React.useState(false);
  const [removedCurrencie, setRemovedCurrencie] = React.useState(null);

  const dispatch = useDispatch();

  const currencies = useSelector((state) => state.currencies.currencies);
  const opendAccordions =
    useSelector((state) => state.currencies.opendAccordions) || {};

  const currenciesArr = Object.keys(currencies);

  const handleRemoveCurrency = (evt, name) => {
    evt.stopPropagation();
    evt.preventDefault();
    setRemovedCurrencie(name);
    setOpen(true);
  };

  const ProvedRemoveCurrency = (name) => {
    dispatch(removeCurrency({ name }));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccordionChange = (name) => {
    dispatch(toggleAccardion({ name }));
  };

  const dialogeTitle = t("DialogeTitle_remove_currency");

  return (
    <div>
      {currenciesArr.map((currencyName) => (
        <Accordion
          expanded={opendAccordions[currencyName] || false}
          key={currencyName + Date.now()}
          sx={{ backgroundColor: "custom.foreground" }}
          onChange={() => handleAccordionChange(currencyName)}
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
              <CurrencyNameEditor currencyName={currencyName} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-beetwen",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    border: "1px solid black",
                    padding: "5px 20px",
                    borderRadius: "10px",
                    marginRight: "40px",
                  }}
                >
                  <Typography
                    sx={{
                      borderRight: "1px solid black",
                      marginRight: "20px",
                      paddingRight: "20px",
                    }}
                    component="span"
                  >
                    {averagePrice(currencies[currencyName]) || 0}
                  </Typography>
                  <Typography
                    sx={{
                      borderRight: "1px solid black",
                      marginRight: "20px",
                      paddingRight: "20px",
                    }}
                    component="span"
                  >
                    {totalQuantity(currencies[currencyName]) || 0}
                  </Typography>
                  <Typography component="span">
                    {totalCosts(currencies[currencyName]) || 0}
                  </Typography>
                </Box>
                <Tooltip title="Delete">
                  <IconButton
                    type="button"
                    color="error"
                    size="small"
                    sx={{ marginRight: "30px" }}
                    onClick={(evt) => handleRemoveCurrency(evt, currencyName)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <CurrencyItem name={currencyName} />
          </AccordionDetails>
        </Accordion>
      ))}
      <AlertDialog
        isOpen={isOpen}
        handleClose={handleClose}
        handleAccept={() => ProvedRemoveCurrency(removedCurrencie)}
        title={dialogeTitle}
      />
    </div>
  );
};

export default CurrencyList;
