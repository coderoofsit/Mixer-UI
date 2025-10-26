import React from 'react';
import BackgroundUnpaid from './BackgroundUnpaid';
import BackgroundPending from './BackgroundPending';
import UpgradePlan from './UpgradePlan';

const VerificationStatus = ({ profileData, handlePayForVerification }) => {
  // Background check not paid
  if (profileData?.backgroundVerification === "unpaid") {
    return <BackgroundUnpaid handlePayForVerification={handlePayForVerification} />;
  }

  // Background check pending
  if (profileData?.backgroundVerification === "pending") {
    return <BackgroundPending />;
  }

  // Approved but no plan
  if (profileData?.backgroundVerification === "approved" && !profileData?.currentPlan) {
    return <UpgradePlan handlePayForVerification={handlePayForVerification} />;
  }

  return null;
};

export default VerificationStatus;

