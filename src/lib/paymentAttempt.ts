import User, { IPaymentAttempt, ITransaction } from "@/src/lib/db/models/User";
import type { CurrencyCode } from "@/config/currency";
import { verifyEzzygateHostedResponseSignature } from "@/src/lib/ezzygate";
import { logEzzygateEvent } from "@/src/lib/ezzygateLogger";
import { sendTopUpEmail } from "@/src/lib/email/resend";

export function canApprovePaymentAttempt(
  attempt: Pick<IPaymentAttempt, "status" | "amount" | "currency">,
  amount: number,
  currency: CurrencyCode | ""
) {
  return attempt.status === "pending" && (amount <= 0 || attempt.amount === +amount.toFixed(2)) && (!currency || attempt.currency === currency);
}

export async function approvePaymentAttempt({
  attemptId,
  replyCode,
  transactionId,
  signature,
  amount,
  currency,
}: {
  attemptId: string;
  replyCode: string;
  transactionId: string;
  signature: string;
  amount?: number;
  currency?: CurrencyCode;
}) {
  if (!attemptId || !transactionId || replyCode !== "000") return null;

  const signatureValid = verifyEzzygateHostedResponseSignature(replyCode, transactionId, signature);
  if (!signatureValid) return null;

  const user = await User.findOne({ "paymentAttempts.id": attemptId });
  if (!user) return null;

  const attempt = user.paymentAttempts.find((item) => item.id === attemptId);
  if (!attempt) return null;

  if (attempt.status === "approved") {
    return { user, attempt };
  }

  if (amount && currency && !canApprovePaymentAttempt(attempt, amount, currency)) {
    return null;
  }

  const now = new Date();
  const transaction: ITransaction = {
    id: `TXN-EZZYGATE-${transactionId}`,
    type: "topup",
    amountGBP: attempt.amountGBP,
    currency: "GBP",
    description: `Wallet top-up (${attempt.currency} ${attempt.amount.toFixed(2)})`,
    status: "completed",
    invoiceNumber: attempt.invoiceNumber,
    invoiceIssuedAt: now,
    emailStatus: "pending",
    createdAt: now,
  };

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: user._id,
      paymentAttempts: { $elemMatch: { id: attemptId, status: "pending" } },
    },
    {
      $inc: { balanceGBP: attempt.amountGBP },
      $push: { transactions: { $each: [transaction], $position: 0 } },
      $set: {
        "paymentAttempts.$.status": "approved",
        "paymentAttempts.$.transactionId": transactionId,
        "paymentAttempts.$.completedAt": now,
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    const freshUser = await User.findById(user._id);
    const freshAttempt = freshUser?.paymentAttempts.find((i) => i.id === attemptId);
    return freshUser ? { user: freshUser, attempt: freshAttempt } : null;
  }

  const approvedAttempt = updatedUser.paymentAttempts.find((item) => item.id === attemptId) as IPaymentAttempt;
  try {
    const delivery = await sendTopUpEmail(
      { name: `${updatedUser.name} ${updatedUser.surname}`.trim(), email: updatedUser.email, address: updatedUser.address },
      {
        invoiceNumber: approvedAttempt.invoiceNumber,
        reference: transaction.id,
        amount: approvedAttempt.amount,
        currency: approvedAttempt.currency,
        amountGBP: approvedAttempt.amountGBP,
      }
    );
    await User.updateOne(
      { _id: updatedUser._id, "paymentAttempts.id": attemptId },
      { $set: { "paymentAttempts.$.emailStatus": delivery.sent ? "sent" : "failed", "paymentAttempts.$.emailId": delivery.id } }
    );
  } catch {}

  logEzzygateEvent("response", { attemptId, approved: true, signatureValid: true, transactionId });
  return { user: updatedUser, attempt: approvedAttempt };
}
