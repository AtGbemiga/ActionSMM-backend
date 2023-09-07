import mongoose from "mongoose";

interface IPlanExtraDetails {
  status: "Processing" | "Active" | "Expired" | "Rejected";
  chat: string[];
}
