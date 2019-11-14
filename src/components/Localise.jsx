import React from "react";

import { useLocales } from "../hooks/setValue";
import { useTranslation } from "../hooks/translate";

import { Input } from "./Input";
import { Button } from "./Button";
import { InputList } from "./InputList";
import { useLocked } from "../hooks/useLocked";

export function Localise({ sdk, initalData }) {
  const { locked, setLockedLocale } = useLocked(sdk)
  const { text, setText, translated, translateText, getTranslated, updateTranslated } = useTranslation(sdk, initalData, locked);

  useLocales(sdk, translated);

  return (
    <>
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        label={"Type text to translate here"}
      />
  
      <Button onClick={translateText} label={"Click to translate"} />
  
      <InputList
        sdk={sdk}
        locked={locked}
        updateTranslated={updateTranslated}
        setLockedLocale={setLockedLocale}
        getTranslated={getTranslated}/>
    </>
  );
}
