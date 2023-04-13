import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import AppModal from "../components/share/Modal";
import CommissionCalculator from "../components/Calculators/CommisionCalculator";
import InterestCalculator from "../components/Calculators/InterestCalculator";
import CalculateIcon from "@mui/icons-material/Calculate";

const CalculatorsPage = () => {
  const { t } = useTranslation();
  const [modalContent, setModalContent] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const showCommisionCalculator = () => {
    setModalContent(<CommissionCalculator />);
    setOpenModal(true);
  };

  const showInterestCalculator = () => {
    setModalContent(<InterestCalculator />);
    setOpenModal(true);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "30px",
          gap: "20px",
        }}
      >
        <Button
          size="small"
          color="success"
          type="button"
          variant="contained"
          sx={{
            margin: "10px",
          }}
          startIcon={<CalculateIcon />}
          onClick={showCommisionCalculator}
        >
          {t("ComissionCalculator")}
        </Button>

        <Button
          size="small"
          color="success"
          type="button"
          variant="contained"
          sx={{
            margin: "10px",
          }}
          startIcon={<CalculateIcon />}
          onClick={showInterestCalculator}
        >
          {t("InteresetCalculator")}
        </Button>
      </Box>
      <AppModal open={openModal} setOpen={setOpenModal}>
        {modalContent}
      </AppModal>
    </>
  );
};

export default CalculatorsPage;
