/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useRef } from "react";
import {
  ArrowLeft,
  ImageIcon,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
} from "lucide-react";
import { Button } from "@/components/shared/ui/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Heading from "@tiptap/extension-heading";

interface MobilePostEditorProps {
  onBack?: () => void;
  onNext?: (data: {
    title: string;
    content: string;
    html: string;
    json: any;
  }) => void;
  isPublishing?: boolean;
}

export function MobilePostEditor({
  onBack,
  onNext,
  isPublishing = false,
}: MobilePostEditorProps) {
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // We'll use custom heading extension
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg my-2",
        },
      }),
    ],
    content: "<p>напишите что нибудь...</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none focus:outline-none min-h-[300px] px-4 py-3 text-base leading-relaxed",
      },
    },
    immediatelyRender: false,
  });

  const handleNext = () => {
    if (onNext && editor) {
      const html = editor.getHTML();
      const json = editor.getJSON();
      const text = editor.getText();

      console.log("[v0] Post data:", { title, content: text, html, json });
      onNext({ title, content: text, html, json });
    }
  };

  const handleMediaUpload = () => {
    console.log("[v0] Media upload clicked");
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && editor) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const result = e.target?.result as string;
            // Insert image at current cursor position
            editor.chain().focus().setImage({ src: result }).run();
            console.log("[v0] Image inserted at cursor position");
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleBulletList = () =>
    editor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor?.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () =>
    editor?.chain().focus().toggleBlockquote().run();
  const undo = () => editor?.chain().focus().undo().run();
  const redo = () => editor?.chain().focus().redo().run();
  const setHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) =>
    editor?.chain().focus().toggleHeading({ level }).run();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold tracking-wide">НОВЫЙ ПОСТ</h1>
        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Title Input */}
        <div className="p-4 pb-0">
          <input
            type="text"
            placeholder="введите заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-800 text-white placeholder-gray-500 px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-gray-600 transition-all"
          />
        </div>

        <div className="px-4 py-2 border-b border-gray-800">
          <div className="flex flex-wrap gap-1">
            {/* Headings */}
            <select
              onChange={(e) => {
                const level = Number.parseInt(e.target.value);
                if (level === 0) {
                  editor?.chain().focus().setParagraph().run();
                } else {
                  setHeading(level as 1 | 2 | 3 | 4 | 5 | 6);
                }
              }}
              className="bg-gray-700 text-white text-xs px-2 py-1 rounded border-none outline-none"
            >
              <option value="0">Текст</option>
              <option value="1">H1</option>
              <option value="2">H2</option>
              <option value="3">H3</option>
              <option value="4">H4</option>
              <option value="5">H5</option>
              <option value="6">H6</option>
            </select>

            <button
              onClick={toggleBold}
              className={`p-2 rounded ${
                editor?.isActive("bold") ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              onClick={toggleItalic}
              className={`p-2 rounded ${
                editor?.isActive("italic") ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
            >
              <Italic className="w-4 h-4" />
            </button>
            <button
              onClick={toggleBulletList}
              className={`p-2 rounded ${
                editor?.isActive("bulletList")
                  ? "bg-gray-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={toggleOrderedList}
              className={`p-2 rounded ${
                editor?.isActive("orderedList")
                  ? "bg-gray-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              onClick={toggleBlockquote}
              className={`p-2 rounded ${
                editor?.isActive("blockquote")
                  ? "bg-gray-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <Quote className="w-4 h-4" />
            </button>
            <button onClick={undo} className="p-2 rounded hover:bg-gray-700">
              <Undo className="w-4 h-4" />
            </button>
            <button onClick={redo} className="p-2 rounded hover:bg-gray-700">
              <Redo className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <EditorContent
            editor={editor}
            className="h-full text-white [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:text-white [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-gray-500 [&_.ProseMirror_p.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
          />
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 space-y-3">
        <button
          onClick={handleMediaUpload}
          disabled={isPublishing}
          className="flex items-center gap-2 px-4 py-3 bg-transparent border border-gray-600 rounded-full text-gray-300 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ImageIcon className="w-5 h-5" />
          <span>добавить фото</span>
        </button>

        <Button
          onClick={handleNext}
          disabled={!title.trim() || !editor?.getText().trim() || isPublishing}
          className="w-full py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
        >
          {isPublishing ? "загрузка изображений..." : "далее"}
        </Button>
      </div>

      {/* Bottom indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-gray-600 rounded-full" />
      </div>
    </div>
  );
}
