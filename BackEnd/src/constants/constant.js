import mongoose from "mongoose";
import Case from "./models/Case.js"; // adjust path

export async function generateCaseId() {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const year = new Date().getFullYear();

    // Find latest case for this year inside the transaction
    const lastCase = await Case.findOne({ caseId: new RegExp(`^${year}-`) })
      .sort({ created: -1 })
      .session(session);

    let nextNumber = 1;
    if (lastCase) {
      const parts = lastCase.caseId.split("-");
      const lastNumber = parseInt(parts[1], 10);
      nextNumber = lastNumber + 1;
    }

    const caseId = `${year}-${nextNumber}`;

    await session.commitTransaction();
    session.endSession();

    return caseId;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
}
