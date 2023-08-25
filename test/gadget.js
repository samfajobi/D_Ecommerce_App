//const { getContractFactory } = require("@nomicfoundation/hardhat-ethers/types");

const expect = require("chai").expect;

const tokens = (n) => {

}

// constant variables for item listing
const ID = 2
const NAME = "Cap"
const CATEGORY = "Dress"
const IMAGE = "https://scarlet-uneven-rodent-526.mypinata.cloud/ipfs/QmSn7ib8wozfZ1UreUh7RQvvaMVTX4fUz8UyUcEWZPUAfu?_gl=1*1il03it*_ga*MjAzMzA3MTYxNi4xNjkyNzMzNTQw*_ga_5RMPXG14TE*MTY5MjgwODEzNS40LjEuMTY5MjgwODMwMi42MC4wLjA."
const COST = 2
const RATING = 2
const STOCK = 2

describe("Gadget", () => {

    let gadget
    let deployer, buyer

    beforeEach(async () => {
        [deployer, buyer] = await ethers.getSigners()
        const Gadget = await ethers.getContractFactory("GadgetCommerce")
        gadget = await Gadget.deploy()
    });
    
    describe("Deployment", () => {
        it("Set owner to address", async () => {
            expect(await gadget.owner()).to.equal(deployer.address)
        })
    });

    describe("Listing", () => {
        let transactions

        beforeEach(async () => {
            transactions = await gadget.connect(deployer).list(
                ID,
                NAME,
                CATEGORY,
                IMAGE,
                COST,
                RATING,
                STOCK,
            )

            await transactions.wait()
        })

        it("Return Items attributes", async () => {
            const item = await gadget.items(ID)
            console.log(item)
            console.log(item.id)
            expect(item.id).to.equal(ID)
            expect(item.name).to.equal(NAME) 
            expect(item.category).to.equal(CATEGORY)   
        })

        it("Emit events", async() => {
            expect(transactions).to.emit(gadget, 'List')
        })
    });   
})

    
















// const {
//   time,
//   loadFixture,
// } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
// const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
// const { expect } = require("chai");

// describe("Lock", function () {
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployOneYearLockFixture() {
//     const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
//     const ONE_GWEI = 1_000_000_000;

//     const lockedAmount = ONE_GWEI;
//     const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

//     // Contracts are deployed using the first signer/account by default
//     const [owner, otherAccount] = await ethers.getSigners();

//     const Lock = await ethers.getContractFactory("Lock");
//     const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//     return { lock, unlockTime, lockedAmount, owner, otherAccount };
//   }

//   describe("Deployment", function () {
//     it("Should set the right unlockTime", async function () {
//       const { lock, unlockTime } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.unlockTime()).to.equal(unlockTime);
//     });

//     it("Should set the right owner", async function () {
//       const { lock, owner } = await loadFixture(deployOneYearLockFixture);

//       expect(await lock.owner()).to.equal(owner.address);
//     });

//     it("Should receive and store the funds to lock", async function () {
//       const { lock, lockedAmount } = await loadFixture(
//         deployOneYearLockFixture
//       );

//       expect(await ethers.provider.getBalance(lock.target)).to.equal(
//         lockedAmount
//       );
//     });

//     it("Should fail if the unlockTime is not in the future", async function () {
//       // We don't use the fixture here because we want a different deployment
//       const latestTime = await time.latest();
//       const Lock = await ethers.getContractFactory("Lock");
//       await expect(Lock.deploy(latestTime, { value: 1 })).to.be.revertedWith(
//         "Unlock time should be in the future"
//       );
//     });
//   });

//   describe("Withdrawals", function () {
//     describe("Validations", function () {
//       it("Should revert with the right error if called too soon", async function () {
//         const { lock } = await loadFixture(deployOneYearLockFixture);

//         await expect(lock.withdraw()).to.be.revertedWith(
//           "You can't withdraw yet"
//         );
//       });

//       it("Should revert with the right error if called from another account", async function () {
//         const { lock, unlockTime, otherAccount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // We can increase the time in Hardhat Network
//         await time.increaseTo(unlockTime);

//         // We use lock.connect() to send a transaction from another account
//         await expect(lock.connect(otherAccount).withdraw()).to.be.revertedWith(
//           "You aren't the owner"
//         );
//       });

//       it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
//         const { lock, unlockTime } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         // Transactions are sent using the first signer by default
//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).not.to.be.reverted;
//       });
//     });

//     describe("Events", function () {
//       it("Should emit an event on withdrawals", async function () {
//         const { lock, unlockTime, lockedAmount } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw())
//           .to.emit(lock, "Withdrawal")
//           .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//       });
//     });

//     describe("Transfers", function () {
//       it("Should transfer the funds to the owner", async function () {
//         const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
//           deployOneYearLockFixture
//         );

//         await time.increaseTo(unlockTime);

//         await expect(lock.withdraw()).to.changeEtherBalances(
//           [owner, lock],
//           [lockedAmount, -lockedAmount]
//         );
//       });
//     });
//   });
// });
