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