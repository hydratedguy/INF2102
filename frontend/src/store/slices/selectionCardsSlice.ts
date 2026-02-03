import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SelectedItem } from "../../components/organisms/SelectionCard";

interface SelectionCardState {
  selectedItems: SelectedItem[];
  dropdownValue: string | null;
}

interface SelectionCardsState {
  materiaPrima: SelectionCardState;
  transporteMP: SelectionCardState;
  usina: SelectionCardState;
  transporteBiometano: SelectionCardState;
  destinacao: SelectionCardState;
}

const initialCardState: SelectionCardState = {
  selectedItems: [],
  dropdownValue: null,
};

const initialState: SelectionCardsState = {
  materiaPrima: initialCardState,
  usina: initialCardState,
  destinacao: initialCardState,
  transporteMP: { ...initialCardState },
  transporteBiometano: { ...initialCardState },
};

type CardKey = keyof SelectionCardsState;

const selectionCardsSlice = createSlice({
  name: "selectionCards",
  initialState,
  reducers: {
    addSelectedItem(
      state,
      action: PayloadAction<{ card: CardKey; item: SelectedItem }>
    ) {
      const { card, item } = action.payload;
      // Avoid duplicates
      if (!state[card].selectedItems.find((i) => i.id === item.id)) {
        state[card].selectedItems.push(item);
      }
    },
    removeSelectedItem(
      state,
      action: PayloadAction<{ card: CardKey; itemId: string }>
    ) {
      const { card, itemId } = action.payload;
      state[card].selectedItems = state[card].selectedItems.filter(
        (i) => i.id !== itemId
      );
    },
    setDropdownValue(
      state,
      action: PayloadAction<{ card: CardKey; value: string | null }>
    ) {
      const { card, value } = action.payload;
      state[card].dropdownValue = value;
    },
    clearCard(state, action: PayloadAction<CardKey>) {
      state[action.payload] = { ...initialCardState };
    },
  },
});

export const {
  addSelectedItem,
  removeSelectedItem,
  setDropdownValue,
  clearCard,
} = selectionCardsSlice.actions;
export default selectionCardsSlice.reducer;
