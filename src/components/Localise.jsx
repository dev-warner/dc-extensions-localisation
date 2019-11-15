import React from "react";

import { useInput } from "../hooks/useInput";
import { useLocked } from "../hooks/useLocked";
import { useLocales } from "../hooks/useLocales";
import { useReadOnly } from "../hooks/useReadOnly";
import { useTranslation } from "../hooks/useTranslate";

import { Input } from "./Input";
import { Button } from "./Button";
import { InputList } from "./InputList";

export function Localise({ locales, initalData }) {
  const { readOnly } = useReadOnly();
  const [ searchText, setSearchText ] = useInput();
  const { locked, setLockedLocale, lockAll } = useLocked(locales);
  const { translate, translated, actions } = useTranslation(
    searchText,
    locked,
    lockAll,
    initalData
  );

  useLocales(translated);

  return (
    <>
      <Input
        value={searchText}
        readOnly={readOnly}
        onChange={setSearchText}
        label={"Type text to translate here"}
      />

      <Button
        onClick={translate}
        readOnly={readOnly}
        label={"Click to translate"}
      />

      <InputList
        locked={locked}
        readOnly={readOnly}
        locales={locales}
        setLockedLocale={setLockedLocale}
        getTranslated={actions.getTranslated}
        updateTranslated={actions.updateTranslated}
      />
    </>
  );
}
