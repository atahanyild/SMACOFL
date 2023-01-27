import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { it } from "mocha";
import { Smacofl } from "../target/types/smacofl";

describe("smacofl", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  
  const program = anchor.workspace.Smacofl as Program<Smacofl>;
  const freelancer= new anchor.web3.Keypair();
  const hirer= new anchor.web3.Keypair();

  
  it("Is initialized!", async () => {
    //    Add your test here.
    
    const [contract, _contractBump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [provider.wallet.publicKey.toBytes()],
        program.programId,
      )
    console.log("Your contract address", contract.toString());

    const tx = await program.methods.initialize(
      "freelancer", 5, new anchor.BN(6*anchor.web3.LAMPORTS_PER_SOL), 1
    ).accounts(
      {
        signer: provider.wallet.publicKey,
        contract: contract,
        systemProgram: anchor.web3.SystemProgram.programId,
      }
    ).rpc();
    
    console.log("Your transaction signature", tx);
  });



  it("complate milestone!", async () => {
    await provider.connection.requestAirdrop(hirer.publicKey,4*anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(freelancer.publicKey,4*anchor.web3.LAMPORTS_PER_SOL);
    await new Promise(r => setTimeout(r, 5000));
    console.log("hirer balance",await provider.connection.getBalance(hirer.publicKey));
    console.log("freelancer balance",await provider.connection.getBalance(freelancer.publicKey));

    const [contract, _contractBump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [provider.wallet.publicKey.toBytes()],
        program.programId,
      )
    console.log("Your contract address", contract.toString());

    const tx = await program.methods.complateMilestone().accounts({
      contract:contract,
      signer:provider.wallet.publicKey,
      from:hirer.publicKey,
      to:freelancer.publicKey,
      systemProgram:anchor.web3.SystemProgram.programId,
    }).rpc();
    console.log("Your transaction signature", tx);
    console.log("hirer balance",await provider.connection.getBalance(hirer.publicKey));
    console.log("freelancer balance",await provider.connection.getBalance(freelancer.publicKey));
  });

  it("complate!", async () => {
    await provider.connection.requestAirdrop(hirer.publicKey,4*anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(freelancer.publicKey,4*anchor.web3.LAMPORTS_PER_SOL);
    await new Promise(r => setTimeout(r, 5000));
    console.log("hirer balance",await provider.connection.getBalance(hirer.publicKey));
    console.log("freelancer balance",await provider.connection.getBalance(freelancer.publicKey));

    const [contract, _contractBump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [provider.wallet.publicKey.toBytes()],
        program.programId,
      )
    console.log("Your contract address", contract.toString());

    const tx = await program.methods.complate().accounts({
      contract:contract,
      signer:provider.wallet.publicKey,
      from:hirer.publicKey,
      to:freelancer.publicKey,
      systemProgram:anchor.web3.SystemProgram.programId,
    }).rpc();
    console.log("Your transaction signature", tx);
    console.log("hirer balance",await provider.connection.getBalance(hirer.publicKey));
    console.log("freelancer balance",await provider.connection.getBalance(freelancer.publicKey));
  });

  it("canceled by hirer!", async () => {
    await provider.connection.requestAirdrop(hirer.publicKey,4*anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(freelancer.publicKey,4*anchor.web3.LAMPORTS_PER_SOL);
    await new Promise(r => setTimeout(r, 5000));
    console.log("hirer balance",await provider.connection.getBalance(hirer.publicKey));
    console.log("freelancer balance",await provider.connection.getBalance(freelancer.publicKey));

    const [contract, _contractBump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [provider.wallet.publicKey.toBytes()],
        program.programId,
      )
    console.log("Your contract address", contract.toString());

    const tx = await program.methods.cancel().accounts({
      contract:contract,
      signer:provider.wallet.publicKey,
      from:hirer.publicKey,
      to:freelancer.publicKey,
      systemProgram:anchor.web3.SystemProgram.programId,
    }).rpc();
    console.log("Your transaction signature", tx);
    console.log("hirer balance",await provider.connection.getBalance(hirer.publicKey));
    console.log("freelancer balance",await provider.connection.getBalance(freelancer.publicKey));
  });

  it("canceled by freelancer!", async () => {
    await provider.connection.requestAirdrop(hirer.publicKey,4*anchor.web3.LAMPORTS_PER_SOL);
    await provider.connection.requestAirdrop(freelancer.publicKey,4*anchor.web3.LAMPORTS_PER_SOL);
    await new Promise(r => setTimeout(r, 5000));
    console.log("hirer balance",await provider.connection.getBalance(hirer.publicKey));
    console.log("freelancer balance",await provider.connection.getBalance(freelancer.publicKey));

    const [contract, _contractBump] =
      await anchor.web3.PublicKey.findProgramAddressSync(
        [provider.wallet.publicKey.toBytes()],
        program.programId,
      )
    console.log("Your contract address", contract.toString());

    const tx = await program.methods.cancel().accounts({
      contract:contract,
      signer:provider.wallet.publicKey,
      from:freelancer.publicKey,
      to:hirer.publicKey,
      systemProgram:anchor.web3.SystemProgram.programId,
    }).rpc();
    console.log("Your transaction signature", tx);
    console.log("hirer balance",await provider.connection.getBalance(hirer.publicKey));
    console.log("freelancer balance",await provider.connection.getBalance(freelancer.publicKey));
  });

});
