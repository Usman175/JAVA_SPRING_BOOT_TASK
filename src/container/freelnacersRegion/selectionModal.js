import React, { useState } from "react";
import { Modal } from 'react-bootstrap'
import './freelnacersRegion.scss'
import Radio from "../../components/radioButton/radio";
function DropDownModal(props) {
  const [radioValue, setRadioValue] = useState(props.modal.type && props?.selectedValue ? props?.selectedValue : {});
  const onModalClose = () => {
    setRadioValue({});
    props.setModal(false);
  }
  const onModalCountinue = () => {
    if (props.modal.type === "scope") {
      if (radioValue?.subScopes) {
        props.setBusinessSubCategoryList(radioValue?.subScopes)
      }
    }
    if (radioValue?.value) {
      props.onSelect(radioValue)
    }
    props.setModal(false)
  }
  return (
    <Modal dialogClassName="modal-10w" show={props.modal} centered size="sm">
      <div className="drop-down-modal">
        <div onClick={() => onModalClose()} className="close-button">
          X
        </div>
        <h2>{props.modal.type === "scope" ? "Please, select business category" : "Please, select project type"}</h2>
        {props.modal && (props.modal.type === "scope" ? props.projectScopes : props.projectTypes).map((item, index) => (
            <div className="modal-item">
              <Radio
                handleSelect={(e) => {
                  setRadioValue(item)
                }}
                name="map-freelancer-option"
                id={"map-freelancer-option-" + index}
                value={item.value}
                checked={item.value === radioValue?.value}
                label={item.text}
                compulsory={false}
                disableCustomControl={true}
              />
            </div>
          ))
        }
        <div className="button-modal" onClick={() => onModalCountinue()}>
          Continue
        </div>
      </div>
    </Modal>
  )
}

export default DropDownModal
