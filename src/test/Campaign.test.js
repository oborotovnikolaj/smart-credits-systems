const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const options = { gasLimit: 10000000000 };
const web3 = new Web3(ganache.provider(options));

const bankCompiled = require('../ethereum/build/Bank.json');
const fnsCompiled = require('../ethereum/build/Fns.json');
const ofdCompiled = require('../ethereum/build/Ofd.json');
const targetCreditCompiled = require('../ethereum/build/TargetCredit.json');
const billCompiled = require('../ethereum/build/Bill.json');
const shopCompiled = require('../ethereum/build/Shop.json');
const contractFabricCompiled = require('../ethereum/build/ContractFabric.json');

let accounts;
let bank;
let fns;
let ofd;
let credit;
let bill;
let shop;
let fabric;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    fabric = await new web3.eth.Contract(contractFabricCompiled.ContractFabric.abi)
        .deploy({data: contractFabricCompiled.ContractFabric.evm.bytecode.object})
        .send({from: accounts[0], gas: '1000000000'});

    //создаем банк
    await fabric.methods
        .createBank()
        .send({
            from: accounts[0],
            gas: '3000000'
        });

    [addressBank] = await fabric.methods.getBanks().call();

    bank = await new web3.eth.Contract(
        bankCompiled.Bank.abi,
        addressBank
    );

    //создаем фнс

    await fabric.methods
        .createFns()
        .send({
            from: accounts[0],
            gas: '3000000'
        });

    [addressFns] = await fabric.methods.getFnsList().call();

    fns = await new web3.eth.Contract(
        fnsCompiled.Fns.abi,
        addressFns
    );

    //создаем офд

    await fabric.methods
        .createOfd()
        .send({
            from: accounts[0],
            gas: '3000000'
        });

    [addressOfd] = await fabric.methods.getOfdList().call();

    ofd = await new web3.eth.Contract(
        ofdCompiled.Ofd.abi,
        addressOfd
    );

    //создаем магазин

    await fabric.methods
        .createShop()
        .send({
            from: accounts[0],
            gas: '3000000'
        });

    [addressShop] = await fabric.methods.getShops().call();

    shop = await new web3.eth.Contract(
        shopCompiled.Shop.abi,
        addressShop
    );

    // настрйки

    await shop.methods
        .setOfd(ofd.options.address)
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    await ofd.methods
        .setFns(fns.options.address)
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    await ofd.methods
        .addShop(shop.options.address)
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    await shop.methods
        .setOfd(ofd.options.address)
        .send({
            from: accounts[0],
            gas: '1000000'
        });

    await fabric.methods
        .createSmartCredit()
        .send({
            from: accounts[0],
            gas: '3000000'
        });

    [addressCredit] = await fabric.methods.getCredits(accounts[0]).call();

    credit = await new web3.eth.Contract(
        targetCreditCompiled.TargetCredit.abi,
        addressCredit
    );

    await credit.methods
        .setShop(shop.options.address)
        .send({
            from: accounts[0],
            gas: '3000000'
        });

    await credit.methods
        .addProduct(2, 100)
        .send({
            from: accounts[0],
            gas: '3000000'
        });

    await credit.methods
        .addProduct(3, 500)
        .send({
            from: accounts[0],
            gas: '3000000'
        });

    await credit.methods
        .setBank(bank.options.address)
        .send({
            from: accounts[0],
            gas: '3000000'
        });
});

describe('SmartCreditProject', () => {
    it('deploys participants', () => {
        assert.ok(fabric.options.address);
        assert.ok(bank.options.address);
        assert.ok(shop.options.address);
        assert.ok(ofd.options.address);
        assert.ok(fns.options.address);
        assert.ok(credit.options.address);
    });

    it('check participants settings', async () => {
        let actualBank = await credit.methods.getBank().call();
        assert.equal(actualBank, bank.options.address);

        let actualShop = await credit.methods.getShop().call();
        assert.equal(actualShop, shop.options.address);

        let actualOfd = await shop.methods.getOfd().call();
        assert.equal(actualOfd, ofd.options.address);

        let actualFns = await ofd.methods.getFns().call();
        assert.equal(actualFns, fns.options.address);

        let actualCredits = await fabric.methods.getCredits(accounts[0]).call();
        assert.deepEqual(actualCredits, [credit.options.address]);

        let expectedShopBasket = {'0': ['2', '3'], '1': ['100', '500']};
        let actualShopBasket = await credit.methods.getShopBasket().call();
        assert.deepEqual(actualShopBasket, expectedShopBasket);
    });

    it('registration of credit in bank', async () => {
        assert.equal(await credit.methods.getRegisteredInBank().call(), false);
        assert.deepEqual(await bank.methods.getAllCredits(accounts[0]).call(), []);

        await credit.methods
            .registerInBank()
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.equal(await credit.methods.getRegisteredInBank().call(), true);
        assert.deepEqual(await bank.methods.getAllCredits(accounts[0]).call(), [credit.options.address]);
    });

    it('approve of credit by bank owner', async () => {
        await credit.methods
            .registerInBank()
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.equal(await credit.methods.getPaper().call(), "");

        await bank.methods
            .approveCredit(credit.options.address, "shit")
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.deepEqual(await credit.methods.getPaper().call(), "shit");
    });

    it('approve of credit by client', async () => {
        await credit.methods
            .registerInBank()
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await bank.methods
            .approveCredit(credit.options.address, "shit")
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.equal(await credit.methods.getApprovedByClient().call(), false);

        await credit.methods
            .approveByClient("shit")
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.equal(await credit.methods.getApprovedByClient().call(), true);
    });

    it('registration of credit in shop', async () => {
        await credit.methods
            .registerInBank()
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await bank.methods
            .approveCredit(credit.options.address, "shit")
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await credit.methods
            .approveByClient("shit")
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.equal(await credit.methods.getRegisteredInShop().call(), false);
        assert.deepEqual(await shop.methods.getAllCredits(accounts[0]).call(), [])

        await credit.methods
            .registerInShop()
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.equal(await credit.methods.getRegisteredInShop().call(), true);
        assert.deepEqual(await shop.methods.getAllCredits(accounts[0]).call(), [credit.options.address])
    });

    it('approve of credit by shop owner', async () => {
        await credit.methods
            .registerInBank()
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await bank.methods
            .approveCredit(credit.options.address, "shit")
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await credit.methods
            .approveByClient("shit")
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await credit.methods
            .registerInShop()
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.equal(await credit.methods.getPaid().call(), false);
        assert.deepEqual(await ofd.methods.getAllCredits().call(), []);
        assert.deepEqual(await credit.methods.getSmartBill().call(), 0x0000000000000000000000000000000000000000);
        //по хорошему еще офд и фнс нужно проверить и смарт бил
        // assert.equal(await fns.methods.getPaid().call(), false);

        await shop.methods
            .approveByShopOwner(credit.options.address)
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.equal(await credit.methods.getPaid().call(), true);
        assert.deepEqual(await ofd.methods.getAllCredits().call(), [credit.options.address])
        assert.notDeepEqual(await credit.methods.getSmartBill().call(), 0x0000000000000000000000000000000000000000);
    });

    it('close credit by bank owner', async () => {
        await credit.methods
            .registerInBank()
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await bank.methods
            .approveCredit(credit.options.address, "shit")
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await credit.methods
            .approveByClient("shit")
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await credit.methods
            .registerInShop()
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        await shop.methods
            .approveByShopOwner(credit.options.address)
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        assert.equal(await credit.methods.getClosed().call(), false);
        //по хорошему еще офд и фнс нужно проверить и смарт бил
        // assert.equal(await fns.methods.getPaid().call(), false);

        await bank.methods
            .closeCredit(credit.options.address)
            .send({
                from: accounts[0],
                gas: '3000000'
            });

        const p = await credit.methods
            .getSummary(accounts[0])
            .call();

        console.log(p);

        assert.equal(await credit.methods.getClosed().call(), true);
    });
});
