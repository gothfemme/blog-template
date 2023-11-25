import { ImageResponse } from "next/og";

import { getPostFromSlug } from "@/lib/posts";

export const alt = "Blog";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const post = getPostFromSlug(slug);
  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Visit my blog!
        </div>
      ),
      {
        ...size,
      }
    );
  }
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {post.title}
      </div>
    ),
    {
      ...size,
    }
  );
}
