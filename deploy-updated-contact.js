const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying updated ContactObjects contract...");

  const ContactObjects = await ethers.getContractFactory("ContactObjects");
  const contactObjects = await ContactObjects.deploy();

  await contactObjects.deployed();

  console.log("Updated ContactObjects deployed to:", contactObjects.address);
  console.log("Update your frontend ContactObjects.ts file with this address:");
  console.log(`export const CONTACT_OBJECTS_ADDRESS = "${contactObjects.address}";`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });