/**
 * Type-smoke test for openapi-typescript generated types.
 *
 * Uses real `client` from ./client.ts — all calls are typed via openapi-fetch.
 * Schema types (SchemaXxx) are imported from ./schema.ts.
 * `typeSmoke()` is declared but NEVER called — no HTTP requests happen.
 */

import { client } from "./client"
import type {
  SchemaRegisterInputDto,
  SchemaConfirmationCodeInputDto,
  SchemaRegistrationEmailResendingInputDto,
  SchemaLoginInputDto,
  SchemaPasswordRecoveryInputDto,
  SchemaPasswordRecoveryResendingInputDto,
  SchemaPasswordRecoveryCodeInputDto,
  SchemaNewPasswordInputDto,
  SchemaProviderCodeInputDto,
  SchemaUpdateProfileInputDto,
  SchemaCreatePostInputDto,
  SchemaUpdatePostInputDto,
  SchemaUpdateLikeStatusDto,
  SchemaCreateCommentDto,
  SchemaUpdateMessagesStatusDto,
  SchemaUpdateNotificationIsReadDto,
  SchemaCreateSubscriptionInputDto,
  SchemaUserSubscriptionInputDto,
  SchemaChildMetadataDto,
  SchemaAvatarViewDto,
  SchemaPostImageViewModel,
  SchemaSessionViewModel,
  SchemaOwner,
  SchemaUserMetadata,
  SchemaActiveSubscriptionViewModel,
  SchemaPricingDetailsViewModel,
  SchemaPostViewModel,
  SchemaCommentsViewModel,
  SchemaParentViewModel,
  SchemaAvatarModel,
  SchemaAnswersViewModel,
  SchemaLastMessageViewDto,
  SchemaMessageViewModel,
  SchemaMessageType,
  SchemaMessageStatus,
  SchemaNotificationViewDto,
  SchemaUserFollowingFollowersViewModel,
  SchemaPaymentsViewModel,
  SchemaValidationErrorResponseDto,
  SchemaValidationFieldError,
  SchemaAuthErrorResponseDto,
  SchemaAuthFieldError,
  SchemaRecaptchaErrorResponseDto,
  SchemaRecaptchaFieldError,
  SchemaFileUploadErrorResponseDto,
  SchemaFileUploadFieldError,
  SchemaUserErrorResponseDto,
  SchemaUserFieldError,
  SchemaApiErrorResultDto,
  SchemaUnauthorizedErrorResponseDto,
} from "./schema"

// ═══════════════════════════════════════════════════════════════════
// typeSmoke() — NEVER CALLED. All calls are for type-checking only.
// ═══════════════════════════════════════════════════════════════════

async function typeSmoke() {

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Registration
  // ─────────────────────────────────────────────────────────────────

  const registerBodyMin: SchemaRegisterInputDto = {
    userName: "testUser",
    email: "test@example.com",
    password: "Ex4mple!",
  }

  const registerBodyFull: SchemaRegisterInputDto = {
    userName: "testUser",
    email: "test@example.com",
    password: "Ex4mple!",
    baseUrl: "http://localhost:3000",  // optional
  }

  // 204 — no response body
  await client.POST("/api/v1/auth/registration", { body: registerBodyFull })

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Registration confirmation
  // ─────────────────────────────────────────────────────────────────

  const confirmBody: SchemaConfirmationCodeInputDto = {
    confirmationCode: "abc-123-xyz",
  }

  await client.POST("/api/v1/auth/registration-confirmation", { body: confirmBody })

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Registration email resending
  // ─────────────────────────────────────────────────────────────────

  const resendBodyMin: SchemaRegistrationEmailResendingInputDto = {
    email: "test@example.com",
  }

  const resendBodyFull: SchemaRegistrationEmailResendingInputDto = {
    email: "test@example.com",
    baseUrl: "http://localhost:3000",  // optional
  }

  await client.POST("/api/v1/auth/registration-email-resending", { body: resendBodyFull })

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Login
  // ─────────────────────────────────────────────────────────────────

  const loginBody: SchemaLoginInputDto = {
    email: "email@gmail.com",
    password: "qwerty",
  }

  const loginResult = await client.POST("/api/v1/auth/login", { body: loginBody })

  if (loginResult.data) {
    // required
    const accessToken: string = loginResult.data.accessToken
    const _tokenUpper: string = loginResult.data.accessToken.toUpperCase()
  }

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Get my info
  // ─────────────────────────────────────────────────────────────────

  const meResult = await client.GET("/api/v1/auth/me")

  if (meResult.data) {
    // all required
    const _userId: number = meResult.data.userId
    const _userName: string = meResult.data.userName
    const _email: string = meResult.data.email
    const _isBlocked: boolean = meResult.data.isBlocked
    const _emailUpper: string = meResult.data.email.toUpperCase()
  }

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Logout (204)
  // ─────────────────────────────────────────────────────────────────

  await client.POST("/api/v1/auth/logout")

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Password recovery
  // ─────────────────────────────────────────────────────────────────

  const pwRecoveryMin: SchemaPasswordRecoveryInputDto = {
    email: "test@example.com",
    recaptcha: "token-abc",
  }

  const pwRecoveryFull: SchemaPasswordRecoveryInputDto = {
    email: "test@example.com",
    recaptcha: "token-abc",
    baseUrl: "http://localhost:3000",  // optional
  }

  await client.POST("/api/v1/auth/password-recovery", { body: pwRecoveryFull })

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Password recovery resending
  // ─────────────────────────────────────────────────────────────────

  const pwResendMin: SchemaPasswordRecoveryResendingInputDto = {
    email: "test@example.com",
  }

  const pwResendFull: SchemaPasswordRecoveryResendingInputDto = {
    email: "test@example.com",
    baseUrl: "http://localhost:3000",  // optional
  }

  await client.POST("/api/v1/auth/password-recovery-resending", { body: pwResendFull })

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Check recovery code
  // ─────────────────────────────────────────────────────────────────

  const checkCodeBody: SchemaPasswordRecoveryCodeInputDto = {
    recoveryCode: "123456",
  }

  const checkCodeResult = await client.POST("/api/v1/auth/check-recovery-code", {
    body: checkCodeBody,
  })

  if (checkCodeResult.data) {
    // required
    const _email: string = checkCodeResult.data.email
    const _emailUpper: string = checkCodeResult.data.email.toUpperCase()
  }

  // ─────────────────────────────────────────────────────────────────
  // AUTH — New password (204)
  // ─────────────────────────────────────────────────────────────────

  const newPwBody: SchemaNewPasswordInputDto = {
    newPassword: "Ex4mple!",
    recoveryCode: "abc-code",
  }

  await client.POST("/api/v1/auth/new-password", { body: newPwBody })

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Update token
  // ─────────────────────────────────────────────────────────────────

  const updateTokenResult = await client.POST("/api/v1/auth/update", {
    credentials: "include",
  })

  if (updateTokenResult.data) {
    const _accessToken: string = updateTokenResult.data.accessToken
  }

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Update tokens (legacy)
  // ─────────────────────────────────────────────────────────────────

  const updateTokensResult = await client.POST("/api/v1/auth/update-tokens")

  if (updateTokensResult.data) {
    const _accessToken: string = updateTokensResult.data.accessToken
  }

  // ─────────────────────────────────────────────────────────────────
  // AUTH — Google OAuth login
  // ─────────────────────────────────────────────────────────────────

  const googleBodyMin: SchemaProviderCodeInputDto = {
    code: "google-auth-code-123",
  }

  const googleBodyFull: SchemaProviderCodeInputDto = {
    code: "google-auth-code-123",
    redirectUrl: "http://localhost:3000/callback",  // optional
  }

  const googleResult = await client.POST("/api/v1/auth/google/login", {
    body: googleBodyFull,
  })

  if (googleResult.data) {
    // required
    const _accessToken: string = googleResult.data.accessToken
    const _email: string = googleResult.data.email
    const _emailUpper: string = googleResult.data.email.toUpperCase()
  }

  // ─────────────────────────────────────────────────────────────────
  // AUTH — GitHub OAuth login (GET, query param, 200 no content)
  // ─────────────────────────────────────────────────────────────────

  await client.GET("/api/v1/auth/github/login", {
    params: { query: { redirect_url: "http://localhost:3000/callback" } },
  })

  // ─────────────────────────────────────────────────────────────────
  // AUTH — GitHub update tokens
  // ─────────────────────────────────────────────────────────────────

  const githubUpdateResult = await client.POST("/api/v1/auth/github/update-tokens")

  if (githubUpdateResult.data) {
    const _accessToken: string = githubUpdateResult.data.accessToken
  }

  // ─────────────────────────────────────────────────────────────────
  // HEALTH
  // ─────────────────────────────────────────────────────────────────

  const healthResult = await client.GET("/api/v1/health")

  if (healthResult.data) {
    // all optional
    const _status: string | undefined = healthResult.data.status
    const _statusUpper: string | undefined = healthResult.data.status?.toUpperCase()
    const _info = healthResult.data.info       // optional, nullable
    const _error = healthResult.data.error     // optional, nullable
    const _details = healthResult.data.details // optional
  }

  // ─────────────────────────────────────────────────────────────────
  // SESSIONS — Get all
  // ─────────────────────────────────────────────────────────────────

  const sessionsResult = await client.GET("/api/v1/sessions")

  if (sessionsResult.data) {
    // required
    const currentSession: SchemaSessionViewModel = sessionsResult.data.current
    const _ip: string = currentSession.ip
    const _deviceId: number = currentSession.deviceId
    const _browserName: string = currentSession.browserName
    const _browserVersion: string = currentSession.browserVersion
    const _deviceName: string = currentSession.deviceName
    const _osName: string = currentSession.osName
    const _osVersion: string = currentSession.osVersion
    const _deviceType: string = currentSession.deviceType
    const _lastActive: string = currentSession.lastActive

    const _others: SchemaSessionViewModel[] = sessionsResult.data.others
    const _othersLen: number = sessionsResult.data.others.length

    // ── Chain: delete a specific session ──
    const deviceIdToDelete: number = currentSession.deviceId

    // DELETE session by deviceId (204)
    await client.DELETE("/api/v1/sessions/{deviceId}", {
      params: { path: { deviceId: deviceIdToDelete } },
    })
  }

  // ─────────────────────────────────────────────────────────────────
  // SESSIONS — Terminate all (204)
  // ─────────────────────────────────────────────────────────────────

  await client.DELETE("/api/v1/sessions/terminate-all")

  // ─────────────────────────────────────────────────────────────────
  // USERS — Get my profile
  // ─────────────────────────────────────────────────────────────────

  const profileResult = await client.GET("/api/v1/users/profile")

  if (profileResult.data) {
    // required
    const _id: number = profileResult.data.id
    const _userName: string = profileResult.data.userName
    const _avatars: SchemaAvatarViewDto[] = profileResult.data.avatars
    const _avatarsLen: number = profileResult.data.avatars.length

    // nullable (required but can be null)
    const _firstName: string | null = profileResult.data.firstName
    const _lastName: string | null = profileResult.data.lastName
    const _city: string | null = profileResult.data.city
    const _country: string | null = profileResult.data.country
    const _region: string | null = profileResult.data.region
    const _dateOfBirth: string | null = profileResult.data.dateOfBirth
    const _aboutMe: string | null = profileResult.data.aboutMe

    // nullable — safe access via ?.
    const _firstNameUpper: string | undefined = profileResult.data.firstName?.toUpperCase()
    const _lastNameUpper: string | undefined = profileResult.data.lastName?.toUpperCase()
    const _cityUpper: string | undefined = profileResult.data.city?.toUpperCase()
    const _aboutMeUpper: string | undefined = profileResult.data.aboutMe?.toUpperCase()

    // optional (not nullable, just optional)
    const _createdAt: string | undefined = profileResult.data.createdAt
    const _createdAtUpper: string | undefined = profileResult.data.createdAt?.toUpperCase()

    // avatar sub-fields (required within AvatarViewDto)
    if (profileResult.data.avatars.length > 0) {
      const firstAvatar = profileResult.data.avatars[0]!
      const _url: string = firstAvatar.url
      const _width: number = firstAvatar.width
      const _height: number = firstAvatar.height
      const _fileSize: number = firstAvatar.fileSize
      // optional
      const _avCreatedAt: string | undefined = firstAvatar.createdAt
      const _avCreatedAtUpper: string | undefined = firstAvatar.createdAt?.toUpperCase()
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // USERS — Update profile (204)
  // ─────────────────────────────────────────────────────────────────

  const updateProfileMin: SchemaUpdateProfileInputDto = {
    userName: "testUser",
    firstName: "John",
    lastName: "Doe",
  }

  const updateProfileFull: SchemaUpdateProfileInputDto = {
    userName: "testUser",
    firstName: "John",
    lastName: "Doe",
    city: "London",
    country: "Great Britain",
    region: "Cambridgeshire",
    dateOfBirth: "2000-01-15T00:00:00.000Z",
    aboutMe: "Brief bio here",
  }

  const updateProfileWithNulls: SchemaUpdateProfileInputDto = {
    userName: "testUser",
    firstName: "John",
    lastName: "Doe",
    city: null,
    country: null,
    region: null,
    aboutMe: null,
  }

  await client.PUT("/api/v1/users/profile", { body: updateProfileFull })

  // ─────────────────────────────────────────────────────────────────
  // USERS — Delete profile (204)
  // ─────────────────────────────────────────────────────────────────

  await client.DELETE("/api/v1/users/profile")

  // ─────────────────────────────────────────────────────────────────
  // USERS — Delete profile by id (204)
  // ─────────────────────────────────────────────────────────────────

  await client.DELETE("/api/v1/users/profile/{id}", {
    params: { path: { id: 42 } },
  })

  // ─────────────────────────────────────────────────────────────────
  // USERS — Upload avatar (multipart, 201)
  // ─────────────────────────────────────────────────────────────────

  const avatarResult = await client.POST("/api/v1/users/profile/avatar", {
    body: { file: "binary-data" },
  })

  if (avatarResult.data) {
    const _avatars: SchemaAvatarViewDto[] = avatarResult.data.avatars
    const _len: number = avatarResult.data.avatars.length
  }

  // ─────────────────────────────────────────────────────────────────
  // USERS — Delete avatar (204)
  // ─────────────────────────────────────────────────────────────────

  await client.DELETE("/api/v1/users/profile/avatar")

  // ─────────────────────────────────────────────────────────────────
  // PUBLIC USER — Get count registered users
  // ─────────────────────────────────────────────────────────────────

  const countResult = await client.GET("/api/v1/public-user")

  if (countResult.data) {
    const _totalCount: number = countResult.data.totalCount
    const _fixed: string = countResult.data.totalCount.toFixed(0)
  }

  // ─────────────────────────────────────────────────────────────────
  // PUBLIC USER — Get public profile
  // ─────────────────────────────────────────────────────────────────

  const publicProfileResult = await client.GET("/api/v1/public-user/profile/{profileId}", {
    params: { path: { profileId: 1 } },
  })

  if (publicProfileResult.data) {
    // required
    const _id: number = publicProfileResult.data.id
    const _userName: string = publicProfileResult.data.userName
    const _aboutMe: string = publicProfileResult.data.aboutMe
    const _aboutMeUpper: string = publicProfileResult.data.aboutMe.toUpperCase()
    const _avatars: SchemaAvatarViewDto[] = publicProfileResult.data.avatars
    const _hasSub: boolean = publicProfileResult.data.hasPaymentSubscription

    // required nested
    const _meta: SchemaUserMetadata = publicProfileResult.data.userMetadata
    const _following: number = publicProfileResult.data.userMetadata.following
    const _followers: number = publicProfileResult.data.userMetadata.followers
    const _publications: number = publicProfileResult.data.userMetadata.publications

    // optional
    const _isFollowing: boolean | undefined = publicProfileResult.data.isFollowing
    const _isFollowedBy: boolean | undefined = publicProfileResult.data.isFollowedBy
  }

  // ─────────────────────────────────────────────────────────────────
  // USERS FOLLOW — Search users
  // ─────────────────────────────────────────────────────────────────

  const searchResult = await client.GET("/api/v1/users", {
    params: { query: { search: "test", pageSize: 10, pageNumber: 1 } },
  })

  if (searchResult.data) {
    const _total: number = searchResult.data.totalCount
    const _pages: number = searchResult.data.pagesCount
    const _page: number = searchResult.data.page
    const _pageSize: number = searchResult.data.pageSize
    const _prevCursor: number = searchResult.data.prevCursor
    // nullable
    const _nextCursor: number | null = searchResult.data.nextCursor
    // items (schema quirk — single object, not array)
    const _itemId: number = searchResult.data.items.id
    const _itemName: string = searchResult.data.items.userName
  }

  // ─────────────────────────────────────────────────────────────────
  // USERS FOLLOW — Get profile by username
  // ─────────────────────────────────────────────────────────────────

  const profileByNameResult = await client.GET("/api/v1/users/{userName}", {
    params: { path: { userName: "testUser" } },
  })

  if (profileByNameResult.data) {
    // required
    const _id: number = profileByNameResult.data.id
    const _userName: string = profileByNameResult.data.userName
    const _isFollowing: boolean = profileByNameResult.data.isFollowing
    const _isFollowedBy: boolean = profileByNameResult.data.isFollowedBy
    const _followingCount: number = profileByNameResult.data.followingCount
    const _followersCount: number = profileByNameResult.data.followersCount
    const _publicationsCount: number = profileByNameResult.data.publicationsCount
    const _avatars: SchemaAvatarViewDto[] = profileByNameResult.data.avatars

    // nullable
    const _firstName: string | null = profileByNameResult.data.firstName
    const _lastName: string | null = profileByNameResult.data.lastName
    const _city: string | null = profileByNameResult.data.city
    const _country: string | null = profileByNameResult.data.country
    const _region: string | null = profileByNameResult.data.region
    const _dob: string | null = profileByNameResult.data.dateOfBirth
    const _aboutMe: string | null = profileByNameResult.data.aboutMe
    const _firstNameUpper: string | undefined = profileByNameResult.data.firstName?.toUpperCase()
    const _aboutMeLen: number | undefined = profileByNameResult.data.aboutMe?.length
  }

  // ─────────────────────────────────────────────────────────────────
  // USERS FOLLOW — Subscribe to user (201 no content)
  // ─────────────────────────────────────────────────────────────────

  const subscribeBody: SchemaUserSubscriptionInputDto = {
    selectedUserId: 42,
  }

  await client.POST("/api/v1/users/following", { body: subscribeBody })

  // ─────────────────────────────────────────────────────────────────
  // USERS FOLLOW — Remove follower (204)
  // ─────────────────────────────────────────────────────────────────

  await client.DELETE("/api/v1/users/follower/{userId}", {
    params: { path: { userId: 42 } },
  })

  // ─────────────────────────────────────────────────────────────────
  // USERS FOLLOW — Get followers
  // ─────────────────────────────────────────────────────────────────

  const followersResult = await client.GET("/api/v1/users/{userName}/followers", {
    params: {
      path: { userName: "testUser" },
      query: { search: "john", pageSize: 10, pageNumber: 1 },
    },
  })

  if (followersResult.data) {
    const _total: number = followersResult.data.totalCount
    const _pages: number = followersResult.data.pagesCount
    // nullable
    const _nextCursor: number | null = followersResult.data.nextCursor

    // items (schema quirk — single object)
    const _item: SchemaUserFollowingFollowersViewModel = followersResult.data.items
    const _userId: number = followersResult.data.items.userId
    const _userName: string = followersResult.data.items.userName
    const _isFollowing: boolean = followersResult.data.items.isFollowing
    const _isFollowedBy: boolean = followersResult.data.items.isFollowedBy
    const _createdAt: string = followersResult.data.items.createdAt
    const _avatars: SchemaAvatarViewDto[] = followersResult.data.items.avatars
  }

  // ─────────────────────────────────────────────────────────────────
  // USERS FOLLOW — Get following
  // ─────────────────────────────────────────────────────────────────

  const followingResult = await client.GET("/api/v1/users/{userName}/following", {
    params: {
      path: { userName: "testUser" },
      query: { pageSize: 10 },
    },
  })

  if (followingResult.data) {
    const _total: number = followingResult.data.totalCount
    const _nextCursor: number | null = followingResult.data.nextCursor
  }

  // ─────────────────────────────────────────────────────────────────
  // POSTS — Upload image (multipart, 201)
  // ─────────────────────────────────────────────────────────────────

  const uploadImageResult = await client.POST("/api/v1/posts/image", {
    body: { file: ["base64-image-data"] },
  })

  if (uploadImageResult.data) {
    const _images: SchemaPostImageViewModel[] = uploadImageResult.data.images
    const _len: number = uploadImageResult.data.images.length

    if (uploadImageResult.data.images.length > 0) {
      const img = uploadImageResult.data.images[0]!
      const _url: string = img.url
      const _width: number = img.width
      const _height: number = img.height
      const _fileSize: number = img.fileSize
      const _uploadId: string = img.uploadId
      // optional
      const _createdAt: string | undefined = img.createdAt
      const _createdAtUpper: string | undefined = img.createdAt?.toUpperCase()
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // POSTS — Delete image (204)
  // ─────────────────────────────────────────────────────────────────

  await client.DELETE("/api/v1/posts/image/{uploadId}", {
    params: { path: { uploadId: "upload-id-1" } },
  })

  // ─────────────────────────────────────────────────────────────────
  // POSTS — CHAIN: Create → Get → Update → Delete
  // ─────────────────────────────────────────────────────────────────

  const createPostMin: SchemaCreatePostInputDto = {
    childrenMetadata: [{ uploadId: "upload-id-1" }],
  }

  const createPostFull: SchemaCreatePostInputDto = {
    description: "My first post!",
    childrenMetadata: [
      { uploadId: "upload-id-1" },
      { uploadId: "upload-id-2" },
    ],
  }

  const createPostNull: SchemaCreatePostInputDto = {
    description: null,
    childrenMetadata: [{ uploadId: "upload-id-1" }],
  }

  const createResult = await client.POST("/api/v1/posts", { body: createPostFull })

  if (createResult.data) {
    // required
    const postId: number = createResult.data.id
    const _userName: string = createResult.data.userName
    const _description: string = createResult.data.description
    const _descUpper: string = createResult.data.description.toUpperCase()
    const _location: string = createResult.data.location
    const _images: SchemaPostImageViewModel[] = createResult.data.images
    const _createdAt: string = createResult.data.createdAt
    const _updatedAt: string = createResult.data.updatedAt
    const _ownerId: number = createResult.data.ownerId
    const _avatarOwner: string = createResult.data.avatarOwner
    const _likesCount: number = createResult.data.likesCount
    const _likesFixed: string = createResult.data.likesCount.toFixed(0)
    const _isLiked: boolean = createResult.data.isLiked
    const _avatarWhoLikes: string[] = createResult.data.avatarWhoLikes

    // required nested owner
    const _owner: SchemaOwner = createResult.data.owner
    const _ownerFirstName: string = createResult.data.owner.firstName
    const _ownerLastName: string = createResult.data.owner.lastName
    const _ownerFirstNameUpper: string = createResult.data.owner.firstName.toUpperCase()

    // ── Chain: Get post by id ──
    const getResult = await client.GET("/api/v1/posts/id/{postId}", {
      params: { path: { postId } },
    })

    if (getResult.data) {
      const _gotId: number = getResult.data.id
      const _gotDesc: string = getResult.data.description
      const _gotImagesLen: number = getResult.data.images.length
    }

    // ── Chain: Update post ──
    const updateBody: SchemaUpdatePostInputDto = { description: "Updated description" }
    const updateBodyNull: SchemaUpdatePostInputDto = { description: null }

    await client.PUT("/api/v1/posts/{postId}", {
      params: { path: { postId } },
      body: updateBody,
    })

    // ── Chain: Delete post ──
    await client.DELETE("/api/v1/posts/{postId}", {
      params: { path: { postId } },
    })

    // ── Chain: Like post ──
    const likeBody: SchemaUpdateLikeStatusDto = { likeStatus: "LIKE" }
    const unlikeBody: SchemaUpdateLikeStatusDto = { likeStatus: "NONE" }
    const dislikeBody: SchemaUpdateLikeStatusDto = { likeStatus: "DISLIKE" }

    await client.PUT("/api/v1/posts/{postId}/like-status", {
      params: { path: { postId } },
      body: likeBody,
    })

    // ── Get post likes ──
    const postLikesResult = await client.GET("/api/v1/posts/{postId}/likes", {
      params: {
        path: { postId },
        query: { pageSize: 10, pageNumber: 1 },
      },
    })

    if (postLikesResult.data) {
      const _pageSize: number = postLikesResult.data.pageSize
      const _totalCount: number = postLikesResult.data.totalCount
      // optional
      const _notRead: number | undefined = postLikesResult.data.notReadCount
      const _items: SchemaUserFollowingFollowersViewModel[] | undefined = postLikesResult.data.items
      const _itemsLen: number | undefined = postLikesResult.data.items?.length
    }

    // ── Get comments ──
    const commentsResult = await client.GET("/api/v1/posts/{postId}/comments", {
      params: {
        path: { postId },
        query: { pageSize: 10, sortDirection: "desc" },
      },
    })

    if (commentsResult.data) {
      const _pageSize: number = commentsResult.data.pageSize
      const _totalCount: number = commentsResult.data.totalCount
      const _items: SchemaCommentsViewModel[] | undefined = commentsResult.data.items

      if (commentsResult.data.items && commentsResult.data.items.length > 0) {
        const comment = commentsResult.data.items[0]!
        // required
        const commentId: number = comment.id
        const _postId: number = comment.postId
        const _content: string = comment.content
        const _createdAt2: string = comment.createdAt
        const _answerCount: number = comment.answerCount
        const _likeCount: number = comment.likeCount
        const _isLiked2: boolean = comment.isLiked

        // required nested
        const _from: SchemaParentViewModel = comment.from
        const _fromId: number = comment.from.id
        const _fromUsername: string = comment.from.username
        const _fromAvatars: SchemaAvatarModel[] = comment.from.avatars

        // ── Chain: Create comment ──
        const commentBody: SchemaCreateCommentDto = { content: "Great post!" }

        const createCommentResult = await client.POST("/api/v1/posts/{postId}/comments", {
          params: { path: { postId } },
          body: commentBody,
        })

        if (createCommentResult.data) {
          const newCommentId: number = createCommentResult.data.id
          const _ccContent: string = createCommentResult.data.content
          const _ccContentUpper: string = createCommentResult.data.content.toUpperCase()

          // ── Like comment ──
          await client.PUT("/api/v1/posts/{postId}/comments/{commentId}/like-status", {
            params: { path: { postId, commentId: newCommentId } },
            body: { likeStatus: "LIKE" },
          })

          // ── Get comment likes ──
          const commentLikesResult = await client.GET("/api/v1/posts/{postId}/comments/{commentId}/likes", {
            params: {
              path: { postId, commentId: newCommentId },
              query: { pageSize: 10 },
            },
          })

          if (commentLikesResult.data) {
            const _clPageSize: number = commentLikesResult.data.pageSize
            const _clItems: SchemaUserFollowingFollowersViewModel[] | undefined = commentLikesResult.data.items
          }

          // ── Get answers ──
          const answersResult = await client.GET("/api/v1/posts/{postId}/comments/{commentId}/answers", {
            params: {
              path: { postId, commentId: newCommentId },
              query: { pageSize: 10, sortDirection: "asc" },
            },
          })

          if (answersResult.data) {
            const _ansPageSize: number = answersResult.data.pageSize
            const _ansItems: SchemaAnswersViewModel[] | undefined = answersResult.data.items

            if (answersResult.data.items && answersResult.data.items.length > 0) {
              const answer = answersResult.data.items[0]!
              const _ansId: number = answer.id
              const _ansCommentId: number = answer.commentId
              const _ansContent: string = answer.content
              const _ansCreatedAt: string = answer.createdAt
              const _ansLikeCount: number = answer.likeCount
              const _ansIsLiked: boolean = answer.isLiked
              const _ansFrom: SchemaParentViewModel = answer.from
              const _ansFromId: number = answer.from.id
              const _ansFromUsername: string = answer.from.username
            }
          }

          // ── Create answer to comment ──
          const answerBody: SchemaCreateCommentDto = { content: "Thanks!" }

          const createAnswerResult = await client.POST("/api/v1/posts/{postId}/comments/{commentId}/answers", {
            params: { path: { postId, commentId: newCommentId } },
            body: answerBody,
          })

          if (createAnswerResult.data) {
            const answerId: number = createAnswerResult.data.id
            const _caContent: string = createAnswerResult.data.content

            // ── Like answer ──
            await client.PUT("/api/v1/posts/{postId}/comments/{commentId}/answers/{answerId}/like-status", {
              params: { path: { postId, commentId: newCommentId, answerId } },
              body: { likeStatus: "LIKE" },
            })

            // ── Get answer likes ──
            const answerLikesResult = await client.GET("/api/v1/posts/{postId}/comments/{commentId}/answers/{answerId}/likes", {
              params: {
                path: { postId, commentId: newCommentId, answerId },
                query: { pageSize: 10 },
              },
            })

            if (answerLikesResult.data) {
              const _alPageSize: number = answerLikesResult.data.pageSize
              const _alItems: SchemaUserFollowingFollowersViewModel[] | undefined = answerLikesResult.data.items
            }
          }
        }
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // POSTS — Get posts by user (paginated)
  // ─────────────────────────────────────────────────────────────────

  const postsByUserResult = await client.GET("/api/v1/posts/user/{userId}/{endCursorPostId}", {
    params: {
      path: { userId: 1, endCursorPostId: 0 },
      query: { pageSize: 10, sortDirection: "desc" },
    },
  })

  if (postsByUserResult.data) {
    const _totalCount: number = postsByUserResult.data.totalCount
    const _pageSize: number = postsByUserResult.data.pageSize
    const _totalUsers: number = postsByUserResult.data.totalUsers
    // optional items
    const _items: SchemaPostViewModel[] | undefined = postsByUserResult.data.items
    const _itemsLen: number | undefined = postsByUserResult.data.items?.length
  }

  // ─────────────────────────────────────────────────────────────────
  // POSTS — Get all posts (no param, 200 no content)
  // ─────────────────────────────────────────────────────────────────

  await client.GET("/api/v1/posts/all/{endCursorPostId}", {
    params: {
      path: { endCursorPostId: 0 },
      query: { pageSize: 10 },
    },
  })

  // ─────────────────────────────────────────────────────────────────
  // POSTS — Get posts by param (paginated)
  // ─────────────────────────────────────────────────────────────────

  const postsByParamResult = await client.GET("/api/v1/posts/{param}", {
    params: {
      path: { param: "testUser" },
      query: { pageSize: 10, sortDirection: "desc" },
    },
  })

  if (postsByParamResult.data) {
    const _pageSize: number = postsByParamResult.data.pageSize
    const _totalCount: number = postsByParamResult.data.totalCount
    // optional
    const _notRead: number | undefined = postsByParamResult.data.notReadCount
    const _notReadFixed: string | undefined = postsByParamResult.data.notReadCount?.toFixed(0)
    const _items: SchemaPostViewModel[] | undefined = postsByParamResult.data.items
  }

  // ─────────────────────────────────────────────────────────────────
  // PUBLIC POSTS — Get all
  // ─────────────────────────────────────────────────────────────────

  const publicPostsResult = await client.GET("/api/v1/public-posts/all/{endCursorPostId}", {
    params: {
      path: { endCursorPostId: 0 },
      query: { pageSize: 10 },
    },
  })

  if (publicPostsResult.data) {
    const _totalCount: number = publicPostsResult.data.totalCount
    const _pageSize: number = publicPostsResult.data.pageSize
    const _totalUsers: number = publicPostsResult.data.totalUsers
    const _items: SchemaPostViewModel[] | undefined = publicPostsResult.data.items
    const _itemsLen: number | undefined = publicPostsResult.data.items?.length
  }

  // ─────────────────────────────────────────────────────────────────
  // PUBLIC POSTS — Get posts by user
  // ─────────────────────────────────────────────────────────────────

  const publicPostsByUserResult = await client.GET("/api/v1/public-posts/user/{userId}/{endCursorPostId}", {
    params: {
      path: { userId: 1, endCursorPostId: 0 },
      query: { pageSize: 10 },
    },
  })

  if (publicPostsByUserResult.data) {
    const _totalCount: number = publicPostsByUserResult.data.totalCount
    const _items: SchemaPostViewModel[] | undefined = publicPostsByUserResult.data.items
  }

  // ─────────────────────────────────────────────────────────────────
  // PUBLIC POSTS — Get single post
  // ─────────────────────────────────────────────────────────────────

  const publicPostResult = await client.GET("/api/v1/public-posts/{postId}", {
    params: { path: { postId: 1 } },
  })

  if (publicPostResult.data) {
    const _id: number = publicPostResult.data.id
    const _desc: string = publicPostResult.data.description
    const _owner: SchemaOwner = publicPostResult.data.owner
  }

  // ─────────────────────────────────────────────────────────────────
  // PUBLIC POSTS — Get comments
  // ─────────────────────────────────────────────────────────────────

  const publicCommentsResult = await client.GET("/api/v1/public-posts/{postId}/comments", {
    params: {
      path: { postId: 1 },
      query: { pageSize: 10, sortDirection: "desc" },
    },
  })

  if (publicCommentsResult.data) {
    const _pageSize: number = publicCommentsResult.data.pageSize
    const _items: SchemaCommentsViewModel[] | undefined = publicCommentsResult.data.items
  }

  // ─────────────────────────────────────────────────────────────────
  // SUBSCRIPTIONS — Create
  // ─────────────────────────────────────────────────────────────────

  const createSubMonthly: SchemaCreateSubscriptionInputDto = {
    typeSubscription: "MONTHLY",
    paymentType: "STRIPE",
    amount: 10,
    baseUrl: "http://localhost:3000",
  }

  const createSubDay: SchemaCreateSubscriptionInputDto = {
    typeSubscription: "DAY",
    paymentType: "PAYPAL",
    amount: 1,
    baseUrl: "http://localhost:3000",
  }

  const createSubWeekly: SchemaCreateSubscriptionInputDto = {
    typeSubscription: "WEEKLY",
    paymentType: "CREDIT_CARD",
    amount: 5,
    baseUrl: "http://localhost:3000",
  }

  const createSubResult = await client.POST("/api/v1/subscriptions", {
    body: createSubMonthly,
  })

  if (createSubResult.data) {
    const _url: string = createSubResult.data.url
    const _urlUpper: string = createSubResult.data.url.toUpperCase()
  }

  // ─────────────────────────────────────────────────────────────────
  // SUBSCRIPTIONS — Get current
  // ─────────────────────────────────────────────────────────────────

  const currentSubResult = await client.GET("/api/v1/subscriptions/current-payment-subscriptions")

  if (currentSubResult.data) {
    const _hasAutoRenewal: boolean = currentSubResult.data.hasAutoRenewal
    const _data: SchemaActiveSubscriptionViewModel[] = currentSubResult.data.data
    const _dataLen: number = currentSubResult.data.data.length

    if (currentSubResult.data.data.length > 0) {
      const sub = currentSubResult.data.data[0]!
      const _userId: number = sub.userId
      const _subId: string = sub.subscriptionId
      const _dateOfPayment: string = sub.dateOfPayment
      const _endDate: string = sub.endDateOfSubscription
      const _autoRenewal: boolean = sub.autoRenewal
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // SUBSCRIPTIONS — Get cost
  // ─────────────────────────────────────────────────────────────────

  const costResult = await client.GET("/api/v1/subscriptions/cost-of-payment-subscriptions")

  if (costResult.data) {
    const _data: SchemaPricingDetailsViewModel[] = costResult.data.data

    if (costResult.data.data.length > 0) {
      const pricing = costResult.data.data[0]!
      const _amount: number = pricing.amount
      const _amountFixed: string = pricing.amount.toFixed(2)
      const _type: "MONTHLY" | "DAY" | "WEEKLY" = pricing.typeDescription
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // SUBSCRIPTIONS — Get my payments
  // ─────────────────────────────────────────────────────────────────

  const paymentsResult = await client.GET("/api/v1/subscriptions/my-payments")

  if (paymentsResult.data) {
    const _len: number = paymentsResult.data.length

    if (paymentsResult.data.length > 0) {
      const payment: SchemaPaymentsViewModel = paymentsResult.data[0]!
      const _userId: number = payment.userId
      const _subId: string = payment.subscriptionId
      const _date: string = payment.dateOfPayment
      const _endDate: string = payment.endDateOfSubscription
      const _price: number = payment.price
      const _priceFixed: string = payment.price.toFixed(2)
      const _subType: "MONTHLY" | "DAY" | "WEEKLY" = payment.subscriptionType
      const _payType: "STRIPE" | "PAYPAL" | "CREDIT_CARD" = payment.paymentType
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // SUBSCRIPTIONS — Cancel auto renewal (204)
  // ─────────────────────────────────────────────────────────────────

  await client.POST("/api/v1/subscriptions/canceled-auto-renewal")

  // ─────────────────────────────────────────────────────────────────
  // SUBSCRIPTIONS — Renew auto renewal (204)
  // ─────────────────────────────────────────────────────────────────

  await client.POST("/api/v1/subscriptions/renew-auto-renewal")

  // ─────────────────────────────────────────────────────────────────
  // MESSENGER — Get all messages
  // ─────────────────────────────────────────────────────────────────

  const allMessagesResult = await client.GET("/api/v1/messenger", {
    params: { query: { pageSize: 20, searchName: "john" } },
  })

  if (allMessagesResult.data) {
    // required from InfinityPaginationViewModel
    const _pageSize: number = allMessagesResult.data.pageSize
    const _totalCount: number = allMessagesResult.data.totalCount
    // optional
    const _notRead: number | undefined = allMessagesResult.data.notReadCount
    const _items: SchemaLastMessageViewDto[] | undefined = allMessagesResult.data.items
    const _itemsLen: number | undefined = allMessagesResult.data.items?.length

    if (allMessagesResult.data.items && allMessagesResult.data.items.length > 0) {
      const msg: SchemaLastMessageViewDto = allMessagesResult.data.items[0]!
      // required
      const _id: number = msg.id
      const _ownerId: number = msg.ownerId
      const _receiverId: number = msg.receiverId
      const _text: string = msg.messageText
      const _textUpper: string = msg.messageText.toUpperCase()
      const _createdAt: string = msg.createdAt
      const _updatedAt: string = msg.updatedAt
      const _type: SchemaMessageType = msg.messageType
      const _status: SchemaMessageStatus = msg.status
      const _userName: string = msg.userName
      const _avatars: SchemaAvatarViewDto[] = msg.avatars
      const _notReadCount: number = msg.notReadCount
      const _notReadFixed: string = msg.notReadCount.toFixed(0)

      // enum narrowing — MessageType
      if (msg.messageType === "TEXT") {
        const _text2: "TEXT" = msg.messageType
      } else if (msg.messageType === "IMAGE") {
        const _image: "IMAGE" = msg.messageType
      } else {
        const _voice: "VOICE" = msg.messageType
      }

      // enum narrowing — MessageStatus
      if (msg.status === "SENT") {
        const _sent: "SENT" = msg.status
      } else if (msg.status === "RECEIVED") {
        const _received: "RECEIVED" = msg.status
      } else {
        const _read: "READ" = msg.status
      }
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // MESSENGER — Find messages by user
  // ─────────────────────────────────────────────────────────────────

  const msgByUserResult = await client.GET("/api/v1/messenger/{dialoguePartnerId}", {
    params: {
      path: { dialoguePartnerId: 42 },
      query: { pageSize: 20 },
    },
  })

  if (msgByUserResult.data) {
    const _pageSize: number = msgByUserResult.data.pageSize
    const _items: SchemaMessageViewModel[] | undefined = msgByUserResult.data.items

    if (msgByUserResult.data.items && msgByUserResult.data.items.length > 0) {
      const dm: SchemaMessageViewModel = msgByUserResult.data.items[0]!
      const _id: number = dm.id
      const _ownerId: number = dm.ownerId
      const _receiverId: number = dm.receiverId
      const _text: string = dm.messageText
      const _createdAt: string = dm.createdAt
      const _updatedAt: string = dm.updatedAt
      const _type: SchemaMessageType = dm.messageType
      const _status: SchemaMessageStatus = dm.status
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // MESSENGER — Update messages status (202 no content)
  // ─────────────────────────────────────────────────────────────────

  const updateMsgBody: SchemaUpdateMessagesStatusDto = { ids: [1, 2, 3] }

  await client.PUT("/api/v1/messenger", { body: updateMsgBody })

  // ─────────────────────────────────────────────────────────────────
  // MESSENGER — Delete message by id (204)
  // ─────────────────────────────────────────────────────────────────

  await client.DELETE("/api/v1/messenger/{id}", {
    params: { path: { id: 1 } },
  })

  // ─────────────────────────────────────────────────────────────────
  // NOTIFICATIONS — Get notifications
  // ─────────────────────────────────────────────────────────────────

  const notifResult = await client.GET("/api/v1/notifications/{cursor}", {
    params: {
      path: { cursor: 0 },
      query: { pageSize: 10, sortDirection: "desc", isRead: false },
    },
  })

  if (notifResult.data) {
    const _pageSize: number = notifResult.data.pageSize
    const _totalCount: number = notifResult.data.totalCount
    const _items: SchemaNotificationViewDto[] | undefined = notifResult.data.items

    if (notifResult.data.items && notifResult.data.items.length > 0) {
      const n: SchemaNotificationViewDto = notifResult.data.items[0]!
      const _id: number = n.id
      const _message: string = n.message
      const _messageUpper: string = n.message.toUpperCase()
      const _isRead: boolean = n.isRead
      const _createdAt: string = n.createdAt
    }
  }

  // ─────────────────────────────────────────────────────────────────
  // NOTIFICATIONS — Mark as read (202 no content)
  // ─────────────────────────────────────────────────────────────────

  const notifReadBody: SchemaUpdateNotificationIsReadDto = { ids: [1, 2, 3] }

  await client.PUT("/api/v1/notifications/mark-as-read", { body: notifReadBody })

  // ─────────────────────────────────────────────────────────────────
  // NOTIFICATIONS — Remove notification (204)
  // ─────────────────────────────────────────────────────────────────

  await client.DELETE("/api/v1/notifications/{id}", {
    params: { path: { id: 1 } },
  })

  // ─────────────────────────────────────────────────────────────────
  // HOME — Get publications followers
  // ─────────────────────────────────────────────────────────────────

  const pubFollowersResult = await client.GET("/api/v1/home/publications-followers", {
    params: { query: { pageSize: 10, pageNumber: 1 } },
  })

  if (pubFollowersResult.data) {
    const _totalCount: number = pubFollowersResult.data.totalCount
    const _pagesCount: number = pubFollowersResult.data.pagesCount
    const _page: number = pubFollowersResult.data.page
    const _pageSize: number = pubFollowersResult.data.pageSize
    const _prevCursor: number = pubFollowersResult.data.prevCursor
    // nullable
    const _nextCursor: number | null = pubFollowersResult.data.nextCursor
    // required array
    const _items: SchemaPostViewModel[] = pubFollowersResult.data.items
    const _itemsLen: number = pubFollowersResult.data.items.length
  }

  // ─────────────────────────────────────────────────────────────────
  // METRICS (200, no content)
  // ─────────────────────────────────────────────────────────────────

  await client.GET("/api/v1/metrics")

  // ─────────────────────────────────────────────────────────────────
  // Error response types — demonstrate structure
  // ─────────────────────────────────────────────────────────────────

  const _validationError: SchemaValidationErrorResponseDto = {
    statusCode: 400,
    messages: [{ message: "Incorrect email", field: "email" }],
    error: "Bad Request",
  }

  const _authError: SchemaAuthErrorResponseDto = {
    statusCode: 400,
    messages: [{ message: "invalid password or email", field: "credentials" }],
    error: "Bad Request",
  }

  const _apiError: SchemaApiErrorResultDto = {
    statusCode: 404,
    messages: [{ message: "User not found", field: "userId" }],
    error: "Not Found",
  }

  const _recaptchaError: SchemaRecaptchaErrorResponseDto = {
    statusCode: 400,
    messages: [{ message: "Recaptcha is not valid", field: "recaptcha" }],
    error: "Bad Request",
  }

  const _fileError: SchemaFileUploadErrorResponseDto = {
    statusCode: 400,
    messages: [{ message: "The file size is too large, please upload the file less than 10MB", field: "file" }],
    error: "Bad Request",
  }

  const _userError: SchemaUserErrorResponseDto = {
    statusCode: 400,
    messages: [{ message: "User not found", field: "userId" }],
    error: "Bad Request",
  }

  const _unauthorizedError: SchemaUnauthorizedErrorResponseDto = {
    statusCode: 401,
    messages: [{ message: "invalid password or email", field: "authorization" }],
    error: "Unauthorized",
  }

  // suppress unused warnings
  void _validationError
  void _authError
  void _apiError
  void _recaptchaError
  void _fileError
  void _userError
  void _unauthorizedError
  void registerBodyMin
  void resendBodyMin
  void pwRecoveryMin
  void pwResendMin
  void googleBodyMin
  void updateProfileMin
  void updateProfileWithNulls
  void createPostMin
  void createPostNull
  void createSubDay
  void createSubWeekly
  void subscribeBody
}

// ═══════════════════════════════════════════════════════════════════
// NEGATIVE CASES (must fail)
// Each @ts-expect-error MUST trigger a compile error.
// ═══════════════════════════════════════════════════════════════════

function negativeCases() {
  // --- Wrong enum values ---

  // @ts-expect-error wrong likeStatus enum value
  const _badLike: SchemaUpdateLikeStatusDto = { likeStatus: "LOVE" }

  const _badSubType: SchemaCreateSubscriptionInputDto = {
    // @ts-expect-error "YEARLY" not in "MONTHLY" | "DAY" | "WEEKLY"
    typeSubscription: "YEARLY",
    paymentType: "STRIPE",
    amount: 10,
    baseUrl: "http://localhost:3000",
  }

  const _badPayType: SchemaCreateSubscriptionInputDto = {
    typeSubscription: "MONTHLY",
    // @ts-expect-error "BITCOIN" not in "STRIPE" | "PAYPAL" | "CREDIT_CARD"
    paymentType: "BITCOIN",
    amount: 10,
    baseUrl: "http://localhost:3000",
  }

  // @ts-expect-error "VIDEO" not in "TEXT" | "IMAGE" | "VOICE"
  const _badMsgType: SchemaMessageType = "VIDEO"

  // @ts-expect-error "DELETED" not in "SENT" | "RECEIVED" | "READ"
  const _badMsgStatus: SchemaMessageStatus = "DELETED"

  const _badValMsg: SchemaValidationFieldError = {
    // @ts-expect-error not in allowed message enum
    message: "some random error",
    field: "email",
  }

  const _badAuthMsg: SchemaAuthFieldError = {
    // @ts-expect-error not in allowed message enum
    message: "wrong password",
    field: "password",
  }

  const _badRecaptchaMsg: SchemaRecaptchaFieldError = {
    // @ts-expect-error only "Recaptcha is not valid" allowed
    message: "Captcha expired",
    field: "recaptcha",
  }

  const _badFileMsg: SchemaFileUploadFieldError = {
    // @ts-expect-error not in allowed message enum
    message: "File is corrupted",
    field: "file",
  }

  const _badUserMsg: SchemaUserFieldError = {
    // @ts-expect-error not in "User not found" | "Profile not found with profileId"
    message: "User is banned",
    field: "userId",
  }

  // --- Missing required fields ---

  // @ts-expect-error missing email
  const _badRegister: SchemaRegisterInputDto = {
    userName: "testUser",
    password: "Ex4mple!",
  }

  // @ts-expect-error missing password
  const _badLogin: SchemaLoginInputDto = {
    email: "email@gmail.com",
  }

  // @ts-expect-error missing recaptcha
  const _badPwRecovery: SchemaPasswordRecoveryInputDto = {
    email: "test@example.com",
  }

  // @ts-expect-error missing recoveryCode
  const _badNewPw: SchemaNewPasswordInputDto = {
    newPassword: "Ex4mple!",
  }

  // @ts-expect-error missing childrenMetadata
  const _badCreatePost: SchemaCreatePostInputDto = {
    description: "Some post",
  }

  // @ts-expect-error missing content
  const _badComment: SchemaCreateCommentDto = {}

  // @ts-expect-error missing baseUrl
  const _badSub: SchemaCreateSubscriptionInputDto = {
    typeSubscription: "MONTHLY",
    paymentType: "STRIPE",
    amount: 10,
  }

  // @ts-expect-error missing ids
  const _badMsgStatusDto: SchemaUpdateMessagesStatusDto = {}

  // @ts-expect-error missing firstName
  const _badProfile: SchemaUpdateProfileInputDto = {
    userName: "testUser",
    lastName: "Doe",
  }

  // @ts-expect-error missing code
  const _badGoogle: SchemaProviderCodeInputDto = {}

  // --- Wrong types ---

  const _badEmailType: SchemaLoginInputDto = {
    // @ts-expect-error number instead of string
    email: 12345,
    password: "qwerty",
  }

  const _badAmountType: SchemaCreateSubscriptionInputDto = {
    typeSubscription: "MONTHLY",
    paymentType: "STRIPE",
    // @ts-expect-error string instead of number
    amount: "ten",
    baseUrl: "http://localhost:3000",
  }

  const _badUserNameType: SchemaRegisterInputDto = {
    // @ts-expect-error boolean instead of string
    userName: true,
    email: "test@example.com",
    password: "Ex4mple!",
  }

  const _badFollowType: SchemaUserSubscriptionInputDto = {
    // @ts-expect-error string instead of number
    selectedUserId: "abc",
  }

  const _badConfirmType: SchemaConfirmationCodeInputDto = {
    // @ts-expect-error number instead of string
    confirmationCode: 123456,
  }

  const _badIdsType: SchemaUpdateNotificationIsReadDto = {
    // @ts-expect-error string instead of number[]
    ids: "1,2,3",
  }

  const _badPostDesc: SchemaUpdatePostInputDto = {
    // @ts-expect-error number instead of string | null
    description: 42,
  }

  const _badChildMeta: SchemaChildMetadataDto = {
    // @ts-expect-error number instead of string
    uploadId: 123,
  }

  // --- Extra properties ---

  const _extraLogin: SchemaLoginInputDto = {
    email: "email@gmail.com",
    password: "qwerty",
    // @ts-expect-error rememberMe does not exist on LoginInputDto
    rememberMe: true,
  }

  const _extraConfirm: SchemaConfirmationCodeInputDto = {
    confirmationCode: "abc",
    // @ts-expect-error userId does not exist on ConfirmationCodeInputDto
    userId: 1,
  }

  void _badLike
  void _badSubType
  void _badPayType
  void _badMsgType
  void _badMsgStatus
  void _badValMsg
  void _badAuthMsg
  void _badRecaptchaMsg
  void _badFileMsg
  void _badUserMsg
  void _badRegister
  void _badLogin
  void _badPwRecovery
  void _badNewPw
  void _badCreatePost
  void _badComment
  void _badSub
  void _badMsgStatusDto
  void _badProfile
  void _badGoogle
  void _badEmailType
  void _badAmountType
  void _badUserNameType
  void _badFollowType
  void _badConfirmType
  void _badIdsType
  void _badPostDesc
  void _badChildMeta
  void _extraLogin
  void _extraConfirm
}
