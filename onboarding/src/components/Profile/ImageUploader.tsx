import React, { useState } from "react";
import { Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

interface ImageUploaderProps {
  setProfilePicInfo: Function;
  setProfileThumbnail: Function;
  existingImage: String;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setProfilePicInfo, setProfileThumbnail, existingImage }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: `${existingImage}`,
      status: 'done',
      url: `http://localhost:3001/uploads/${existingImage}`,
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ file, fileList: newFileList }) => {
  const cleanList = newFileList.map((f) => {
    const { thumbUrl, ...rest } = f;
    return rest;
  });

  // This is the cropped file
  const croppedFile = file.originFileObj as File;

  if (croppedFile) {
    // Set thumbnail name (optional)
    setProfileThumbnail(croppedFile.name);

    // If you want to convert to Base64 or send it manually
    const reader = new FileReader();
    reader.readAsDataURL(croppedFile);
    reader.onload = () => {
      const base64Image = reader.result;
      // Send base64Image to backend or preview
      console.log("Cropped Image Base64", base64Image);
    };

    // OR: send `croppedFile` directly to backend via FormData
    // const formData = new FormData();
    // formData.append("profilePic", croppedFile);
    // send it to server
  }

  setFileList(newFileList); // For UI
  setProfilePicInfo(cleanList); // For backend/form submit
};


  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as FileType);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop rotationSlider quality={4}>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUploader;
