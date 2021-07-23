import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import axios from "axios";
import {
  Form,
  SubmitButton,
  Select,
  Input,
  StyledInputMask,
  DeleteButton,
} from "../modal/formStyles";
import { TextBox } from "../typography";
import { Statuses, TrashAmounts } from "../statuses/statuses";
import {
  ImageWrapper,
  ImagesScroller,
  LitterImage,
} from "../Carousel/carousel";
import { AdminImages } from "../adminImages/adminImages";

interface IAdminMarkerProps {
  imagesProps: string;
  idProps: any;
  statusProps: string;
  checkStatusProps: string;
  levelProps: string;
  additionalProps?: string;
  emailProps?: string;
  phoneProps?: string;
  position: any;
  icon: any;
}

export const AdminMarker: React.FC<IAdminMarkerProps> = ({
  imagesProps,
  idProps,
  statusProps,
  checkStatusProps,
  levelProps,
  additionalProps,
  emailProps,
  phoneProps,
  position,
  icon,
}) => {
  const [changedStates, setChangedStates] = useState({});
  const [status, setStatus] = useState(undefined);
  const [checkStatus, setCheckStatus] = useState(undefined);
  const [level, setLevel] = useState(undefined);
  const [userPhone, setUserPhone] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);
  const [userText, setUserText] = useState(undefined);
  const [images, setImages] = useState(
    imagesProps.split(";").filter((x) => x.length > 2)
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "/api/changesDump.php",
      data: {
        id: idProps,
        status: status || statusProps,
        checkStatus: checkStatus || checkStatusProps,
        level: level || levelProps,
        images: images.join(";") || imagesProps,
        additional: userText || additionalProps,
        email: userEmail || emailProps,
        phone: userPhone || phoneProps,
      },
    })
      .then((res) => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      })
      .catch((err) => console.log(err));
  };
  const updateImages = (img: string) => {
    let currentImages = images.join(";");
    console.log(currentImages);
    currentImages = currentImages + ";" + img;
    setImages(img.split(";").filter((x) => x.length > 2))
  };
  const deleteImage = (img: string) => {
    let deleteConfirm = confirm("Вы уверены что хотите удалить изображение?");
    if (deleteConfirm) {
      let imagesState = images;
      if (imagesState.includes(img)) {
        imagesState.splice(imagesState.indexOf(img), 1);
        setImages(imagesState)
      }
    }
  };
  const handleDelete = (id: any) => {
    let deleteConfirm = confirm("Вы уверены что хотите удалить свалку?");
    if (deleteConfirm) {
      axios({
        method: "post",
        url: "/api/deleteDump.php",
        data: {
          id: id,
        },
      })
        .then((res) => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        })
        .catch((err) => console.log(true));
    }
  };
  return (
    <Marker position={position} icon={icon}>
      <Popup minWidth={350}>
        <Form onSubmit={handleSubmit}>
          Кликните по изображению чтобы УДАЛИТЬ его:
          <ImageWrapper>
            <ImagesScroller>
              {images.map((image, i) => {
                return (
                  <LitterImage
                    key={i}
                    src={image}
                    onClick={() => deleteImage(image)}
                  />
                );
              })}
            </ImagesScroller>
          </ImageWrapper>
          <AdminImages
            images={imagesProps}
            updateImages={(e: string) => updateImages(e)}
          />
          <TextBox>Название: Свалка №{idProps}</TextBox>
          <TextBox>
            Категория мусора:
            <Select
              valid={true}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value={statusProps}>{statusProps}</option>
              {Statuses.filter((x) => x !== statusProps).map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </Select>
          </TextBox>
          <TextBox>
            Статус точки:
            <Select
              valid={true}
              onChange={(e) => setCheckStatus(e.target.value)}
            >
              <option value={checkStatusProps}>
                {checkStatusProps}
              </option>
              <option
                value={
                  checkStatusProps === "проверено"
                    ? "не проверено"
                    : "проверено"
                }
              >
                {checkStatusProps === "проверено"
                  ? "не проверено"
                  : "проверено"}
              </option>
            </Select>
          </TextBox>
          <TextBox>
            Степень замусоренности:
            <Select
              valid={true}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value={levelProps}>{levelProps}</option>
              {TrashAmounts.filter((x) => x !== levelProps).map(
                (x, i) => (
                  <option key={i} value={x}>
                    {x}
                  </option>
                )
              )}
            </Select>
          </TextBox>
          <TextBox>
            Обновить email:{" "}
            <Input
              valid={true}
              value={userEmail || emailProps}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Обновлённый email"
            />
          </TextBox>
          <TextBox>
            Обновить телефон:{" "}
            <StyledInputMask
              valid={true}
              mask="+7(999)9999-999"
              value={userPhone || phoneProps}
              onChange={(e:any) => setUserPhone(e.target.value)}
              placeholder="Обновленный номер телефона"
            />
          </TextBox>
          <TextBox>
            Обновить дом. информацию:{" "}
            <Input
              valid={true}
              value={userText || additionalProps}
              onChange={(e) => setUserText(e.target.value)}
              placeholder="Введите обновлённый текст"
            />
          </TextBox>
          <SubmitButton type="submit">Сохранить изменения</SubmitButton>
          <DeleteButton
            type="button"
            onClick={() => handleDelete(idProps)}
          >
            Удалить
          </DeleteButton>
        </Form>
      </Popup>
    </Marker>
  );
};
