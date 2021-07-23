import { Widget } from "@uploadcare/react-widget";
import styled from "styled-components";

interface IUploadButtonProps {
  getUploadLinks: (url: string) => void;
  valid: boolean
}
interface IStyledUploadButtonProps {
  valid?: boolean;
}

const StyledUploadButton = styled.div<IStyledUploadButtonProps>`
  margin: 5px 0;
  border: ${(props) => (props.valid ? "1px solid white" : "1px solid red")};
  width: 153px;
  border-radius: 7px;
  padding: 1px;
`;

export const UploadButton: React.FC<IUploadButtonProps> = ({
  getUploadLinks,
  valid
}) => {
  const onChange = (data: any) => {
    let currentUrl = "";
    if (data.count > 1) {
      for (let i = 0; i < data.count; i++) {
        currentUrl += data.cdnUrl + `nth/${i}/;`;
      }
    } else {
      currentUrl += data.cdnUrl + `nth/0/`;
    }
    getUploadLinks(currentUrl);
  };
  const maxDimensions = (width: number, height: number, weight: number) => {
    return function (fileInfo: any) {
      var imageInfo = fileInfo.originalImageInfo;
      if (imageInfo !== null) {
        if (
          imageInfo.width > width ||
          imageInfo.height > height ||
          fileInfo.size > weight
        ) {
          throw new Error("dimensions");
        }
      }
    };
  };
  return (
    <StyledUploadButton valid={valid}>
      <Widget
        publicKey={process.env.UPLOAD_CARE_KEY}
        locale="ru"
        clearable
        onChange={onChange}
        multipleMax={15}
        multiple
        imagesOnly
        tabs="file camera url"
        validators={[maxDimensions(1920, 1920, 150000000)]}
        imageShrink="1024x1024"
      />
    </StyledUploadButton>
  );
};
