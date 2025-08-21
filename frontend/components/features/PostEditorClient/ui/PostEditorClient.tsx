/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { MobilePostEditor } from "./MobilePostEditor";
import { useSession } from "next-auth/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function PostEditorClient() {
  const { data: session } = useSession();
  const [postData, setPostData] = useState<{
    title: string;
    content: string;
    html: string;
    json: any;
  } | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);

  const uploadImageToServer = async (
    base64Data: string,
    filename: string
  ): Promise<string | null> => {
    try {
      // Convert base64 to blob
      const response = await fetch(base64Data);
      const blob = await response.blob();

      // Create FormData for upload
      const formData = new FormData();
      formData.append("file", blob, filename);
      formData.append("type", blob.type);
      formData.append("storage", "s3");
      formData.append("filename_download", filename);

      const uploadResponse = await fetch(`${apiUrl}/files`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`, // Add token when available
        },
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload image");

      const data = await uploadResponse.json();
      console.log("[v0] Image uploaded:", data);
      return data?.data?.id || null;
    } catch (error) {
      console.error("[v0] Error uploading image:", error);
      return null;
    }
  };

  const processImagesInContent = async (
    html: string,
    json: any
  ): Promise<{ html: string; json: any }> => {
    const imageRegex = /<img[^>]+src="data:image\/[^;]+;base64,[^"]*"[^>]*>/g;
    const images = html.match(imageRegex) || [];

    let processedHtml = html;
    const processedJson = JSON.parse(JSON.stringify(json));

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const srcMatch = img.match(/src="(data:image\/[^;]+;base64,[^"]*)"/);

      if (srcMatch) {
        const base64Data = srcMatch[1];
        const filename = `image_${Date.now()}_${i}.jpg`;

        console.log("[v0] Uploading image:", filename);
        const imageId = await uploadImageToServer(base64Data, filename);

        if (imageId) {
          // Replace base64 with UUID in HTML
          const newImgTag = img.replace(
            /src="data:image\/[^;]+;base64,[^"]*"/,
            `src="/api/proxy/image?id=${imageId}" data-image-id="${imageId}"`
          );
          processedHtml = processedHtml.replace(img, newImgTag);

          const fixJsonStructure = (obj: any) => {
            if (typeof obj === "object" && obj !== null) {
              if (Array.isArray(obj)) {
                const newContent: any[] = [];

                obj.forEach((item) => {
                  if (item.type === "paragraph" && item.content) {
                    const textNodes: any[] = [];
                    const imageNodes: any[] = [];

                    // Separate text and image nodes
                    item.content.forEach((node: any) => {
                      if (node.type === "image") {
                        imageNodes.push(node);
                      } else {
                        textNodes.push(node);
                      }
                    });

                    // Add image nodes as separate blocks
                    imageNodes.forEach((imageNode) => {
                      if (imageNode.attrs?.src === base64Data) {
                        imageNode.attrs.src = `/api/proxy/image?id=${imageId}`;
                        imageNode.attrs.imageId = imageId;
                      }
                      newContent.push({
                        type: "image",
                        attrs: imageNode.attrs,
                      });
                    });

                    // Add text nodes as paragraph if they exist
                    if (textNodes.length > 0) {
                      newContent.push({
                        type: "paragraph",
                        content: textNodes,
                      });
                    }
                  } else {
                    // Process nested objects
                    fixJsonStructure(item);
                    newContent.push(item);
                  }
                });

                // Replace the array content
                obj.splice(0, obj.length, ...newContent);
              } else {
                Object.keys(obj).forEach((key) => {
                  if (
                    key === "src" &&
                    typeof obj[key] === "string" &&
                    obj[key] === base64Data
                  ) {
                    obj[key] = `/api/proxy/image?id=${imageId}`;
                    obj["imageId"] = imageId;
                  } else if (typeof obj[key] === "object") {
                    fixJsonStructure(obj[key]);
                  }
                });
              }
            }
          };
          fixJsonStructure(processedJson);
        }
      }
    }

    return { html: processedHtml, json: processedJson };
  };

  const handleNext = async (data: {
    title: string;
    content: string;
    html: string;
    json: any;
  }) => {
    setIsPublishing(true);

    try {
      console.log("[v0] Processing images in post...");
      const processedData = await processImagesInContent(data.html, data.json);

      const finalPostData = {
        ...data,
        html: processedData.html,
        json: processedData.json,
      };

      setPostData(finalPostData);
      console.log("[v0] Post data with uploaded images:", finalPostData);

      // Here you can make the actual API call to publish the post
      // await publishPost(finalPostData)
    } catch (error) {
      console.error("[v0] Error processing post:", error);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleBack = () => {
    console.log("[v0] Back button clicked");
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <>
      <MobilePostEditor
        onBack={handleBack}
        onNext={handleNext}
        isPublishing={isPublishing}
      />

      {/* Debug info - remove in production */}
      {postData && (
        <div className="p-4 bg-gray-900 text-white text-sm rounded-lg mt-4">
          <h3 className="font-semibold mb-2">
            Данные поста с загруженными изображениями:
          </h3>
          <p>
            <strong>Заголовок:</strong> {postData.title}
          </p>
          <p>
            <strong>Контент:</strong> {postData.content.substring(0, 100)}...
          </p>
          <p>
            <strong>HTML:</strong> {postData.html.substring(0, 200)}...
          </p>
          <details className="mt-2">
            <summary className="cursor-pointer">JSON данные</summary>
            <pre className="mt-2 text-xs overflow-auto max-h-40">
              {JSON.stringify(postData.json, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </>
  );
}
