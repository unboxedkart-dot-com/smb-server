import mongoose from 'mongoose';

export const SearchTermSchema = new mongoose.Schema({
  searchTerm: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now(), select: false },
  isPopular: { type: Boolean, required: false, select: false },
  userId: { type: String, required: false, select: false },
});

export interface SearchTerm {
  searchTerm: string;
  timestamp: Date;
  isPopular: boolean;
  userId: string;
}
