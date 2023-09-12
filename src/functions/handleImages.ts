import { StaticImageData } from "next/image";

interface handleImageProps {
  e: React.ChangeEvent<HTMLInputElement>;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setImage: React.Dispatch<React.SetStateAction<string | StaticImageData>>;
}

export function handleImages({ e, setFile, setImage }: handleImageProps) {
  if (!e.currentTarget || !e.currentTarget.files) return;
  const file = e.currentTarget.files[0];
  setFile(file);

  const imagePreview = URL.createObjectURL(file);
  setImage(imagePreview);
}
