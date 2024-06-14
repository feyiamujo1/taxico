import Image from "next/image";
import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineDocumentArrowUp } from "react-icons/hi2";

const DragFileUpload = ({
  fileItem,
  setFileItem
}: {
  fileItem: string | ArrayBuffer | null;
  setFileItem: Function;
}) => {
  const { fileRejections, acceptedFiles, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: {
        "image/*": [".jpeg", ".png"]
      }
    });

  useEffect(() => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setFileItem(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }, [acceptedFiles]);

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
      <p className="text-form-black font-medium text-sm mb-2">
        Profile Picture
      </p>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="border border-dashed flex items-center gap-5 px-3 py-3 rounded-lg h-12 cursor-pointer focus:border-custom-blue">
        <input {...getInputProps()} />

        {!fileItem ? (
          <HiOutlineDocumentArrowUp className="text-xl" />
        ) : (
          <Image
            // @ts-ignore
            src={fileItem}
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
      <>{fileRejectionItems}</>
    </div>
  );
};

export default DragFileUpload;
