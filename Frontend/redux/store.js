import { configureStore } from "@reduxjs/toolkit";
import { movieReduxApi } from "./api/movie.reduxApi";
import { actorReduxApi } from "./api/actor.reduxApi";
import { genreReduxApi } from "./api/genre.reduxApi";
import { tagReduxApi } from "./api/tag.reduxApi";

const store = configureStore({
  reducer: {
    [movieReduxApi.reducerPath]: movieReduxApi.reducer,
    [actorReduxApi.reducerPath]: actorReduxApi.reducer,
    [genreReduxApi.reducerPath]: genreReduxApi.reducer,
    [tagReduxApi.reducerPath]: tagReduxApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieReduxApi.middleware,
      actorReduxApi.middleware,
      genreReduxApi.middleware,
      tagReduxApi.middleware
    ),
});

export default store;
