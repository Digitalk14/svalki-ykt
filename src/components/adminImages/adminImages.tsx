import styled from "styled-components";
import { UploadButton } from "../uploadCare/uploadCare";

interface IAdminImagesProps {
  images: string;
  updateImages: (a: string) => void;
}
interface IDeleteImageProps {
    image: string
}

const DeleteButton = styled.button`
  border: none;
  background: red;
  color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 5px;
  cursor: pointer;
  z-index: 50;
`;
const UploadButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const AdminImages: React.FC<IAdminImagesProps> = ({
  images,
  updateImages,
}) => {
  const getUploadLinks = (links: string) => {
    updateImages(images + ";" + links);
  };

  return (
    <UploadButtonWrapper>
      Добавить изображение:
      <UploadButton getUploadLinks={(links)=>getUploadLinks(links)} valid={true} />
    </UploadButtonWrapper>
  );
};
export const DeleteImage: React.FC<IDeleteImageProps> = ({ image }) => {
  const DeleteImage = () => {
    console.log(image);
  };
  return (
    <DeleteButton type="button" onClick={() => DeleteImage}>
      Удалить изображение
    </DeleteButton>
  );
};
