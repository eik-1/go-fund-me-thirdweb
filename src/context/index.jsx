import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export function StateProvider({ children }) {
  const { contract } = useContract(
    "0xDeBd940fED803bD275943f09f65d9eBb0d199E8c"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = useMetamask();

  async function publishCampaign(form) {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getCampaigns() {
    try {
      const campaigns = await contract.call("getCampaigns");
      const parsedCampaigns = campaigns.map((campaign, index) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountColleted.toString()
        ),
        image: campaign.image,
        pid: index,
      }));
      return parsedCampaigns;
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserCampaigns() {
    try {
      const allCampaigns = await getCampaigns();
      const filteredCampaigns = allCampaigns.filter(
        (campaign) => campaign.owner === address
      );
      return filteredCampaigns;
    } catch (err) {
      console.log(err);
    }
  }

  async function donate(pid, amount) {
    try {
      console.log("pid:", pid);
      console.log("Amount:", amount);
      const data = await contract.call("donateToCampaign", [pid], {
        value: ethers.utils.parseEther(amount),
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function getDonations(pid) {
    const donations = await contract.call("getDonators", [pid]);
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];
    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }
    return parsedDonations;
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}

export function useStateContext() {
  return useContext(StateContext);
}
