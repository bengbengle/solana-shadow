import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
// import { Quest } from "../target/types/quest";

const assert = require("assert");

const { SystemProgram } = anchor.web3;

// import { Keypair } from '@solana/web3.js'

describe("quest", () => {
  
  const provider = anchor.AnchorProvider.env();

  // // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  // anchor.setProvider(anchor.AnchorProvider.env());


  // Counter for the tests.
  // const counter = anchor.web3.Keypair.generate();

  // Program for the tests.
  // const program = anchor.workspace.quest as Program<Quest>; 
  let _myAccount: any

  it("Creates and initializes an account in a single atomic transaction (simplified)", async () => {
    // #region code-simplified
    // The program to execute.
    const program = anchor.workspace.Quest;


    // The Account to create.
    const myAccount = anchor.web3.Keypair.generate();

    // Create the new account and initialize it with the program.
    // #region code-simplified
    await program.methods
      .initialize(new anchor.BN(1234))
      .accounts({
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([myAccount])
      .rpc();
    // #endregion code-simplified

    // Fetch the newly created account from the cluster.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was initialized.
    assert.ok(account.data.eq(new anchor.BN(1234)));

    // Store the account for the next test.
    _myAccount = myAccount;
  });

  it("Updates a previously created account", async () => {
    const myAccount = _myAccount;

    // #region update-test

    // The program to execute.
    const program = anchor.workspace.Quest;

    // Invoke the update rpc.
    await program.methods
      .update(new anchor.BN(4321))
      .accounts({
        myAccount: myAccount.publicKey,
      })
      .rpc();

    // Fetch the newly updated account.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    // Check it's state was mutated.
    assert.ok(account.data.eq(new anchor.BN(4321)));

    // #endregion update-test
  });
});
