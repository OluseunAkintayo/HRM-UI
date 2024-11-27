import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';

interface IFileUpload {
  name: string;
  id: string;
  accept: string;
  setValue: (arg0: string, arg1: IResponse) => void;
}

interface IFileInfo {
  status: string | null;
  src: string | null;
}

interface IResponse {
  filename: string;
  res: string;
}

export const UploadDocument = ({ name, id, accept, setValue }: IFileUpload) => {
  const [item, setItem] = React.useState<IFileInfo | null>({ status: null, src: null });

  const onFileDrop = React.useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.size / 1000 > 1000) {
        setItem({
          src: null,
          status: "File too large. Upload a file below 1mb",
        });
        return;
      }

      if (
        file.name.toLowerCase().endsWith(".jpg") ||
        file.name.toLowerCase().endsWith(".jpeg") ||
        file.name.toLowerCase().endsWith(".png") ||
        file.name.toLowerCase().endsWith(".pdf")
      ) {
        setItem({
          ...item,
          status: null,
          src: file.name
        });

        const res = new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });

        const response = await res as string;
        setValue(name, {
          filename: file.name,
          res: response
        });
        return;
      }
      setItem({
        src: null,
        status: "Unsupported format, please upload only a .PNG or .JPEG",
      });
      return;
    }
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onFileDrop, noClick: true });
  return (
    <div>
      <div className='border border-slate-400 border-dashed p-4 relative' {...getRootProps()}>
        <Input type="file" {...getInputProps()} name={name} id={id} accept={accept} className='hidden' />
        <p className='text-xs'>
          Drag your file here <label htmlFor={name} className='text-button-main cursor-pointer'>or browse</label>
          <br />
          <span>(Not more than 1mb)</span>
          <br /><br />
          <span className='text-[#b4b4b4]'>Supports JPG, PNG, PDF</span><br />
          {
            isDragActive &&
            <span className='absolute w-full h-full bg-gray-200 top-0 left-0 flex  items-center justify-center gap-2'>
              <Plus />
              Drop files here
            </span>
          }
        </p>
      </div>
      {item?.src && <p className='text-xs mt-1'>{item?.src}</p>}
      {item?.status && <p className='text-xs mt-1 text-destructive'>{item?.status}</p>}
    </div>
  )
}
