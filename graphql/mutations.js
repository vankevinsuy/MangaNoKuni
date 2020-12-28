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
      score
      genre
      authors
      title_search
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
      score
      genre
      authors
      title_search
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
      score
      genre
      authors
      title_search
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      clienID
      imgProfil
      pseudo
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      clienID
      imgProfil
      pseudo
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      clienID
      imgProfil
      pseudo
      createdAt
      updatedAt
    }
  }
`;
export const createReading = /* GraphQL */ `
  mutation CreateReading(
    $input: CreateReadingInput!
    $condition: ModelReadingConditionInput
  ) {
    createReading(input: $input, condition: $condition) {
      id
      mal_id
      clienID
      currentChapter
      createdAt
      updatedAt
    }
  }
`;
export const updateReading = /* GraphQL */ `
  mutation UpdateReading(
    $input: UpdateReadingInput!
    $condition: ModelReadingConditionInput
  ) {
    updateReading(input: $input, condition: $condition) {
      id
      mal_id
      clienID
      currentChapter
      createdAt
      updatedAt
    }
  }
`;
export const deleteReading = /* GraphQL */ `
  mutation DeleteReading(
    $input: DeleteReadingInput!
    $condition: ModelReadingConditionInput
  ) {
    deleteReading(input: $input, condition: $condition) {
      id
      mal_id
      clienID
      currentChapter
      createdAt
      updatedAt
    }
  }
`;
