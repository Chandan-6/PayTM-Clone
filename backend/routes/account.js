import express from "express";
import {User, Account} from "../models/user.js";
import Authentication from "../middleware/Auth.js";
import mongoose from "mongoose";


const router = express.Router();

// GET
// balance
router.get("/balance", Authentication, async (req, res) => {

    const account = await Account.findOne({userID : req.userID});

    return res.status(200).json({success : true, balance: account.balance });
});


//POST
//transfer
/* ⬇️

here we are using `session` feature provided by `mongoose` so that it help us to prevent the transaction from partially executed.
If the session faces any error it will roll-back.
that mean it only has 2️⃣ options either to do-together (or) roll-back.

in the below route we are using, these mongoose built-in fucntions
- mongoose.startSession()
- startTransaction() -- basically starts the transaction
- abortTracsaction() -- used when criteria not met || found error
- commitTransaction() -- upadated data is only stored when, process passed all conditions and not performed partially.

****
Key Points
`Atomicity`: All operations within the transaction either complete successfully together or none are applied, ensuring data consistency.

`Isolation`: Operations within a transaction are isolated from other operations, preventing intermediate states from being visible to other operations.

`Session Management`: Proper management of the session lifecycle (starting, committing, aborting, and ending the session) is crucial for ensuring transactional integrity and releasing resources.

****


⬇️ 
*/

router.post("/transfer", Authentication, async(req, res) => {
    
    const session = await mongoose.startSession();

    session.startTransaction();
    const { toID, amount } = req.body;

    // fetching the senders account and conditioning if the sufficient balance is available are not.
    const account = await Account.findOne({userID : req.userID}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(210).json({success : false, message : "Insufficient balance.!"});
    }

    const toAccount = await Account.findOne({userID : toID}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(210).json({success : false, message : "Receptient account not found."});
    }

    // Perform transaction
    await Account.findOneAndUpdate({usedID: req.usedID}, { $inc : { balance : -amount }}).session(session);
    await Account.findOneAndUpdate({usedID: toID}, { $inc : { balance : amount }}).session(session);

    //commit transaction
    await session.commitTransaction();
    return res.status(200).json({success : true, message : "Transaction Successfull."});
});

/*

concurrent issue tackel explanation
----
🔸Commit Phase
Transaction 1 commits successfully, updating the sender's balance to $0.
Transaction 2 attempts to commit. At this point, MongoDB detects a conflict because the balance was modified by Transaction 1.

🔸Outcome
Transaction 2 will be aborted by MongoDB due to the detected conflict. MongoDB's transaction mechanism will not allow the balance to be incorrectly deducted twice.

🔸Detailed Explanation
Conflict Detection: When Transaction 2 tries to commit, MongoDB detects that the data (sender's balance) it read at the start has been altered by Transaction 1. This leads to an abort of Transaction 2.
Abort and Retry: Transaction 2 can be retried from the application side, but in its current execution, it will be aborted to maintain consistency.

*/


export default router;