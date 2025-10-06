import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SimpleVoting } from "../target/types/simple_voting";
import { expect } from "chai";

describe("simple-voting", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.SimpleVoting as Program<SimpleVoting>;

  const provider = anchor.getProvider();

  const user = provider.wallet as anchor.Wallet;
  const votingKeypair = anchor.web3.Keypair.generate();
  const votingKeypair2 = anchor.web3.Keypair.generate();

  it("Is initialized!", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        vote: votingKeypair.publicKey,
        user: user.publicKey,
      })
      .signers([votingKeypair])
      .rpc();
    console.log("Your transaction signature", tx);

    const voteAccount = await program.account.vote.fetch(
      votingKeypair.publicKey
    );
    console.log("Vote account", voteAccount);
    expect(voteAccount.optionA).to.be.false;
    expect(voteAccount.optionB).to.be.false;
    expect(voteAccount.hasVoted).to.be.false;
  });

  it("Can vote for option A", async () => {
    const tx = await program.methods
      .voteOptionA()
      .accounts({
        vote: votingKeypair.publicKey,
        user: user.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx);

    const voteAccount = await program.account.vote.fetch(
      votingKeypair.publicKey
    );
    console.log("Vote account", voteAccount);
    expect(voteAccount.optionA).to.be.true;
    expect(voteAccount.optionB).to.be.false;
    expect(voteAccount.hasVoted).to.be.true;
  });

  it("Can vote for option B", async () => {
    const tx = await program.methods
      .initialize()
      .accounts({
        vote: votingKeypair2.publicKey,
        user: user.publicKey,
      })
      .signers([votingKeypair2])
      .rpc();
    
    const tx2 = await program.methods
      .voteOptionB()
      .accounts({
        vote: votingKeypair2.publicKey,
        user: user.publicKey,
      })
      .rpc();
    console.log("Your transaction signature", tx2);

    const voteAccount = await program.account.vote.fetch(
      votingKeypair2.publicKey
    );
    console.log("Vote account", voteAccount);
    expect(voteAccount.optionA).to.be.false;
    expect(voteAccount.optionB).to.be.true;
    expect(voteAccount.hasVoted).to.be.true;
  });

  it("Cannot vote again", async () => {
    try {
      await program.methods
        .voteOptionA()
        .accounts({
          vote: votingKeypair.publicKey,
          user: user.publicKey,
        })
        .rpc();
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error.message).to.include("AlreadyVoted");
    }

    const voteAccount = await program.account.vote.fetch(
      votingKeypair.publicKey
    );
    console.log("Vote account", voteAccount);
    expect(voteAccount.optionA).to.be.true;
    expect(voteAccount.optionB).to.be.false;
    expect(voteAccount.hasVoted).to.be.true;
  });
});
