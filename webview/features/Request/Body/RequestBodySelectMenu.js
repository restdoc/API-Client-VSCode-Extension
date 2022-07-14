import React from "react";
import styled from "styled-components";
import shallow from "zustand/shallow";

import SelectWrapper from "../../../components/SelectWrapper";
import { COMMON, OPTION, REQUEST } from "../../../constants";
import useKeyValueTableStore from "../../../store/useKeyValueTableStore";
import useRequestStore from "../../../store/useRequestStore";
import RequestBodyFormatButton from "../Button/RequestBodyFormatButton";
import RequestBodyRawOptions from "./RequestBodyRawOptions";
import RequestBodyMenuOption from "./RequestBodySelectMenuOption";

const RequestBodySelectMenu = () => {
  const { bodyOption, bodyRawOption, handleRequestBodyOption } =
    useRequestStore(
      (state) => ({
        bodyOption: state.bodyOption,
        bodyRawOption: state.bodyRawOption,
        handleRequestBodyOption: state.handleRequestBodyOption,
      }),
      shallow,
    );

  const { addRequestBodyHeaders, removeRequestBodyHeaders } =
    useKeyValueTableStore(
      (state) => ({
        addRequestBodyHeaders: state.addRequestBodyHeaders,
        removeRequestBodyHeaders: state.removeRequestBodyHeaders,
      }),
      shallow,
    );

  const rawOptionHeaderField = OPTION.REQUEST_BODY_RAW_OPTIONS.filter(
    (rawOption) => rawOption.option === bodyRawOption,
  );

  const handleBodyOptionChoice = (event) => {
    handleRequestBodyOption(event.target.value);

    if (event.target.value === REQUEST.NONE) {
      removeRequestBodyHeaders();
    } else {
      removeRequestBodyHeaders();
      addRequestBodyHeaders(event.target.getAttribute("header-type"));
    }
  };

  return (
    <>
      <SelectWrapper requestMenu>
        {OPTION.REQUEST_BODY_OPTIONS.map(({ option, headerField }, index) => (
          <RadioInputWrapper key={COMMON.BODY + index}>
            <input
              type="radio"
              name="bodyOption"
              checked={bodyOption === option}
              value={option}
              header-type={
                option === REQUEST.RAW
                  ? rawOptionHeaderField[0].headerField
                  : headerField
              }
              onChange={handleBodyOptionChoice}
            />
            <label htmlFor={option}>{option}</label>
          </RadioInputWrapper>
        ))}
        {bodyOption === REQUEST.RAW && (
          <>
            <RequestBodyRawOptions />
            <RequestBodyFormatButton />
          </>
        )}
      </SelectWrapper>
      <RequestBodyMenuOption />
    </>
  );
};

const RadioInputWrapper = styled.div`
  display: flex;
  margin: 0.5rem 1rem;

  input {
    width: auto;
    margin-right: 0.7rem;
    cursor: pointer;
  }

  label {
    user-select: none;
  }
`;

export default RequestBodySelectMenu;
