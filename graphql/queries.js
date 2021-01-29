/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getManga = /* GraphQL */ `
  query GetManga($id: ID!) {
    getManga(id: $id) {
      id
      mal_id
      title
      title_japanese
      synopsys
      image_url
      score
      genre
      authors
      title_search
      createdAt
      updatedAt
    }
  }
`;
export const listMangas = /* GraphQL */ `
  query ListMangas(
    $filter: ModelMangaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMangas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mal_id
        title
        title_japanese
        synopsys
        image_url
        score
        genre
        authors
        title_search
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChapitre = /* GraphQL */ `
  query GetChapitre($id: ID!) {
    getChapitre(id: $id) {
      id
      mal_id
      title
      num_chapitre
      url
      createdAt
      updatedAt
    }
  }
`;
export const listChapitres = /* GraphQL */ `
  query ListChapitres(
    $filter: ModelChapitreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChapitres(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mal_id
        title
        num_chapitre
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      clienID
      imgProfil
      pseudo
      list_favoris_manga
      list_favoris_anime
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        clienID
        imgProfil
        pseudo
        list_favoris_manga
        list_favoris_anime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReading = /* GraphQL */ `
  query GetReading($id: ID!) {
    getReading(id: $id) {
      id
      mal_id
      clienID
      currentChapter
      createdAt
      updatedAt
    }
  }
`;
export const listReadings = /* GraphQL */ `
  query ListReadings(
    $filter: ModelReadingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReadings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mal_id
        clienID
        currentChapter
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAnime = /* GraphQL */ `
  query GetAnime($id: ID!) {
    getAnime(id: $id) {
      id
      mal_id
      title
      title_japanese
      synopsys
      image_url
      score
      genre
      authors
      title_search
      createdAt
      updatedAt
    }
  }
`;
export const listAnimes = /* GraphQL */ `
  query ListAnimes(
    $filter: ModelAnimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAnimes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mal_id
        title
        title_japanese
        synopsys
        image_url
        score
        genre
        authors
        title_search
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEpisode = /* GraphQL */ `
  query GetEpisode($id: ID!) {
    getEpisode(id: $id) {
      id
      mal_id
      title
      num_episode
      url
      createdAt
      updatedAt
    }
  }
`;
export const listEpisodes = /* GraphQL */ `
  query ListEpisodes(
    $filter: ModelEpisodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEpisodes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mal_id
        title
        num_episode
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWatching = /* GraphQL */ `
  query GetWatching($id: ID!) {
    getWatching(id: $id) {
      id
      mal_id
      clienID
      currentEpisode
      createdAt
      updatedAt
    }
  }
`;
export const listWatchings = /* GraphQL */ `
  query ListWatchings(
    $filter: ModelWatchingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWatchings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        mal_id
        clienID
        currentEpisode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const mangaByMalId = /* GraphQL */ `
  query MangaByMalId(
    $mal_id: Int
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMangaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    MangaByMalID(
      mal_id: $mal_id
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mal_id
        title
        title_japanese
        synopsys
        image_url
        score
        genre
        authors
        title_search
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const chapitreByMalId = /* GraphQL */ `
  query ChapitreByMalId(
    $mal_id: Int
    $num_chapitre: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChapitreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ChapitreByMalID(
      mal_id: $mal_id
      num_chapitre: $num_chapitre
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mal_id
        title
        num_chapitre
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByClienId = /* GraphQL */ `
  query UserByClienId(
    $clienID: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    UserByClienID(
      clienID: $clienID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        clienID
        imgProfil
        pseudo
        list_favoris_manga
        list_favoris_anime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const readingByClienId = /* GraphQL */ `
  query ReadingByClienId(
    $clienID: String
    $sortDirection: ModelSortDirection
    $filter: ModelReadingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ReadingByClienID(
      clienID: $clienID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mal_id
        clienID
        currentChapter
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const animeByMalId = /* GraphQL */ `
  query AnimeByMalId(
    $mal_id: Int
    $title: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelAnimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    AnimeByMalID(
      mal_id: $mal_id
      title: $title
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mal_id
        title
        title_japanese
        synopsys
        image_url
        score
        genre
        authors
        title_search
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const episodeByMalId = /* GraphQL */ `
  query EpisodeByMalId(
    $mal_id: Int
    $num_episode: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEpisodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    EpisodeByMalID(
      mal_id: $mal_id
      num_episode: $num_episode
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mal_id
        title
        num_episode
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const watchingByClienId = /* GraphQL */ `
  query WatchingByClienId(
    $clienID: String
    $sortDirection: ModelSortDirection
    $filter: ModelWatchingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    WatchingByClienID(
      clienID: $clienID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        mal_id
        clienID
        currentEpisode
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
