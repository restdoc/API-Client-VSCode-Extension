import create from "zustand";

const initialState = {
  sidebarOption: "History",
  userRequestHistory: [],
  userFavorites: [],
};

const useSidebarStore = create((set) => ({
  sidebarOption: initialState.sidebarOption,
  userRequestHistory: initialState.userRequestHistory,
  userFavorites: initialState.userFavorites,

  handleSidebarOption: (option) => set(() => ({ sidebarOption: option })),

  handleUserHistoryCollection: (historyData) =>
    set(() => ({ userRequestHistory: historyData })),

  handleUserFavoritesCollection: (favoritesData) =>
    set(() => ({ userFavorites: favoritesData })),

  handleUserFavoriteIcon: (id, time) =>
    set((state) => ({
      userRequestHistory: state.userRequestHistory.map((historyData) =>
        historyData.id === id
          ? {
              ...historyData,
              isUserFavorite: !historyData.isUserFavorite,
              favoritedTime: time,
            }
          : historyData,
      ),
    })),

  handleUserDeleteIcon: (targetState, id) => {
    set((state) => ({
      [targetState]: state[targetState].filter(
        (historyData) => historyData.id !== id,
      ),
    }));
  },

  addCollectionToFavorites: (collection) =>
    set((state) => ({
      userFavorites: [...collection, ...state.userFavorites],
    })),

  removeFromFavoriteCollection: (id) => {
    set((state) => ({
      userFavorites: state.userFavorites.filter(
        (historyData) => historyData.id !== id,
      ),
    }));
  },

  resetFavoriteIconState: () =>
    set((state) => ({
      userRequestHistory: state.userRequestHistory.map((historyData) =>
        historyData.isUserFavorite === true
          ? { ...historyData, isUserFavorite: false }
          : historyData,
      ),
    })),

  deleteCollection: (targetState) => {
    set(() => ({ [targetState]: [] }));
  },
}));

export default useSidebarStore;
