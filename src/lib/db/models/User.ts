import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransaction {
  id: string;
  type: "topup" | "purchase" | "refund" | "adjustment";
  amountGBP: number;
  currency: "GBP";
  description: string;
  status: "pending" | "completed" | "failed";
  invoiceNumber?: string;
  invoiceIssuedAt?: Date;
  emailStatus?: "pending" | "sent" | "failed";
  emailId?: string;
  createdAt: Date;
}

export interface IOrder {
  id: string;
  platform: "instagram" | "tiktok" | "youtube";
  service: "likes" | "followers" | "subscribers" | "views";
  packageName: string;
  quantity: number;
  priceGBP: number;
  targetUrl?: string;
  targetHandle?: string;
  status: "processing" | "in_progress" | "completed" | "failed";
  invoiceNumber?: string;
  invoiceIssuedAt?: Date;
  emailStatus?: "pending" | "sent" | "failed";
  emailId?: string;
  createdAt: Date;
}

export interface IProxyRequest {
  id: string;
  requestKind?: "ready-package" | "custom";
  packageName?: string;
  proxyType: string;
  country: string;
  city?: string;
  carrier?: string;
  protocol: string;
  rotation: string;
  authMethod: string;
  quantity: number;
  bandwidthGb: number;
  duration: string;
  durationQuantity?: number;
  estimatedPriceEUR: number;
  priceGBP?: number;
  displayCurrency: string;
  status: "paid" | "requested" | "reviewing" | "confirmed" | "completed" | "cancelled";
  invoiceNumber?: string;
  invoiceIssuedAt?: Date;
  emailStatus?: "pending" | "sent" | "failed";
  emailId?: string;
  paidAt?: Date;
  createdAt: Date;
}

export interface IPaymentAttempt {
  id: string;
  amount: number;
  currency: "EUR" | "GBP" | "USD";
  amountGBP: number;
  status: "pending" | "approved" | "declined" | "failed";
  invoiceNumber: string;
  transactionId?: string;
  emailStatus?: "pending" | "sent" | "failed";
  emailId?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  surname: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: {
    street: string;
    city: string;
    country: string;
    postCode: string;
  };
  balanceGBP: number;
  passwordResetTokenHash?: string;
  passwordResetExpiresAt?: Date;
  transactions: ITransaction[];
  orders: IOrder[];
  proxyRequests: IProxyRequest[];
  paymentAttempts: IPaymentAttempt[];
  createdAt: Date;
  updatedAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    id: { type: String, required: true },
    type: {
      type: String,
      enum: ["topup", "purchase", "refund", "adjustment"],
      required: true,
    },
    amountGBP: { type: Number, required: true },
    currency: { type: String, default: "GBP", enum: ["GBP"] },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      required: true,
    },
    invoiceNumber: { type: String },
    invoiceIssuedAt: { type: Date },
    emailStatus: { type: String, enum: ["pending", "sent", "failed"] },
    emailId: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    id: { type: String, required: true },
    platform: {
      type: String,
      enum: ["instagram", "tiktok", "youtube"],
      required: true,
    },
    service: {
      type: String,
      enum: ["likes", "followers", "subscribers", "views"],
      required: true,
    },
    packageName: { type: String, required: true },
    quantity: { type: Number, required: true },
    priceGBP: { type: Number, required: true },
    targetUrl: { type: String },
    targetHandle: { type: String },
    status: {
      type: String,
      enum: ["processing", "in_progress", "completed", "failed"],
      default: "processing",
    },
    invoiceNumber: { type: String },
    invoiceIssuedAt: { type: Date },
    emailStatus: { type: String, enum: ["pending", "sent", "failed"] },
    emailId: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ProxyRequestSchema = new Schema<IProxyRequest>(
  {
    id: { type: String, required: true },
    requestKind: { type: String, enum: ["ready-package", "custom"] },
    packageName: { type: String },
    proxyType: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String },
    carrier: { type: String },
    protocol: { type: String, required: true },
    rotation: { type: String, required: true },
    authMethod: { type: String, required: true },
    quantity: { type: Number, required: true },
    bandwidthGb: { type: Number, required: true },
    duration: { type: String, required: true },
    durationQuantity: { type: Number },
    estimatedPriceEUR: { type: Number, required: true },
    priceGBP: { type: Number },
    displayCurrency: { type: String, required: true },
    status: {
      type: String,
      enum: ["paid", "requested", "reviewing", "confirmed", "completed", "cancelled"],
      default: "requested",
    },
    invoiceNumber: { type: String },
    invoiceIssuedAt: { type: Date },
    emailStatus: { type: String, enum: ["pending", "sent", "failed"] },
    emailId: { type: String },
    paidAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const PaymentAttemptSchema = new Schema<IPaymentAttempt>(
  {
    id: { type: String, required: true },
    amount: { type: Number, required: true, min: 0.01 },
    currency: { type: String, enum: ["EUR", "GBP", "USD"], required: true },
    amountGBP: { type: Number, required: true, min: 0.01 },
    status: { type: String, enum: ["pending", "approved", "declined", "failed"], default: "pending" },
    invoiceNumber: { type: String, required: true },
    transactionId: { type: String },
    emailStatus: { type: String, enum: ["pending", "sent", "failed"] },
    emailId: { type: String },
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postCode: { type: String, required: true },
    },
    balanceGBP: { type: Number, default: 0, min: 0 },
    passwordResetTokenHash: { type: String, select: false },
    passwordResetExpiresAt: { type: Date, select: false },
    transactions: { type: [TransactionSchema], default: [] },
    orders: { type: [OrderSchema], default: [] },
    proxyRequests: { type: [ProxyRequestSchema], default: [] },
    paymentAttempts: { type: [PaymentAttemptSchema], default: [] },
  },
  { timestamps: true }
);

export function toSafeUser(user: IUser) {
  const obj = user.toObject();
  delete obj.passwordHash;
  delete obj.__v;
  return obj;
}

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
