export const NewsPagePath = "/news";
export const NavigateNewsPage = (): string => `/news`;

export const HotsPagePath = "/hots";
export const NavigateHotsPage = (): string => `/hots`;

export const TagsPagePath = "/tags";
export const NavigateTagsPage = (): string => `/tags`;

export const PostPagePath = "/post/:id";
export const NavigatePostPage = (postId: string): string => `/post/${postId}`;

export const AuthorPagePath = "/author/:id";
export const NavigateAuthorPage = (authorId: string): string => `/author/${authorId}`;

export const TagPagePath = "/tag/:id";
export const NavigateTagPage = (tagId: string): string => `/tag/${tagId}`;

export const CreatePostPagePath = "/post/create";
export const NavigateCreatePostPage = (): string => "/post/create";

export const ProfilePagePath = "/profile";
export const NavigateProfilePage = (): string => "/profile";