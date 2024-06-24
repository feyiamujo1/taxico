import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";

const DragFileUpload = ({
  setFileItem,
  error,
  setError
}: {
  setFileItem: Function;
  error: string;
  setError: Function;
}) => {
  const [displayImage, setDisplayImage] = useState<string | ArrayBuffer | null>(
    null
  );

  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error === "User profile picture missing" && textRef.current) {
      textRef.current.focus();
    }
  }, [error]);

  const { fileRejections, acceptedFiles, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "image/*": [".jpeg", ".png"]
      }
    });

  useEffect(() => {
    if (acceptedFiles.length === 1) {
      if (error === "User profile picture missing") {
        setError("");
      }

      const file = acceptedFiles[0];
      setFileItem(file);

      // Read the file as a data URL for image preview
      const readerForDataUrl = new FileReader();
      readerForDataUrl.onload = () => {
        if (readerForDataUrl.result) {
          setDisplayImage(readerForDataUrl.result as string);
        }
      };
      readerForDataUrl.readAsDataURL(file);
    }
  }, [acceptedFiles, setFileItem]);

  const fileRejectionItems = fileRejections.map(({ file, errors }: any, id) => {
    return (
      <p className="text-sm text-[#EF2929] pl-3.5 mb-0.5 mt-2" key={id}>
        {id + 1 + ". " + file.path + " - "}
        {errors.map((e: any) => (
          <span key={e.code}>{e.message}</span>
        ))}
      </p>
    );
  });

  return (
    <div>
      <p ref={textRef} className="text-form-black font-medium text-sm mb-2">
        Profile Picture
      </p>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="border border-dashed flex items-center gap-5 px-3 py-3 rounded-lg h-12 cursor-pointer focus:border-custom-blue">
        <input {...getInputProps()} />

        {!displayImage ? (
          <HiOutlineDocumentArrowUp className="text-xl" />
        ) : (
          <Image
            // @ts-ignore
            src={displayImage}
            alt="profile"
            width={20}
            height={20}
            className="h-fit"
          />
        )}
        <p className="text-[#666666] text-sm">
          Drop profile picture or{" "}
          <span className="text-custom-blue">browse</span>{" "}
        </p>
      </div>
      <>
        {error === "User profile picture missing" ? (
          <p className="text-sm text-[#EF2929] pl-3.5 mb-0.5 mt-2">{error}</p>
        ) : (
          fileRejectionItems
        )}
      </>
    </div>
  );
};

export default DragFileUpload;
