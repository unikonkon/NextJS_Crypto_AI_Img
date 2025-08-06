'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImagePreviewProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export default function ImagePreview({ file, onFileChange }: ImagePreviewProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string>('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      onFileChange(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const clearFile = () => {
    onFileChange(null);
    setPreview('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {preview ? (
        <div className="space-y-4">
          <div className="relative">
            <Image
              src={preview}
              alt="Chart preview"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg border shadow-lg"
            />
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
            >
              ×
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>ชื่อไฟล์:</strong> {file?.name}</p>
            <p><strong>ขนาด:</strong> {file ? (file.size / 1024 / 1024).toFixed(2) : '0'} MB</p>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                อัปโหลดภาพกราฟ Crypto
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์
              </p>
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
              >
                เลือกไฟล์
              </label>
            </div>
            <p className="text-xs text-gray-400">
              รองรับไฟล์: PNG, JPG, JPEG (ขนาดไม่เกิน 10MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}