import axios from "axios";
import {
  Form,
  SubmitButton,
  Select,
  Input,
  StyledInputMask,
} from "./formStyles";
import { Statuses, TrashAmounts } from "../statuses/statuses";
import { UploadButton } from "../uploadCare/uploadCare";
import { useState } from "react";

interface IModalProps {
    positionLat: number,
    positionLon: number,
    showNotification: (a:string,b:string) => {},

}

export const Modal: React.FC<IModalProps> = ({positionLat,positionLon,showNotification}) => {
  const [trashAmount, setTrashAmount] = useState("");
  const [trashType, setTrashType] = useState("");
  const [additionalText, setAdditionalText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userImages, setUserImages] = useState("");
  const [handleError, setHandleError] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (trashAmount === "" || trashType === "" || userImages.length < 1) {
      setHandleError(true);
      return false;
    } else {
      setHandleError(false);
      setSubmit(true);
    }

    axios({
      method: "post",
      url: "/api/addDump.php",
      data: {
        positionLat: positionLat,
        positionLon: positionLon,
        status: trashType,
        checkStatus: "на проверке",
        level: trashAmount,
        additional: additionalText,
        email: userEmail || "",
        phone: userPhone || "",
        images: userImages,
      },
    })
      .then((res) => {
        // this.props.showNotification('Благодарим за неравнодушие!', '')
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        // this.props.refreshTheMap(),
        // this.setState({
        //     trashType: '',
        //     trashAmount: '',
        //     additionalText: '',
        //     userEmail: '',
        //     userPhone: '',
        //     userImages: '',
        // }),
        // this.props.closePopup()
      })
      .catch(
        (err) => showNotification("Упс, что-то пошло не так!", "error"),
        // closePopup()
      );
  };

  const handleChangeType = (e: any) => {
    setTrashType(e.target.value);
  };
  const getUploadLinks = (links: string) => {
    setUserImages(links);
  };
  return (
    <Form onSubmit={handleSubmit}>
      Укажите тип мусора*:
      <Select
        onChange={(e) => setTrashType(e.target.value)}
        defaultValue="none"
        valid={
          handleError && trashType === "" ? false : true
        }
      >
        <option value="none">Укажите тип мусора</option>
        {Statuses.filter((x) => x !== "Убрано" && x !== "new").map(
          (status, id) => (
            <option key={id} value={status}>
              {status}
            </option>
          )
        )}
      </Select>
      Укажите объём свалки*:
      <Select
        defaultValue="none"
        onChange={(e) => setTrashAmount(e.target.value)}
        valid={
          handleError && trashAmount === "" ? false : true
        }
      >
        <option value="none">Укажите объём свалки</option>
        {TrashAmounts.map((amount, i) => (
          <option key={i} value={amount}>
            {amount}
          </option>
        ))}
      </Select>
      Загрузите фото*: (максимум 5 МБ)
      <UploadButton
        getUploadLinks={(e:any) => getUploadLinks(e)}
        valid={
          handleError && userImages === "" ? false : true
        }
      />
      Укажите Ваш e-mail:
      <Input
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="E-mail"
        valid={true}
        value={userEmail}
      />
      При желании можете оставить свой номер телефона:
      <StyledInputMask
        onChange={(e:any) => setUserPhone(e.target.value)}
        mask="+7(999)9999-999"
        placeholder="Номер телефона"
        value={userPhone}
      />
      Дополнительные примечания:
      <Input
        valid={true}
        onChange={(e:any) => setAdditionalText(e.target.value)}
        placeholder="Краткое описание"
        value={additionalText}
      />
      <SubmitButton type="submit">Отправить</SubmitButton>
    </Form>
  );
};
