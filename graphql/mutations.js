/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createManga = /* GraphQL */ `
  mutation CreateManga(
    $input: CreateMangaInput!
    $condition: ModelMangaConditionInput
  ) {
    createManga(input: $input, condition: $condition) {
      id
      mal_id
      url
      from
      title
      title_japanese
      synopsys
      image_url
      createdAt
      updatedAt
    }
  }
`;
export const updateManga = /* GraphQL */ `
  mutation UpdateManga(
    $input: UpdateMangaInput!
    $condition: ModelMangaConditionInput
  ) {
    updateManga(input: $input, condition: $condition) {
      id
      mal_id
      url
      from
      title
      title_japanese
      synopsys
      image_url
      createdAt
      updatedAt
    }
  }
`;
export const deleteManga = /* GraphQL */ `
  mutation DeleteManga(
    $input: DeleteMangaInput!
    $condition: ModelMangaConditionInput
  ) {
    deleteManga(input: $input, condition: $condition) {
      id
      mal_id
      url
      from
      title
      title_japanese
      synopsys
      image_url
      createdAt
      updatedAt
    }
  }
`;
export const createChapitre = /* GraphQL */ `
  mutation CreateChapitre(
    $input: CreateChapitreInput!
    $condition: ModelChapitreConditionInput
  ) {
    createChapitre(input: $input, condition: $condition) {
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
export const updateChapitre = /* GraphQL */ `
  mutation UpdateChapitre(
    $input: UpdateChapitreInput!
    $condition: ModelChapitreConditionInput
  ) {
    updateChapitre(input: $input, condition: $condition) {
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
export const deleteChapitre = /* GraphQL */ `
  mutation DeleteChapitre(
    $input: DeleteChapitreInput!
    $condition: ModelChapitreConditionInput
  ) {
    deleteChapitre(input: $input, condition: $condition) {
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
