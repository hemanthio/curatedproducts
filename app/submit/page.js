"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

const MAIN_TAGS = [
  { id: "product", label: "Product" },
  { id: "agency", label: "Agency" },
  { id: "course", label: "Course" },
  { id: "resource", label: "Resource" },
];

const CATEGORY_TAGS = [
  { id: "development", label: "Development" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "freelance", label: "Freelance" },
  { id: "saas", label: "SaaS" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "analytics", label: "Analytics" },
  { id: "ai", label: "AI" },
  { id: "framer", label: "Framer" },
  { id: "figma", label: "Figma" },
];

export default function SubmitPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);



  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag.id)) {
      setSelectedTags(selectedTags.filter((id) => id !== tag.id));
    } else {
      if (selectedTags.length < 3) {
        setSelectedTags([...selectedTags, tag.id]);
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageError("");

    if (file) {
      if (file.size > 100 * 1024) {
        setImageError("Image size must be less than 100KB");
        setImageFile(null);
        setImagePreview("");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      setImageFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload({ target: { files: [file] } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setMessage("");

    if (!imageFile) {
      setSubmitError("Please upload an image before submitting the form.");
      setIsSubmitting(false);
      return;
    }

    const descriptionWords = description.split(" ");
    if (descriptionWords.length < 8 || descriptionWords.length > 16) {
      setSubmitError("Description must be between 8 and 12 words.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("url", url);
      formData.append("tags", JSON.stringify(selectedTags));
      formData.append("image", imageFile);

      const response = await axios.post("/api/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setMessage(response.data.message);
        resetForm();
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      } else {
        setSubmitError(
          `Error: ${response.data.message || "Submission failed"}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitError(
        "An error occurred while submitting the form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setUrl("");
    setSelectedTags([]);
    setImageFile(null);
    setImagePreview("");
    setImageError("");
    setSubmitError("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold tracking-tighter text-center mb-8 font-geist">
          CuratedProducts
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-geist">NAME</label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your website name"
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-geist">
              DESCRIPTION
              <span className="text-red-500">*</span>
              <span className="text-gray-500 text-xs">
                (min 8 words, max 16 words)
              </span>
            </label>
            <textarea
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write about your website"
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-geist">URL</label>
            <input
              type="text"
              name="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL"
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-geist">
              BRAND LOGO <span className="text-red-500">*</span>
              <span className="text-gray-500 text-xs">(Max size: 100KB)</span>
            </label>
            <div
              className="border-2 border-dashed rounded-lg p-4 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="fileInput"
                className="hidden"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <div className="space-y-2">
                  {imagePreview ? (
                    <div className="flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-32 object-contain"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Drag and drop an image, or click to select
                    </p>
                  )}
                </div>
              </label>
            </div>
            {imageError && (
              <p className="text-red-500 text-sm mt-1">{imageError}</p>
            )}
            {imageFile && !imageError && (
              <p className="text-green-500 text-sm mt-1">
                Selected: {imageFile.name} ({(imageFile.size / 1024).toFixed(1)}
                KB)
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-geist">
                TAGS{" "}
                <span className="text-gray-500 text-xs">
                  (Select 1-3(includes category))
                </span>
              </label>
              <div className="relative inline-block">
                <Info
                  className="h-4 w-4 text-gray-500 cursor-help"
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                />
                {showTooltip && (
                  <div className="absolute z-10 w-48 p-2 bg-black text-white text-xs rounded-lg -right-2 top-6">
                    If you cannot find the tag, message me on x aryawebly
                    <div className="absolute -top-1 right-3 w-2 h-2 bg-black transform rotate-45" />
                  </div>
                )}
              </div>
            </div>

            {/* Main Tags */}
            <div className="flex flex-wrap gap-2">
              {MAIN_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => handleTagSelect(tag)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-geist ${
                    selectedTags.includes(tag.id)
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <div className="text-xs ">Categories</div>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_TAGS.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleTagSelect(tag)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-geist ${
                      selectedTags.includes(tag.id)
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-geist text-sm transition-colors ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-900"
            }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {submitError && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {submitError}
            </div>
          )}
        </form>

        {message && (
          <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
