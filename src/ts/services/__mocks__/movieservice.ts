import { IOmdbResponse } from "../../models/IOmdbResponse";
import { IMovie } from "./../../models/Movie";

export const mockData: IOmdbResponse = {
  Search: [
    {
      Title: "Harry Potter",
      imdbID: "08575",
      Type: "typetext",
      Poster: "poster",
      Year: "2017",
    },
    {
      Title: "Star Wars",
      imdbID: "08575",
      Type: "typetext",
      Poster: "poster",
      Year: "2017",
    },
    {
      Title: "Pelle svanslös",
      imdbID: "08575",
      Type: "typetext",
      Poster: "poster",
      Year: "2017",
    },
  ],
};

// export const getData = async (searchText: string): Promise<IMovie[]> => {
//   return new Promise((resolve, reject) => {
//     if (searchText !== "") {
//       resolve(mockData);
//     } else {
//       reject();
//     }
//   });
// };
