import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

interface ReviewIfc {
  location: string | Types.ObjectId;
  author: {
    email: string;
    username: string;
  };
  ratings: number;
  review: string;
}

const reviewSchema: Schema<ReviewIfc> = new Schema(
  {
    location: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    author: {
      email: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    ratings: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt" } }
);

export default mongoose.models.Review ||
  mongoose.model<ReviewIfc>("Review", reviewSchema);
