import "../utils/style/css/addPayment.css";
import { remove, update } from "../utils/handleUsers";
import { useState, useEffect } from "react";
import { defaultUser, Props } from "../interfaces/interfaces";
// Material UI framework imports
import PaymentIcon from "@mui/icons-material/Payment";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";

// Solana --------------------------------------------------------------------------------------------------------------
import {
  Connection,
  PublicKey,
  Transaction,
  clusterApiUrl,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
// import "./styles.css";

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

const getProvider = (): PhantomProvider | undefined => {
  if ("solana" in window) {
    const anyWindow: any = window;
    const provider = anyWindow.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
  window.open("https://phantom.app/", "_blank"); // todo: try to add style
};

// const NETWORK = clusterApiUrl("mainnet-beta");
const rpcUrl = "http://127.0.0.1:8899";
// const connection = new Connection(rpcUrl, "confirmed");
// Solana --------------------------------------------------------------------------------------------------------------

function AddPayment({ activeUsers, updateActiveUsers }: Props) {
  const [payer, setPayer] = useState(defaultUser.name);
  const [payee, setPayee] = useState(defaultUser.name);
  const [amountPaid, setAmountPaid] = useState("");
  const [inputError, setInputError] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // ----- Handle Phantom extension-----
  const provider = getProvider();
  // const [logs, setLogs] = useState<string[]>([]);
  // const addLog = (log: string) => setLogs([...logs, log]);
  const connection = new Connection(rpcUrl, "confirmed");
  const [, setConnected] = useState<boolean>(false);
  useEffect(() => {
    if (provider) {
      provider.on("connect", () => {
        setConnected(true);
        // addLog("Connected to wallet " + provider.publicKey?.toBase58());
      });
      provider.on("disconnect", () => {
        setConnected(false);
        // addLog("Disconnected from wallet");
      });
      // try to eagerly connect
      provider.connect({ onlyIfTrusted: true }).catch(() => {
        // fail silently
      });
      return () => {
        provider.disconnect();
      };
    }
  }, [provider]);
  if (!provider) {
    return <h2>Could not find a provider</h2>;
  }

  function handlePayer(e: any) {
    setPaymentSuccess(false);
    setInputError(false);
    setPayer("");
    if (provider && provider.publicKey) {
      // console.log(provider.publicKey?.toString());
      let payer_tmp = e.target.value;
      let payer_address = activeUsers.filter((user) => {
        return user.name === e.target.value;
      })[0].pubkey;
      // console.log(payer_address);
      if (provider.publicKey?.toString() !== payer_address) {
        alert("User selected has a different pubkey than user logged in!");
        setInputError(true);
        return;
      }
    }
    setPayer(e.target.value);
  }
  function handlePayee(e: any) {
    setPaymentSuccess(false);
    setPayee(e.target.value);
  }
  function handleAmountPaid(e: any) {
    setPaymentSuccess(false);
    setAmountPaid(e.target.value);
  }

  const createTransferTransaction = async (
    payer: string,
    payee: string,
    amount: string
  ) => {
    if (!provider.publicKey) {
      return;
    }
    // todo: add identity checks
    let payee_pubkey = new PublicKey(
      activeUsers.filter((user) => {
        return user.name === payee;
      })[0].pubkey
    );
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: provider.publicKey,
        toPubkey: payee_pubkey,
        lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
      })
    );
    console.log("[TRANSACTION INFO]: ", transaction);
    transaction.feePayer = provider.publicKey;
    // addLog("Getting recent blockhash");
    const anyTransaction: any = transaction;
    anyTransaction.recentBlockhash = (
      await connection.getRecentBlockhash()
    ).blockhash;
    return transaction;
  };

  const sendTransaction = async (
    payer: string,
    payee: string,
    amount: string
  ) => {
    const transaction = await createTransferTransaction(payer, payee, amount);
    if (transaction) {
      try {
        let signed = await provider.signTransaction(transaction);
        // addLog("Got signature, submitting transaction");
        let signature = await connection.sendRawTransaction(signed.serialize());
        // addLog(
        //     "Submitted transaction " + signature + ", awaiting confirmation"
        // );
        await connection.confirmTransaction(signature);
        setPaymentSuccess(true);
      } catch (err) {
        console.warn(err);
        // addLog("Error: " + JSON.stringify(err));
      }
    }
  };

  function handlePayment() {
    console.log(amountPaid);
    if (payer === payee) {
      setInputError(true);
      return;
    }
    if (amountPaid === "") {
      setInputError(true);
      return;
    }
    setInputError(false);

    // todo: add confirmation snackbar => https://codesandbox.io/s/dcjz0?file=/demo.js
    createTransferTransaction(payer, payee, amountPaid);
    try {
      sendTransaction(payer, payee, amountPaid);
      // setPaymentSuccess(true);
    } catch (error) {
      alert(error);
    }

    // Update active users => display payment in `BalanceSheet`
    // console.log(activeUsers.filter(user => {return user.name == payee})[0].creditors)
    let payee_creditors = activeUsers.filter((user) => {
      return user.name === payee;
    })[0].creditors;
    let payer_creditors = activeUsers.filter((user) => {
      return user.name === payer;
    })[0].creditors;

    let payee_debtors = activeUsers.filter((user) => {
      return user.name === payee;
    })[0].debtors;
    let payer_debtors = activeUsers.filter((user) => {
      return user.name === payer;
    })[0].debtors;

    // STEP 1: Init payment and create debt between payee and payer
    // case 1: payer already owes payee
    if (
      payer_creditors.filter((creditor) => {
        return creditor.name == payee;
      }).length !== 0
    ) {
      console.log("payer has debts with payee");
      let payerDebt = payer_creditors.filter((creditor) => {
        return creditor.name == payee;
      })[0].value;
      if (parseFloat(amountPaid) == parseFloat(payerDebt)) {
        // then debts compensate
        payer_creditors = remove(payee, payer_creditors);
        payee_debtors = remove(payer, payee_debtors);
      } else if (parseFloat(amountPaid) > parseFloat(payerDebt)) {
        // then 1_ we erase payer debts
        payer_creditors = remove(payee, payer_creditors);
        payee_debtors = remove(payer, payee_debtors);
        // and 2_ create a debt for payee
        let deductedCredit = String(
          parseFloat(amountPaid) - parseFloat(payerDebt)
        );
        payee_creditors.push({ name: payer, value: deductedCredit });
        payer_debtors.push({ name: payee, value: deductedCredit });
      } else {
        // the we reduce payer debt
        let newPayerDebt = parseFloat(payerDebt) - parseFloat(amountPaid);
        payer_creditors.filter((creditor) => {
          return creditor.name == payee;
        })[0].value = String(newPayerDebt);
        payee_debtors.filter((debtor) => {
          return debtor.name === payer;
        })[0].value = String(newPayerDebt);
      }
    }
    // case 2: either increase debt either create new creditor for payee
    else {
      payee_creditors = update(payer, payee_creditors, parseFloat(amountPaid));
      payer_debtors = update(payee, payer_debtors, parseFloat(amountPaid));
    }
    let oldPayerDebt = parseFloat(
      activeUsers.filter((user) => {
        return user.name === payer;
      })[0].totalDebt
    );
    // console.log(activeUsers.filter(user => {return user.name === payer})[0].totalDebt);
    // console.log('oldPayerDebt:', oldPayerDebt);
    let newPayerDebt = oldPayerDebt - parseFloat(amountPaid);
    // console.log('newPayerDebt:', newPayerDebt);
    activeUsers.filter((user) => {
      return user.name == payer;
    })[0].totalDebt = String(newPayerDebt);
    // NEW update payee's debt
    let oldPayeeDebt = parseFloat(
      activeUsers.filter((user) => {
        return user.name == payee;
      })[0].totalDebt
    );
    let newPayeeDebt = oldPayeeDebt + parseFloat(amountPaid);
    activeUsers.filter((user) => {
      return user.name == payee;
    })[0].totalDebt = String(newPayeeDebt);

    // What is the outstanding debt of payee now?
    let payeeDebt;
    if (
      payee_creditors.filter((creditor) => {
        return creditor.name === payer;
      }).length !== 0
    ) {
      payeeDebt = parseFloat(
        payee_creditors.filter((creditor) => {
          return creditor.name === payer;
        })[0].value
      );
    } else {
      payeeDebt = 0;
    }
    console.log("Payee debt", payeeDebt);
    // STEP 2 ==> If payer has outstanding debts, we could simplify the balance sheet!
    if (payer_creditors.length !== 0 && payeeDebt > 0) {
      let i = 0;
      let payer_creditors_tmp = payer_creditors.slice();
      console.log("let`s share payment");
      console.log(" payer creditors list length:", payer_creditors.length);
      while (payeeDebt > 0 && i < payer_creditors_tmp.length) {
        console.log("i = ", i);
        let payer_creditor_i_debtors = activeUsers.filter((user) => {
          return user.name === payer_creditors_tmp[i].name;
        })[0].debtors; // NEW
        if (parseFloat(payer_creditors_tmp[i].value) <= payeeDebt) {
          console.log("evaluating", payer_creditors_tmp[i].name, "credit");
          // delete payer debt with `payer_creditor[i]`
          payer_creditors = remove(
            payer_creditors_tmp[i].name,
            payer_creditors
          );
          payer_creditor_i_debtors = remove(payer, payer_creditor_i_debtors); // NEW
          // update `payer_creditor[i]` as a new creditor for payee
          payee_creditors = update(
            payer_creditors_tmp[i].name,
            payee_creditors,
            parseFloat(payer_creditors_tmp[i].value)
          );
          payer_creditor_i_debtors = update(
            payee,
            payer_creditor_i_debtors,
            parseFloat(payer_creditors_tmp[i].value)
          ); // NEW
          // update payee debt with payer
          payee_creditors = update(
            payer,
            payee_creditors,
            -parseFloat(payer_creditors_tmp[i].value)
          );

          payer_debtors = update(
            payee,
            payer_debtors,
            -parseFloat(payer_creditors_tmp[i].value)
          ); // NEW
          payeeDebt = payeeDebt - parseFloat(payer_creditors_tmp[i].value);
          console.log("now payee debt to payer is: ", payeeDebt);
        } else {
          payee_creditors = remove(payer, payee_creditors);
          payer_debtors = remove(payee, payer_debtors); //  NEW
          payee_creditors = update(
            payer_creditors_tmp[i].name,
            payee_creditors,
            payeeDebt
          );
          payer_creditor_i_debtors = update(
            payee,
            payer_creditor_i_debtors,
            payeeDebt
          ); // NEW

          payer_creditors = update(
            payer_creditors_tmp[i].name,
            payer_creditors,
            -payeeDebt
          );
          payer_creditor_i_debtors = update(
            payer,
            payer_creditor_i_debtors,
            -payeeDebt
          );

          payeeDebt = payeeDebt - parseFloat(payer_creditors_tmp[i].value);
        }
        activeUsers.filter((user) => {
          return user.name === payer_creditors_tmp[i].name;
        })[0].debtors = payer_creditor_i_debtors; // NEW
        i++;
      }
    }
    // STEP 3 ==> If payee has outstanding credits, we could simplify the balance sheet
    for (let k = 0; k < activeUsers.length; k++) {
      if (
        payeeDebt > 0 &&
        activeUsers[k].name !== payee &&
        activeUsers[k].name !== payer &&
        activeUsers[k].creditors.filter((cred) => {
          return cred.name === payee;
        }).length !== 0
      ) {
        let payeeCredit = parseFloat(
          activeUsers[k].creditors.filter((cred) => {
            return cred.name == payee;
          })[0].value
        );
        let activeUser_k_creditors = activeUsers[k].creditors;
        // let activeUser_k_debtors = activeUsers[k].debtors;
        if (payeeCredit == payeeDebt) {
          payee_creditors = remove(payer, payee_creditors); // NEW
          payer_debtors = remove(payee, payer_debtors);
          activeUser_k_creditors = remove(payee, activeUser_k_creditors); //NEW
          payee_debtors = remove(activeUsers[k].name, payee_debtors);
          // add payer to `activeUser[k]` 's creditors or update if already a creditor
          activeUser_k_creditors = update(
            payer,
            activeUser_k_creditors,
            payeeDebt
          );
          payer_debtors = update(activeUsers[k].name, payer_debtors, payeeDebt); // NEW
        } else if (payeeCredit > payeeDebt) {
          payee_creditors = remove(payer, payee_creditors);
          payer_debtors = remove(payee, payer_debtors); // NEW
          activeUser_k_creditors = update(
            payee,
            activeUser_k_creditors,
            -payeeDebt
          );
          payee_debtors = update(
            activeUsers[k].name,
            payee_debtors,
            -payeeDebt
          ); // NEW

          activeUser_k_creditors = update(
            payer,
            activeUser_k_creditors,
            payeeDebt
          );
          payer_debtors = update(activeUsers[k].name, payer_debtors, payeeDebt); // NEW
        } else {
          activeUser_k_creditors = remove(payee, activeUser_k_creditors);
          payee_debtors = remove(activeUsers[k].name, payee_debtors); // NEW
          payee_creditors = update(payer, payee_creditors, -payeeCredit);
          payer_debtors = update(payee, payer_debtors, -payeeDebt); // NEW
          activeUser_k_creditors = update(
            payer,
            activeUser_k_creditors,
            payeeDebt
          );
          payer_debtors = update(activeUsers[k].name, payer_debtors, payeeDebt); // NEW
        }

        activeUsers[k].creditors = activeUser_k_creditors;
      }
    }

    // Update payee/payer creditors
    activeUsers.filter((user) => {
      return user.name === payee;
    })[0].creditors = payee_creditors;
    activeUsers.filter((user) => {
      return user.name === payer;
    })[0].creditors = payer_creditors;

    activeUsers.filter((user) => {
      return user.name === payee;
    })[0].debtors = payee_debtors; // NEW
    activeUsers.filter((user) => {
      return user.name === payer;
    })[0].debtors = payer_debtors; // NEW

    updateActiveUsers([...activeUsers]);

    //TODO: add banner to confirm payment
  }

  return (
    <div className="add-payment-div">
      <div className="add-payment-header">
        <span id="add-payment-header-logo">
          <PaymentIcon />{" "}
        </span>
        Add new payment
      </div>
      <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
        <TextField
          label="Select Payer"
          select
          value={payer}
          error={inputError}
          onChange={handlePayer}
          id="select-payer-textfield"
        >
          {activeUsers.map((user) => (
            <MenuItem key={user.pubkey} value={user.name}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
        <span id="add-payment-frag"> pays </span>
        <TextField
          label="SOL"
          id="add-payment-amount"
          value={amountPaid}
          onChange={handleAmountPaid}
          error={inputError}
        />
        <span id="add-payment-frag"> to </span>
        <TextField
          label="Select Payee"
          select
          error={inputError}
          value={payee}
          onChange={handlePayee}
          id="select-payee-textfield"
        >
          {activeUsers.map((user) => (
            <MenuItem key={user.name} value={user.name}>
              {user.name}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <div className="add-payment-submit-btn-div">
        {provider && provider.publicKey ? (
          <div>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                id="add-payment-submit-btn"
                variant="contained"
                onClick={handlePayment}
                endIcon={<ControlPointIcon />}
              >
                Confirm
              </Button>
              <Button
                id="phantom-disconnect-submit-btn"
                variant="outlined"
                onClick={async () => {
                  try {
                    const res = await provider.disconnect();
                    // addLog(JSON.stringify(res));
                  } catch (err) {
                    console.warn(err);
                    // addLog("Error: " + JSON.stringify(err));
                  }
                }}
              >
                Disconnect
              </Button>
            </Stack>

            <div id="display-pubkey">
              Pubkey being used:{" "}
              {JSON.stringify(provider?.publicKey.toBase58())}
            </div>
          </div>
        ) : (
          <Button
            id="connect-phantom-submit-btn"
            variant="contained"
            onClick={async () => {
              try {
                const res = await provider.connect();
                // addLog(JSON.stringify(res));
              } catch (err) {
                console.warn(err);
                // addLog("Error: " + JSON.stringify(err));
              }
            }}
            endIcon={<LockOpenIcon />}
          >
            Connect to Phantom
          </Button>
        )}
      </div>
      <Collapse in={paymentSuccess}>
        <Alert severity="success" sx={{ mb: 2, mt: 2 }}>
          {`Success! ${payer} has paid ${amountPaid} SOL to ${payee}`}
        </Alert>
      </Collapse>
    </div>
  );
}

export default AddPayment;
