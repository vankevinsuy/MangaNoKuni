/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getManga = /* GraphQL */ `
  query GetManga($id: ID!) {
    getManga(id: $id) {
      id
      mal_id
      url
      from
      title
      title_japanese
      synopsys
      image_url
      score
      genre
      authors
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
        url
        from
        title
        title_japanese
        synopsys
        image_url
        score
        genre
        authors
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
      images_html
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
        images_html
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
        url
        from
        title
        title_japanese
        synopsys
        image_url
        score
        genre
        authors
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
        images_html
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
